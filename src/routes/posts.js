const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const validatePost = require('../middleware/validatePost');
const {
  sendSuccess,
  sendCreated,
  sendNotFound,
  sendBadRequest
} = require('../utils/response');


// ═══════════════════════════════════════════════════════════════════
// POST /api/posts — Create a new blog post
// ═══════════════════════════════════════════════════════════════════

router.post('/', validatePost, async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    const result = await pool.query(
      `INSERT INTO posts (title, content, author)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title.trim(), content.trim(), author.trim()]
    );

    // Use sendCreated helper — consistent 201 response shape
    return sendCreated(res, result.rows[0], 'Post created successfully');

  } catch (error) {
    // Instead of handling the error here, we pass it to the
    // centralized error handler in app.js using next(error)
    next(error);
  }
});


// ═══════════════════════════════════════════════════════════════════
// GET /api/posts — Get all posts with pagination + optional search
// ═══════════════════════════════════════════════════════════════════

router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // search comes from ?search=keyword in the URL
    // If not provided, req.query.search is undefined — we default to empty string
    const search = req.query.search ? req.query.search.trim() : '';

    if (page < 1 || limit < 1) {
      return sendBadRequest(res, 'page and limit must be positive integers');
    }

    if (limit > 100) {
      return sendBadRequest(res, 'limit cannot exceed 100');
    }

    const offset = (page - 1) * limit;

    let postsQuery;
    let countQuery;
    let queryParams;

    if (search) {
      // ── SEARCH MODE ─────────────────────────────────────────────
      // ILIKE = case-insensitive LIKE in PostgreSQL
      // $1 = the search pattern (e.g. '%node%')
      // $2 = limit, $3 = offset
      // We search in both title AND content using OR
      // We wrap search in % wildcards to match anywhere in the string
      const searchPattern = `%${search}%`;

      postsQuery = {
        text: `SELECT id, title, author, created_at, updated_at
               FROM posts
               WHERE title ILIKE $1 OR content ILIKE $1
               ORDER BY created_at DESC
               LIMIT $2 OFFSET $3`,
        values: [searchPattern, limit, offset]
      };

      // Count must use the same WHERE clause so pagination is accurate
      // e.g. if search returns 7 results total, totalPages must reflect 7 not all posts
      countQuery = {
        text: `SELECT COUNT(*) FROM posts
               WHERE title ILIKE $1 OR content ILIKE $1`,
        values: [searchPattern]
      };

    } else {
      // ── NO SEARCH — return all posts ────────────────────────────
      postsQuery = {
        text: `SELECT id, title, author, created_at, updated_at
               FROM posts
               ORDER BY created_at DESC
               LIMIT $1 OFFSET $2`,
        values: [limit, offset]
      };

      countQuery = {
        text: 'SELECT COUNT(*) FROM posts',
        values: []
      };
    }

    // Run both queries in parallel — faster than two sequential awaits
    const [postsResult, countResult] = await Promise.all([
      pool.query(postsQuery),
      pool.query(countQuery)
    ]);

    const totalPosts = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalPosts / limit);

    // Build the response object manually here since it has extra pagination data
    return res.status(200).json({
      success: true,
      message: 'Posts fetched successfully',
      // Include search term in response so client knows what was searched
      search: search || null,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      },
      data: postsResult.rows
    });

  } catch (error) {
    next(error);
  }
});


// ═══════════════════════════════════════════════════════════════════
// GET /api/posts/:id — Get a single post by ID
// ═══════════════════════════════════════════════════════════════════

router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return sendBadRequest(res, 'Post ID must be a valid integer');
    }

    const result = await pool.query(
      'SELECT * FROM posts WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return sendNotFound(res, 'Post not found');
    }

    return sendSuccess(res, result.rows[0], 'Post fetched successfully');

  } catch (error) {
    next(error);
  }
});


// ═══════════════════════════════════════════════════════════════════
// PUT /api/posts/:id — Update an existing post
// ═══════════════════════════════════════════════════════════════════

router.put('/:id', validatePost, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return sendBadRequest(res, 'Post ID must be a valid integer');
    }

    const { title, content, author } = req.body;

    const result = await pool.query(
      `UPDATE posts
       SET title = $1, content = $2, author = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [title.trim(), content.trim(), author.trim(), id]
    );

    if (result.rows.length === 0) {
      return sendNotFound(res, 'Post not found');
    }

    return sendSuccess(res, result.rows[0], 'Post updated successfully');

  } catch (error) {
    next(error);
  }
});


// ═══════════════════════════════════════════════════════════════════
// DELETE /api/posts/:id — Delete a post
// ═══════════════════════════════════════════════════════════════════

router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return sendBadRequest(res, 'Post ID must be a valid integer');
    }

    // RETURNING id confirms which row was deleted.
    // If no row matched, result.rows will be empty — means post didn't exist.
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return sendNotFound(res, 'Post not found');
    }

    // 200 with a message — some APIs return 204 No Content for DELETE
    // but 200 with confirmation is more informative and easier to test
    return sendSuccess(res, { deletedId: id }, 'Post deleted successfully');

  } catch (error) {
    next(error);
  }
});


module.exports = router;