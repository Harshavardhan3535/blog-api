const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

// Check if we're connecting to a cloud database by looking at the URL.
// Local PostgreSQL URLs contain 'localhost', cloud ones don't.
// This is more reliable than checking NODE_ENV.
const isCloudDatabase = connectionString && !connectionString.includes('localhost');

const pool = new Pool({
  connectionString,
  ssl: isCloudDatabase ? { rejectUnauthorized: false } : false
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ PostgreSQL connected successfully');
    release();
  }
});

module.exports = pool;