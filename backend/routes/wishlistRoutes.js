const express = require('express');
const router = express.Router();
const wishlistController = require('../Controller/wishlistController');
const { authenticateUser } = require('../Middleware/authMiddleware');

// All routes require authentication
router.use(authenticateUser);

// Get user's wishlist
router.get('/', wishlistController.getWishlist);

// Add book to wishlist
router.post('/', wishlistController.addToWishlist);

// Remove book from wishlist
router.delete('/:bookId', wishlistController.removeFromWishlist);

// Check if book is in wishlist
router.get('/check/:bookId', wishlistController.checkWishlistStatus);

module.exports = router; 