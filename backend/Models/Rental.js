const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    rentalPeriod: { type: Number, required: true },
    fee: { type: Number, required: true },
    rentedOn: { type: Date, default: Date.now },
    returnDate: { type: Date, required: true },
    isReturned: { type: Boolean, default: false }
});

const Rental = mongoose.model("Rental", rentalSchema);
module.exports = Rental;






