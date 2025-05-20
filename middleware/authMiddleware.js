const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password'); // ✅ fix here
    if (!req.user) return res.status(401).json({ message: 'User not found' });

    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
