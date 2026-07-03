# Blog API

A RESTful Blog API built with Node.js, Express.js, and PostgreSQL. Features full CRUD operations, keyword search, pagination, input validation, and SQL injection prevention using parameterized queries.

---

## Live Demo

**Base URL:** https://blog-api-56im.onrender.com

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Driver:** pg
- **Testing:** Postman
- **Deployment:** Render
- **Version Control:** Git & GitHub

---

## Features

- Full CRUD for blog posts
- Keyword search across title and content
- Pagination with metadata
- Manual input validation
- Parameterized queries (SQL injection prevention)
- Centralized error handling
- Consistent JSON response structure

---

## Local Setup

### Prerequisites
- Node.js v18+
- PostgreSQL installed locally

### Steps

1. Clone the repository
```bash
   git clone https://github.com/Harshavardhan3535/blog-api.git
   cd blog-api
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root directory
```env
   PORT=5000
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/blog_api
   NODE_ENV=development
```

4. Set up the database
   - Create a database named `blog_api` in PostgreSQL
   - Run `schema.sql` in pgAdmin Query Tool

5. Start the development server
```bash
   npm run dev
```

---

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check if API is running |

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts` | Create a new post |
| GET | `/api/posts` | Get all posts (paginated) |
| GET | `/api/posts?page=1&limit=10` | Get posts with pagination |
| GET | `/api/posts?search=keyword` | Search posts by keyword |
| GET | `/api/posts?search=keyword&page=1&limit=5` | Search with pagination |
| GET | `/api/posts/:id` | Get a single post |
| PUT | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Delete a post |

---

## Request & Response Examples

### Create Post

**Request**
```json
POST /api/posts
{
  "title": "My First Post",
  "content": "This is the content of my first blog post.",
  "author": "Harsha Vardhan"
}
```

**Response**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": 1,
    "title": "My First Post",
    "content": "This is the content of my first blog post.",
    "author": "Harsha Vardhan",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  }
}
```

### Get All Posts (Paginated)

**Response**
```json
{
  "success": true,
  "message": "Posts fetched successfully",
  "search": null,
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalPosts": 25,
    "limit": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "data": [...]
}
```

### Validation Error

**Response**
```json
{
  "success": false,
  "errors": [
    "Title is required",
    "Content must be at least 10 characters"
  ]
}
```

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `NODE_ENV` | Environment | `development` or `production` |

---

## Development Log

### Day 1 — Project Setup

- Initialized Node.js project
- Configured Express server
- Connected PostgreSQL database using connection pooling
- Created project folder structure
- Installed required dependencies

**Concepts Learned:** Express application structure, PostgreSQL connection pool, environment variables, database configuration

---

### Day 2 — CRUD Operations, Input Validation & Pagination

**Features Implemented:**
- Full CRUD operations for blog posts
- Parameterized SQL queries for secure database interaction
- Input validation middleware
- Pagination using LIMIT and OFFSET

**Challenges & Solutions:**

*SQL Injection Prevention* — Directly concatenating user input into SQL queries exposes the application to injection attacks. Used parameterized queries with `$1`, `$2` placeholders to safely pass user data to PostgreSQL.

*Input Validation* — Requests with missing or invalid fields could store inconsistent data. Created validation middleware to verify all fields before executing any database operation.

*Pagination* — Returning every post in a single response is inefficient at scale. Implemented LIMIT and OFFSET so the API returns only a fixed subset per request.

**Concepts Learned:** CRUD API design, RESTful routing, parameterized queries, SQL injection prevention, Express middleware, pagination

---

### Day 3 — Search, DELETE Route & Centralized Error Handling

**Features Implemented:**
- DELETE route to remove posts by ID
- Keyword search using PostgreSQL ILIKE across title and content
- Search combined with pagination
- Reusable response helper functions in `src/utils/response.js`
- Centralized error handling middleware in `src/middleware/errorHandler.js`
- Route refactoring using `next(error)` pattern

**Challenges & Solutions:**

*Repeated Response Objects* — Each route contained duplicate success and error response logic. Created reusable helper functions to standardize responses across the entire application.

*Error Handling Across Routes* — Handling errors individually in every route increased duplication. Implemented centralized error middleware using Express's `next(error)` mechanism — one place handles all errors.

*Combining Search with Pagination* — Search results needed to stay paginated. Integrated ILIKE queries with LIMIT and OFFSET, and ran a separate COUNT query in parallel to keep pagination metadata accurate.

**Concepts Learned:** Centralized error handling, Express error middleware, response helpers, ILIKE keyword search, pagination with search, separation of concerns

---

### Day 4 — Production Deployment

- Created `schema.sql` as single source of truth for database structure
- Configured SSL conditionally based on DATABASE_URL for local vs cloud
- Deployed PostgreSQL database on Render
- Deployed web service on Render with environment variables
- Wrote professional README documentation

---

## Author

**Harsha Vardhan**
- GitHub: [@Harshavardhan3535](https://github.com/Harshavardhan3535)
