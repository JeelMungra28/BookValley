const express = require("express");
const { rentBook, markAsReturned, userRentalHistory } = require("../Controller/Rental");
const { authenticateUser } = require("../Middleware/authMiddleware");

const router = express.Router();

// renting a book
router.post("/rent", authenticateUser, rentBook);

// book return route
router.patch("/return/:rentalId", authenticateUser, markAsReturned);

// user history route
router.get("/history/", authenticateUser, userRentalHistory);

module.exports = router;
