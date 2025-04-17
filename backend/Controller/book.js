const Book = require("../Models/Book");


async function addBook(req, res) {
    try {
        const { title, author, category, description, price, coverImage } = req.body;
        if (price <= 0) {
            return res.status(500).json({ message: "Error adding book", error: "Price must be in a valid format" });
        }
        const newBook = new Book({ title, author, category, description, price, coverImage });
        await newBook.save();
        return res.status(201).json({ message: "Book added successfully!", book: newBook });
    } catch (error) {
        return res.status(500).json({ message: "Error adding book", error: error.message });
    }
}

async function getBook(req, res) {
    try {
        const { page = 1, limit = 10, sort = "title" } = req.query;

        // Check if sort parameter starts with "-" for descending order
        const sortOrder = sort.startsWith("-") ? -1 : 1;
        const sortField = sort.replace("-", ""); // Remove "-" for sorting key

        const books = await Book.find()
            .sort({ [sortField]: sortOrder })
            .collation({ locale: "en", numericOrdering: true })
            .limit(limit * 1) // Convert to number
            .skip((page - 1) * limit)
            .exec();

        const count = await Book.countDocuments();

        return res.json({
            books,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        return res.status(400).json({ message: "Error fetching books", error: error.message });
    }
}

async function searchBook(req, res) {
    try {
        const { query } = req.query; // Get the search term from query string

        if (query.trim() === "") {
            return res.status(400).json({ message: "Search query cannot be empty" });
        }

        const books = await Book.find({ $text: { $search: query } });

        if (books.length === 0) {
            return res.status(404).json({ message: "No books found matching your search" });
        }

        return res.json(books);
    } catch (error) {
        return res.status(400).json({ message: "Error searching books", error: error.message });
    }
}

async function deleteBook(req, res) {
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.json({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting book", error: error.message });
    }
}

module.exports = { addBook, getBook, searchBook, deleteBook };