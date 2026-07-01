// Load environment variables from .env into process.env
// This MUST be the first line — before importing anything else
// that uses process.env (like db.js)
require('dotenv').config();

// Import the configured Express app
const app = require('./src/app');

// Read PORT from environment, fall back to 5000 if not set
const PORT = process.env.PORT || 5000;

// Start the HTTP server on the specified port
// The callback runs once the server is ready to accept connections
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📌 Environment: ${process.env.NODE_ENV}`);
});