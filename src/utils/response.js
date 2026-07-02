// These are simple helper functions that return consistently shaped objects.
// Instead of every route manually building { success: true, data: ... },
// we call sendSuccess(res, data) and the shape is always identical.
// Consistency matters — frontend developers rely on predictable API responses.

// 200 OK — for successful GET and PUT requests
const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

// 201 Created — for successful POST requests
const sendCreated = (res, data, message = 'Created successfully') => {
  return res.status(201).json({
    success: true,
    message,
    data
  });
};

// 404 Not Found — when a resource doesn't exist
const sendNotFound = (res, message = 'Resource not found') => {
  return res.status(404).json({
    success: false,
    error: message
  });
};

// 400 Bad Request — for validation errors or bad input
const sendBadRequest = (res, message = 'Bad request') => {
  return res.status(400).json({
    success: false,
    error: message
  });
};

module.exports = { sendSuccess, sendCreated, sendNotFound, sendBadRequest };