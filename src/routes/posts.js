// Express Router lets us define routes in separate files.
// Think of it as a mini-app that handles a specific set of URLs.
const express = require('express');
const router = express.Router();

// Import the database pool we set up in db.js
const pool = require('../config/db');

// GET /api/posts — placeholder for now, returns a test message
// We'll replace this with real SQL queries on Day 2
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Posts route working — Day 2 we add SQL' });
});

// IMPORTANT: You MUST export the router.
// Without this, Express throws an error when app.js tries to import it.
// This was the Express 5 bug we saw in Project 1.
module.exports = router;