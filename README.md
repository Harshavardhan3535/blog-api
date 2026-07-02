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

---

## Day 3 – Search API, DELETE Route & Centralized Error Handling

### Features Implemented

* Implemented the DELETE API to remove blog posts by ID.
* Added keyword-based search functionality for blog posts.
* Combined search functionality with pagination.
* Created reusable API response helper functions.
* Implemented centralized error handling middleware.
* Refactored routes to improve code readability and maintainability.

### API Endpoints Implemented

| Method | Endpoint                                 | Description                       |
| ------ | ---------------------------------------- | --------------------------------- |
| DELETE | /api/posts/:id                           | Delete a blog post by ID          |
| GET    | /api/posts?search=keyword&page=1&limit=5 | Search blog posts with pagination |

### Project Improvements

#### Response Helper Functions

Created `src/utils/response.js` containing reusable helper functions for standardized API responses.

Benefits:

* Consistent response structure across all endpoints
* Reduced duplicate code
* Easier maintenance
* Improved readability

---

#### Centralized Error Handling

Created `src/middleware/errorHandler.js` and registered it after all application routes.

Instead of sending error responses inside every route, errors are forwarded using:

```javascript
next(error);
```

The centralized middleware processes all application errors in one place and returns a consistent error response.

Benefits:

* Cleaner route handlers
* Easier debugging
* Consistent error responses
* Better code organization

---

#### Search Functionality

Implemented keyword-based search using SQL.

The API now supports searching blog posts while maintaining pagination.

Example:

```
GET /api/posts?search=node&page=1&limit=5
```

This allows users to retrieve only relevant posts instead of fetching the entire dataset.

---

### Challenges Encountered

#### 1. Repeated Response Objects

**Issue**

Each route contained repeated success and error response logic.

**Solution**

Created reusable response helper functions to standardize API responses across the application.

---

#### 2. Error Handling Across Multiple Routes

**Issue**

Handling errors individually inside every route increased code duplication and reduced maintainability.

**Solution**

Implemented centralized error handling middleware using Express's `next(error)` mechanism.

---

#### 3. Combining Search with Pagination

**Issue**

Search results needed to remain paginated instead of returning every matching record.

**Solution**

Integrated SQL search queries with `LIMIT` and `OFFSET` to efficiently paginate filtered results.

### Concepts Learned

* Centralized Error Handling
* Express Error Middleware
* Custom Response Helpers
* Keyword Search APIs
* SQL LIKE Queries
* Pagination with Search
* Route Refactoring
* Separation of Concerns
* Cleaner API Architecture

### Key Takeaway

As backend applications grow, maintainability becomes as important as functionality. Centralized error handling, reusable response utilities, and clean route design reduce code duplication, improve readability, and make the API easier to extend and debug.

---
