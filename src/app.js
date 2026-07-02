const express = require('express');
const postsRouter = require('./routes/posts');

// Import the centralized error handler
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(express.json());

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Blog API is running' });
});

app.use('/api/posts', postsRouter);

// ─── 404 HANDLER ──────────────────────────────────────────────────────────────
// Catches any request that didn't match a route above
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── CENTRALIZED ERROR HANDLER ────────────────────────────────────────────────
// MUST be after all routes and the 404 handler.
// Only receives control when next(error) is called from a route.
app.use(errorHandler);

module.exports = app;