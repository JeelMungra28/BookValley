const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    bookCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Update bookCount when books are added or removed
categorySchema.methods.updateBookCount = async function() {
    const Book = mongoose.model('Book');
    const count = await Book.countDocuments({ category: this._id });
    this.bookCount = count;
    await this.save();
};

module.exports = mongoose.model('Category', categorySchema); 