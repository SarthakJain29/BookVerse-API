const Book = require('../models/Book');
const Review = require('../models/Review');
const mongoose = require('mongoose');

// 📘 Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;

    const book = new Book({
      title,
      author,
      genre,
      description,
      createdBy: req.user._id
    });

    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error adding book', error: err.message });
  }
};

// 📖 Get all books (with optional filters + pagination)
exports.getAllBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
};

// 📘 Get book by ID with average rating + paginated reviews
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const book = await Book.findById(id).lean();
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ book: id })
      .populate('user', 'name')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const avgRating = await Review.aggregate([
      { $match: { book: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    res.json({
      ...book,
      averageRating: avgRating[0]?.avgRating || 0,
      reviews,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book', error: err.message });
  }
};


// 🔍 Search books by title or author
exports.searchBooks = async (req, res) => {
  try {
    const query = req.query.q?.trim(); // 🔧 Trim whitespace and newlines
    if (!query) {
      return res.status(400).json({ message: 'Query param "q" is required' });
    }

    const regex = new RegExp(query, 'i'); // case-insensitive partial match

    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex }
      ]
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};
