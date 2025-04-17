const Wishlist = require('../Models/Wishlist');
const Book = require('../Models/Book');

// Get user's wishlist
exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ userId: req.user._id })
            .populate('bookId', 'title author coverImage price')
            .sort({ addedAt: -1 });
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
    }
};

// Add book to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { bookId } = req.body;
        
        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if already in wishlist
        const existingItem = await Wishlist.findOne({
            userId: req.user._id,
            bookId: bookId
        });

        if (existingItem) {
            return res.status(400).json({ message: 'Book already in wishlist' });
        }

        // Add to wishlist
        const wishlistItem = new Wishlist({
            userId: req.user._id,
            bookId: bookId
        });

        await wishlistItem.save();
        
        // Populate book details before sending response
        await wishlistItem.populate('bookId', 'title author coverImage price');
        
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
    }
};

// Remove book from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { bookId } = req.params;
        
        const result = await Wishlist.findOneAndDelete({
            userId: req.user._id,
            bookId: bookId
        });

        if (!result) {
            return res.status(404).json({ message: 'Book not found in wishlist' });
        }

        res.json({ message: 'Book removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
    }
};

// Check if book is in wishlist
exports.checkWishlistStatus = async (req, res) => {
    try {
        const { bookId } = req.params;
        
        const wishlistItem = await Wishlist.findOne({
            userId: req.user._id,
            bookId: bookId
        });

        res.json({ isInWishlist: !!wishlistItem });
    } catch (error) {
        res.status(500).json({ message: 'Error checking wishlist status', error: error.message });
    }
}; 