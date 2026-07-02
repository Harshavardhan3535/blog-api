// Express identifies error-handling middleware by its 4 arguments: (err, req, res, next)
// When any route calls next(error), Express skips all remaining regular middleware
// and jumps directly to this function.

const errorHandler = (err, req, res, next) => {

  // Log the full error on the server side for debugging.
  // console.error goes to stderr — useful when reading server logs on Render.
  console.error('Unhandled error:', err.stack);

  // err.statusCode is a custom property we can set when creating errors in routes.
  // If we didn't set one, default to 500 Internal Server Error.
  const statusCode = err.statusCode || 500;

  // err.message is the standard JS Error property.
  // We show it to the client only if it's not a 500 — for 500s we hide
  // internal details and show a generic message for security.
  const message = statusCode === 500
    ? 'Internal server error'
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: message
  });
};

module.exports = errorHandler;