const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    paymentIntentId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    date: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;

