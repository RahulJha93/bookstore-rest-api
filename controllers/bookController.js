import {
  getAllBooks,
  getBook,
  addBook,
  updateBookById,
  deleteBookById,
  searchBooksByGenre
} from '../services/bookService.js';

// Get all books
export const getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const books = await getAllBooks({ page: Number(page), limit: Number(limit) });
    res.json(books);
  } catch (err) {
    next(err);
  }
}

// Get a book by ID
export const getBookById = async (req, res, next) => {
  try {
    const book = await getBook(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found.' });
    res.json(book);
  } catch (err) {
    next(err);
  }
}

// Add a new book
export const createBook = async (req, res, next) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    if (!title || !author || !genre || !publishedYear) {
      return res.status(400).json({ message: 'All fields required.' });
    }
    const book = await addBook({
      title,
      author,
      genre,
      publishedYear,
      userId: req.user.id
    });
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

// Update a book by ID (only creator)
export const updateBook = async (req, res, next) => {
  try {
    const book = await updateBookById(req.params.id, req.body, req.user.id);
    // Only creator can update, or book not found
    if (!book) return res.status(403).json({ message: 'Not authorized or book not found.' });
    res.json(book);
  } catch (err) {
    next(err);
  }
}

// Delete a book by ID
export const deleteBook = async (req, res, next) => {
  try {
    const deleted = await deleteBookById(req.params.id, req.user.id);
    // Only creator can delete, or book not found
    if (!deleted) return res.status(403).json({ message: 'Not authorized or book not found.' });
    res.json({ message: 'Book deleted.' });
  } catch (err) {
    next(err);
  }
}

// Search books by genre
export const searchBooks = async (req, res, next) => {
  try {
    const { genre, page = 1, limit = 10 } = req.query;
    const results = await searchBooksByGenre(genre, { page: Number(page), limit: Number(limit) });
    res.json(results);
  } catch (err) {
    next(err);
  }
}
