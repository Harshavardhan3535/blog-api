# Blog API

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express.js](https://img.shields.io/badge/Express.js-4.x-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Render](https://img.shields.io/badge/Hosted%20on-Render-purple)

A RESTful Blog API built with **Node.js**, **Express.js**, and **PostgreSQL**. It provides full CRUD functionality for blog posts along with keyword search, pagination, input validation, centralized error handling, and SQL injection prevention using parameterized queries.

---

# 🚀 Live Demo

**Base URL**

https://blog-api-56im.onrender.com

---

# 🛠 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **Driver:** pg
* **Testing:** Postman
* **Deployment:** Render
* **Version Control:** Git & GitHub

---

# 📂 Project Structure

```text
# 📂 Project Structure

```text
blog-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── validatePost.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── posts.js
│   ├── utils/
│   │   └── response.js
│   └── app.js
│
├── screenshots/
│   ├── health-check.png
│   ├── create-post.png
│   ├── get-all-posts.png
│   ├── search-posts.png
│   ├── validation-error.png
│   └── delete-post.png
│
├── interview-prep/
│   └── project2-interview-questions.md
│
├── schema.sql
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```
```

---

# ✨ Features

* Full CRUD operations for blog posts
* Keyword search across title and content
* Pagination with metadata
* Manual input validation
* Parameterized SQL queries
* SQL injection prevention
* Centralized error handling
* Standardized JSON response format
* Production deployment on Render

---

# 💻 Local Setup

## Prerequisites

* Node.js v18+
* PostgreSQL installed locally

## Steps

### 1. Clone the repository

```bash
git clone https://github.com/Harshavardhan3535/blog-api.git

cd blog-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=5000
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/blog_api
NODE_ENV=development
```

### 4. Create Database

Create a database named:

```text
blog_api
```

Run the provided:

```text
schema.sql
```

using pgAdmin Query Tool or psql.

### 5. Start the Server

```bash
npm run dev
```

---

# 📌 API Endpoints

## Health Check

| Method | Endpoint  | Description      |
| ------ | --------- | ---------------- |
| GET    | `/health` | Check API status |

## Posts

| Method | Endpoint                                   | Description         |
| ------ | ------------------------------------------ | ------------------- |
| POST   | `/api/posts`                               | Create a new post   |
| GET    | `/api/posts`                               | Get all posts       |
| GET    | `/api/posts?page=1&limit=10`               | Pagination          |
| GET    | `/api/posts?search=keyword`                | Keyword search      |
| GET    | `/api/posts?search=keyword&page=1&limit=5` | Search + Pagination |
| GET    | `/api/posts/:id`                           | Get post by ID      |
| PUT    | `/api/posts/:id`                           | Update post         |
| DELETE | `/api/posts/:id`                           | Delete post         |

---

# 📸 Screenshots

## Health Check
![Health Check](screenshots/health-check.png)

## Create Post
![Create Post](screenshots/create-post.png)

## Get All Posts with Pagination
![Get All Posts](screenshots/get-all-posts.png)

## Keyword Search
![Search Posts](screenshots/search-posts.png)

## Validation Error
![Validation Error](screenshots/validation-error.png)

## Delete Post
![Delete Post](screenshots/delete-post.png)

---

# 🧪 API Testing

The API was tested using **Postman**.

The following functionality has been verified:

* Create Post
* Get All Posts
* Get Single Post
* Update Post
* Delete Post
* Keyword Search
* Pagination
* Input Validation
* Error Responses

---

# 📄 Request & Response Examples

## Create Post

### Request

```json
POST /api/posts

{
  "title": "My First Post",
  "content": "This is the content of my first blog post.",
  "author": "Harsha Vardhan"
}
```

### Response

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

---

## Get All Posts

```json
{
  "success": true,
  "message": "Posts fetched successfully",
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalPosts": 25,
    "limit": 10
  },
  "data": []
}
```

---

## Validation Error

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

# ⚙ Environment Variables

| Variable     | Description                  |
| ------------ | ---------------------------- |
| PORT         | Server Port                  |
| DATABASE_URL | PostgreSQL Connection String |
| NODE_ENV     | development / production     |

---

# 📖 Development Log

## Day 1 — Project Setup

### Completed

* Initialized Node.js project
* Configured Express server
* Connected PostgreSQL database
* Created folder structure
* Installed dependencies

### Concepts Learned

* Express project structure
* PostgreSQL connection pooling
* Environment variables
* Database configuration

---

## Day 2 — CRUD Operations, Validation & Pagination

### Features Implemented

* Full CRUD operations
* Parameterized SQL queries
* Input validation middleware
* Pagination using LIMIT and OFFSET

### Challenges & Solutions

#### SQL Injection Prevention

Used PostgreSQL parameterized queries (`$1`, `$2`) instead of string concatenation to safely execute SQL statements.

#### Input Validation

Created middleware to validate request payloads before performing database operations.

#### Pagination

Implemented LIMIT and OFFSET to efficiently return paginated results.

### Concepts Learned

* CRUD API design
* RESTful routing
* Parameterized queries
* SQL Injection Prevention
* Express middleware
* Pagination

---

## Day 3 — Search, DELETE Route & Error Handling

### Features Implemented

* DELETE endpoint
* Keyword search using PostgreSQL ILIKE
* Search with pagination
* Response helper utilities
* Centralized error middleware
* Express `next(error)` implementation

### Challenges & Solutions

#### Repeated Responses

Created reusable response helper functions to eliminate duplicated JSON response code.

#### Error Handling

Implemented centralized Express error middleware instead of handling errors inside every route.

#### Search + Pagination

Combined ILIKE search with LIMIT/OFFSET and COUNT queries to support searchable paginated results.

### Concepts Learned

* Express Error Middleware
* Centralized Error Handling
* Response Helpers
* PostgreSQL ILIKE
* Search with Pagination
* Separation of Concerns

---

## Day 4 — Production Deployment

### Completed

* Created schema.sql
* Configured SSL support
* Connected PostgreSQL on Render
* Deployed API to Render
* Configured environment variables

### Lessons Learned

* Production deployment requires proper folder structure.
* Environment variables are critical.
* Cloud database credentials must be configured correctly.
* Local development success does not always guarantee successful production deployment.

---

# 📚 Topics Covered

* REST API Design
* CRUD Operations
* Express.js
* PostgreSQL
* SQL Queries
* Parameterized Queries
* SQL Injection Prevention
* Pagination
* Keyword Search
* Input Validation
* Express Middleware
* Centralized Error Handling
* Response Helpers
* Environment Variables
* Production Deployment
* Render
* Postman API Testing

---

# 🚀 Future Improvements

* JWT Authentication
* User Registration & Login
* Role-Based Access Control (RBAC)
* Image Upload Support
* Comments API
* Swagger / OpenAPI Documentation
* Docker Support
* Unit & Integration Testing

---

# 👨‍💻 Author

**Harsha Vardhan**

GitHub: https://github.com/Harshavardhan3535

---

# 📄 License

This project is licensed under the **MIT License**.
