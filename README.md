# Bookstore REST API

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RahulJha93/bookstore-rest-api.git
   cd bookstore-rest-api
   ```
2. **Create a `.env` file:**
   Copy the example below and update as needed:
   ```env
   JWT_SECRET=your_jwt_secret
   PORT=3000
   NODE_ENV=development
   ```
3. **Install dependencies and start the app:**
   ```bash
   npm install
   npm run dev
   ```


A production-level RESTful API for a Bookstore app with file-based persistence and JWT authentication using Node.js and Express.

## Features
- User registration and login (JWT authentication)
- CRUD for books (only creator can update/delete)
- File-based persistence (JSON)
- Logging, authentication, and error handling middleware
- Search and pagination for books

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### API Documentation
- Swagger UI available at [`/api-docs`](http://localhost:3000/api-docs) for interactive API docs.
### Auth
- `POST /register`: Register a user
- `POST /login`: Login and receive a JWT token

### Books (Protected)
- `GET /books`: List all books (supports `?genre=` and pagination)
- `GET /books/:id`: Get book by ID
- `POST /books`: Add a new book
- `PUT /books/:id`: Update a book (only creator)
- `DELETE /books/:id`: Delete a book (only creator)

## Testing
- Use Postman or curl for API testing
- Run automated tests:
  ```bash
  npm test
  ```

---

For more details, see the code and comments.
