const Review = require('../models/Review');

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;

    const existing = await Review.findOne({ book: bookId, user: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      book: bookId,
      user: req.user._id,
      rating,
      comment
    });

    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (!review.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed to update this review' });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;

    const updated = await review.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating review', error: err.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (!review.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed to delete this review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err.message });
  }
};
