const Cart = require('../Models/Cart');
const Book = require('../Models/Book');

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user._id })
            .populate('items.bookId', 'title author coverImage price');

        if (!cart) {
            cart = new Cart({ userId: req.user._id, items: [] });
            await cart.save();
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { bookId, quantity = 1 } = req.body;

        // Validate book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if book is available
        if (!book.available) {
            return res.status(400).json({ message: 'Book is not available' });
        }

        let cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            cart = new Cart({ userId: req.user._id, items: [] });
        }

        // Check if book already in cart
        const existingItem = cart.items.find(item => item.bookId.toString() === bookId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ bookId, quantity });
        }

        await cart.save();
        await cart.populate('items.bookId', 'title author coverImage price');

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => item.bookId.toString() === bookId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cartItem.quantity = quantity;
        await cart.save();
        await cart.populate('items.bookId', 'title author coverImage price');

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { bookId } = req.params;

        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);
        await cart.save();
        await cart.populate('items.bookId', 'title author coverImage price');

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart', error: error.message });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();

        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
}; 