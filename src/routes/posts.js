const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const validatePost = require('../middleware/validatePost');


// ═══════════════════════════════════════════════════════════════════
// POST /api/posts — Create a new blog post
// ═══════════════════════════════════════════════════════════════════

// validatePost runs FIRST (middleware), then the async function runs.
// If validatePost calls res.status(400)... the async function never runs.
router.post('/', validatePost, async (req, res) => {
  try {
    // Extract fields from body — already validated by middleware
    const { title, content, author } = req.body;

    // Parameterized query — $1, $2, $3 are placeholders.
    // The second argument is an array — pg maps index 0 → $1, index 1 → $2, etc.
    // RETURNING * means PostgreSQL sends back the newly inserted row immediately.
    // Without RETURNING, you'd have to run a second SELECT to get the new post.
    const result = await pool.query(
      `INSERT INTO posts (title, content, author)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title.trim(), content.trim(), author.trim()]
    );

    // result.rows is always an array. Since we inserted one row, we take index 0.
    const newPost = result.rows[0];

    // 201 Created — correct HTTP status for successful resource creation
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost
    });

  } catch (error) {
    // Log full error on server for debugging, but never send stack traces to client
    console.error('Error creating post:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});


// ═══════════════════════════════════════════════════════════════════
// GET /api/posts — Get all posts with pagination
// ═══════════════════════════════════════════════════════════════════

router.get('/', async (req, res) => {
  try {
    // Query params come from the URL: /api/posts?page=2&limit=5
    // req.query gives us { page: '2', limit: '5' } — always strings
    // parseInt converts them to numbers. || sets defaults if not provided.
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validate page and limit to prevent abuse (negative values etc.)
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        error: 'page and limit must be positive integers'
      });
    }

    // Cap limit at 100 — prevents someone requesting 100000 rows at once
    if (limit > 100) {
      return res.status(400).json({
        success: false,
        error: 'limit cannot exceed 100'
      });
    }

    // OFFSET formula: (page - 1) * limit
    // page=1 → OFFSET 0 (start from beginning)
    // page=2 → OFFSET 10 (skip first 10)
    const offset = (page - 1) * limit;

    // We need two queries:
    // 1. The actual posts for this page
    // 2. The total count of ALL posts (for pagination metadata)
    // We run them in parallel using Promise.all — faster than sequential awaits

    const [postsResult, countResult] = await Promise.all([
      pool.query(
        // ORDER BY created_at DESC = newest posts first
        // LIMIT $1 OFFSET $2 = pagination
        `SELECT id, title, author, created_at, updated_at
         FROM posts
         ORDER BY created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
      pool.query('SELECT COUNT(*) FROM posts')
    ]);

    // COUNT(*) returns a string in pg — parseInt converts it to a number
    const totalPosts = parseInt(countResult.rows[0].count);

    // Calculate total pages — Math.ceil rounds up
    // e.g. 25 posts / 10 per page = 2.5 → ceil → 3 pages
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      success: true,
      // Pagination metadata — frontend uses this to render page controls
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalPosts: totalPosts,
        limit: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      },
      data: postsResult.rows
    });

  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});


// ═══════════════════════════════════════════════════════════════════
// GET /api/posts/:id — Get a single post by ID
// ═══════════════════════════════════════════════════════════════════

router.get('/:id', async (req, res) => {
  try {
    // req.params.id comes from the URL — e.g. /api/posts/5 → id = '5'
    // It's always a string, parseInt converts it to a number
    const id = parseInt(req.params.id);

    // Validate that id is actually a number — reject /api/posts/abc
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Post ID must be a valid integer'
      });
    }

    // Parameterized query — $1 is the id
    const result = await pool.query(
      'SELECT * FROM posts WHERE id = $1',
      [id]
    );

    // If no rows returned, the post doesn't exist
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error fetching post:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});


// ═══════════════════════════════════════════════════════════════════
// PUT /api/posts/:id — Update an existing post
// ═══════════════════════════════════════════════════════════════════

// validatePost runs first — same validation rules as POST
router.put('/:id', validatePost, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Post ID must be a valid integer'
      });
    }

    const { title, content, author } = req.body;

    // We manually set updated_at to NOW() on every update.
    // This is more reliable than a DB trigger for now.
    // $1=title, $2=content, $3=author, $4=id
    const result = await pool.query(
      `UPDATE posts
       SET title = $1, content = $2, author = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [title.trim(), content.trim(), author.trim(), id]
    );

    // If no rows returned, no post with that ID existed
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error updating post:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});


module.exports = router;