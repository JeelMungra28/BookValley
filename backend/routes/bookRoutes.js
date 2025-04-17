const express = require("express");
const { authorizeAdmin, authenticateUser } = require("../Middleware/authMiddleware");
const { addBook, getBook, searchBook, deleteBook } = require("../Controller/book");
const router = express.Router();


// Adding Book
router.post("/add", authenticateUser, authorizeAdmin, addBook);

// get Book Details
router.get("/", getBook);

// Search Specific books
router.get("/search", searchBook);

// Delete specific book
router.delete("/:id", authorizeAdmin, deleteBook);

module.exports = router;
