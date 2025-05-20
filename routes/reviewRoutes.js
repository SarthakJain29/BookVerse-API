const express = require('express');
const {
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/books/:id/reviews', authenticate, createReview);  // Create review
router.put('/reviews/:id', authenticate, updateReview);         // Update review
router.delete('/reviews/:id', authenticate, deleteReview);      // Delete review

module.exports = router;
