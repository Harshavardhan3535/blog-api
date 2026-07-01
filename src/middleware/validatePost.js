// This is a custom middleware function for validating post input.
// Middleware in Express is just a function with (req, res, next) signature.
// - req: the incoming request
// - res: the response we can send back
// - next: a function to call if validation passes, moving to the next middleware/route

const validatePost = (req, res, next) => {

  // Destructure the expected fields from the request body.
  // req.body is populated by express.json() middleware we set up in app.js
  const { title, content, author } = req.body;

  // We'll collect all validation errors into an array
  // so we can return ALL problems at once instead of one at a time.
  const errors = [];

  // ── TITLE VALIDATION ──────────────────────────────────────────────────────

  // Check 1: title must exist and not be an empty string after trimming spaces
  if (!title || title.trim() === '') {
    errors.push('Title is required');
  } else if (title.trim().length > 255) {
    // Check 2: matches our DB column VARCHAR(255)
    errors.push('Title must be 255 characters or less');
  }

  // ── CONTENT VALIDATION ────────────────────────────────────────────────────

  if (!content || content.trim() === '') {
    errors.push('Content is required');
  } else if (content.trim().length < 10) {
    // Minimum meaningful content length
    errors.push('Content must be at least 10 characters');
  }

  // ── AUTHOR VALIDATION ─────────────────────────────────────────────────────

  if (!author || author.trim() === '') {
    errors.push('Author is required');
  } else if (author.trim().length > 100) {
    // Matches our DB column VARCHAR(100)
    errors.push('Author name must be 100 characters or less');
  }

  // ── RESULT ────────────────────────────────────────────────────────────────

  // If any errors were collected, respond with 400 Bad Request
  // and send all errors at once. We do NOT call next().
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }

  // If we reach here, all validations passed.
  // Call next() to hand control to the actual route handler.
  next();
};

module.exports = validatePost;