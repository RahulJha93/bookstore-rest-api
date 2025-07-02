import { readJsonFile, writeJsonFile } from '../utils/fileUtils.js';
import { v4 as uuidv4 } from 'uuid';

// Path to books data file
const BOOKS_FILE = './data/books.json';

// Get all books
export const getAllBooks = async ({ page = 1, limit = 10 }) => {
  const books = await readJsonFile(BOOKS_FILE);
  const start = (page - 1) * limit;
  const paginated = books.slice(start, start + limit);
  return {
    total: books.length,
    page,
    limit,
    books: paginated
  };
}

// Get a book by ID
export const getBook = async (id) => {
  const books = await readJsonFile(BOOKS_FILE);
  return books.find(b => b.id === id);
}

// Add a new book
export const addBook = async ({ title, author, genre, publishedYear, userId }) => {
  const books = await readJsonFile(BOOKS_FILE);
  const book = { id: uuidv4(), title, author, genre, publishedYear, userId };
  books.push(book);
  await writeJsonFile(BOOKS_FILE, books);
  return book;
}

// Update a book by ID (only creator)
export const updateBookById = async (id, data, userId) => {
  const books = await readJsonFile(BOOKS_FILE);
  const idx = books.findIndex(b => b.id === id);
  // Only allow update if user owns the book
  if (idx === -1 || books[idx].userId !== userId) return null;
  books[idx] = { ...books[idx], ...data };
  await writeJsonFile(BOOKS_FILE, books);
  return books[idx];
}

// Delete a book by ID (only creator)
export const deleteBookById = async (id, userId) => {
  const books = await readJsonFile(BOOKS_FILE);
  const idx = books.findIndex(b => b.id === id);
  // Only allow delete if user owns the book
  if (idx === -1 || books[idx].userId !== userId) return false;
  books.splice(idx, 1);
  await writeJsonFile(BOOKS_FILE, books);
  return true;
}

// Search books by genre 
export const searchBooksByGenre = async (genre, { page = 1, limit = 10 }) => {
  const books = await readJsonFile(BOOKS_FILE);
  const filtered = genre ? books.filter(b => b.genre.toLowerCase() === genre.toLowerCase()) : books;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  return {
    total: filtered.length,
    page,
    limit,
    books: paginated
  };
}
