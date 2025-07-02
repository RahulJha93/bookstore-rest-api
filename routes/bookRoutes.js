import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
} from '../controllers/bookController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes below require authentication
router.use(authMiddleware);

// Get all books (with pagination)
router.get('/', getBooks);
// Search books by genre
router.get('/search', searchBooks);
// Get a book by ID
router.get('/:id', getBookById);
// Add a new book
router.post('/', createBook);
// Update a book by ID (only creator)
router.put('/:id', updateBook);
// Delete a book by ID (only creator)
router.delete('/:id', deleteBook);

export default router;
