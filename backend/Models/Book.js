const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    author: { type: String, required: true, index: true },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true 
    },
    description: { type: String },
    price: { type: Number, required: true },
    coverImage: { type: String },
    available: { type: Boolean, default: true },
    stock: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// Create text index for search
bookSchema.index({ title: "text", author: "text", description: "text" });

// Update category bookCount when book is saved
bookSchema.post('save', async function() {
    const Category = mongoose.model('Category');
    await Category.findByIdAndUpdate(this.category, { $inc: { bookCount: 1 } });
});

// Update category bookCount when book is removed
bookSchema.post('remove', async function() {
    const Category = mongoose.model('Category');
    await Category.findByIdAndUpdate(this.category, { $inc: { bookCount: -1 } });
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
