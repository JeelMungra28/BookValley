const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    author: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    description: { type: String },
    price: { type: Number, required: true },
    coverImage: { type: String },
    createdAt: { type: Date, default: Date.now }
});

bookSchema.index({ title: "text", author: "text", category: "text", description: "text" });


const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
