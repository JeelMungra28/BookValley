const Rental = require("../Models/Rental");
const Book = require("../Models/Book");
const { mongoose } = require("mongoose");
const { rentalValidation } = require("../Validators/rentalValidator");

async function rentBook(req, res) {
    const { error } = rentalValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { bookId, rentalPeriod } = req.body;
    const userId = req.user.id;

    const calculateRentalFee = (rentalPeriod, bookPrice) => {
        const dailyRate = bookPrice * 0.02;
        return dailyRate * rentalPeriod;
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ error: "Invalid book ID or book not found." });
        }
        const book = await Book.findById(new mongoose.Types.ObjectId(bookId));
        if (!book) return res.status(404).json({ message: "Book not found" });

        const existingRental = await Rental.findOne({
            userId,
            bookId,
            isReturned: false,
            status: "Confirmed"
        });
        if (existingRental) {
            return res.status(400).json({ message: "You have already rented this book. Please return it first." });
        }

        const fee = calculateRentalFee(rentalPeriod, book.price);

        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + rentalPeriod);

        const rental = new Rental({
            userId,
            bookId,
            rentalPeriod,
            fee,
            returnDate,
            status: "Pending"
        });

        await rental.save();

        return res.status(201).json({
            message: "Rental initiated. Proceed to payment.",
            rentalId: rental._id,
            rentalFee: fee,
            rental
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error renting book", error: error.message });
    }

};

async function markAsReturned(req, res) {
    const { rentalId } = req.params;
    const userId = req.user.id;

    try {
        const rental = await Rental.findById(rentalId);
        if (!rental) return res.status(404).json({ message: "Rental record not found" });

        console.log("Rental userId:", rental.userId.toString());
        console.log("Request userId:", req.user.id.toString());

        if (!rental.userId.equals(req.user.id)) {
            return res.status(403).json({ message: "You are not authorized to return this book" });
        }

        if (rental.isReturned) {
            return res.status(400).json({ message: "Book is already returned" });
        }

        const currentDate = new Date();
        let penalty = 0;
        if (currentDate > rental.returnDate) {
            const lateDays = Math.ceil((currentDate - rental.returnDate) / (1000 * 60 * 60 * 24));
            penalty = lateDays * 5;
        }

        rental.isReturned = true;
        await rental.save();

        return res.status(200).json({
            message: "Book returned successfully",
            penalty: penalty > 0 ? `Late fee: ₹${penalty}` : "No late fee",
            rental
        });
    } catch (error) {
        console.error("Error processing return:", error.message, error.stack);
        return res.status(500).json({ message: "Error processing return", error: error.message });
    }
};

async function userRentalHistory(req, res) {
    const userId = req.user.id;

    try {
        const rentals = await Rental.find({ userId }).populate("bookId", "title author");

        if (!rentals.length) {
            return res.status(404).json({ message: "No rental history found." });
        }

        return res.status(200).json({ rentals });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching rental history", error });
    }
};

module.exports = { rentBook, markAsReturned, userRentalHistory };
