const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cartController');
const { authenticateUser } = require('../Middleware/authMiddleware');

// All cart routes require authentication
router.use(authenticateUser);

// Get cart
router.get('/', cartController.getCart);

// Add to cart
router.post('/', cartController.addToCart);

// Update cart item
router.put('/:bookId', cartController.updateCartItem);

// Remove from cart
router.delete('/:bookId', cartController.removeFromCart);

// Clear cart
router.delete('/', cartController.clearCart);

module.exports = router; 