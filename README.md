# REST Blog API

A RESTful Blog API built using Node.js, Express.js, and PostgreSQL.

The goal of this project is to learn how SQL-based backend applications are structured while implementing CRUD operations, pagination, validation, and secure database queries.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg
- Postman
- Git & GitHub

---

## Planned Features

- Create Blog
- Read Blogs
- Update Blog
- Delete Blog
- Pagination
- Input Validation
- Search Blogs
- Sorting
- Filtering
- Parameterized SQL Queries
- SQL Injection Prevention
- API Testing with Postman
- Production Deployment

---

## Development Log

### Day 1 – Project Setup

Completed:

- Initialized Node.js project
- Configured Express server
- Connected PostgreSQL database
- Created project folder structure
- Installed required dependencies

### Concepts Learned

- Express application structure
- PostgreSQL connection setup
- Environment variables
- Database configuration

---

## Day 2 – CRUD Operations, Input Validation & Pagination

### Features Implemented

* Implemented CRUD (Create, Read, Update, Delete) operations for blog posts.
* Connected Express routes with PostgreSQL queries.
* Used parameterized SQL queries to securely interact with the database.
* Added input validation middleware to validate incoming request data.
* Implemented pagination for retrieving blog posts efficiently.

### API Endpoints Implemented

| Method | Endpoint       | Description                             |
| ------ | -------------- | --------------------------------------- |
| POST   | /api/posts     | Create a new blog post                  |
| GET    | /api/posts     | Retrieve all blog posts with pagination |
| GET    | /api/posts/:id | Retrieve a specific blog post           |
| PUT    | /api/posts/:id | Update an existing blog post            |
| DELETE | /api/posts/:id | Delete a blog post                      |

### Challenges Encountered

#### 1. SQL Injection Prevention

**Issue**

Directly concatenating user input into SQL queries can expose the application to SQL Injection attacks.

**Solution**

Used parameterized queries with placeholders (`$1`, `$2`, etc.) to safely pass user input to PostgreSQL.

---

#### 2. Input Validation

**Issue**

Requests containing missing or invalid fields could lead to inconsistent data being stored in the database.

**Solution**

Created validation middleware to verify request data before executing database operations.

---

#### 3. Pagination

**Issue**

Returning every blog post in a single request is inefficient as the database grows.

**Solution**

Implemented pagination using `LIMIT` and `OFFSET` so the API returns only a subset of records per request.

### Concepts Learned

* CRUD API Design
* RESTful Routing
* PostgreSQL Parameterized Queries
* SQL Injection Prevention
* Express Middleware
* Input Validation
* Pagination using LIMIT and OFFSET
* Separation of Routes, Controllers, and Database Logic

### Key Takeaway

Building a secure REST API involves more than implementing CRUD operations. Proper input validation, parameterized SQL queries, and pagination improve application security, maintainability, and performance while following backend development best practices.
