const express = require('express');
const {
  addBook,
  getAllBooks,
  getBookById,
} = require('../controllers/bookController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, addBook); // Auth required
router.get('/', getAllBooks);            // Public with optional filters
router.get('/:id', getBookById);         // Public - book details + avg rating + reviews
router.get('/search', searchBooks);      // GET /search?q=term

module.exports = router;
