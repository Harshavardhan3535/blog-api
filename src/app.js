// Import the express library
const express = require('express');

// Import our posts router (we'll fill it in next)
const postsRouter = require('./routes/posts');

// Create the Express application instance
const app = express();

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────────

// express.json() is built-in middleware that reads the request body
// and parses it from raw JSON text into a JavaScript object.
// Without this, req.body would always be undefined.
app.use(express.json());

// ─── ROUTES ────────────────────────────────────────────────────────────────────

// Health check route — useful for Render to confirm the app is alive.
// When someone hits GET /health, we immediately respond with status 200.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Blog API is running' });
});

// Mount the posts router at /api/posts.
// This means any route defined in posts.js will be prefixed with /api/posts.
// Example: a route for "/" in posts.js becomes "/api/posts" in the real URL.
app.use('/api/posts', postsRouter);

// ─── 404 HANDLER ──────────────────────────────────────────────────────────────

// If no route above matched the request, this middleware runs.
// It must be AFTER all routes — Express processes middleware top to bottom.
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Export the app so server.js can start it
module.exports = app;