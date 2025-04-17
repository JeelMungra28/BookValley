const Rental = require("../Models/Rental");
const Book = require("../Models/Book");
const { mongoose } = require("mongoose");
const Payment = require("../Models/paymentModel");
const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET);

async function userPayment(req, res) {
    try {
        const userId = req.user.id;
        const { rentalId, amount, currency } = req.body;

        const rental = await Rental.findById(rentalId);
        if (!rental) {
            return res.status(404).json({ error: 'Rental not found.' });
        }

        if (amount != rental.fee) {
            return res.status(400).json({ error: 'Payment amount does not match rental fee.' });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid or missing amount" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: currency || "usd",
            payment_method_types: ["card"],
        });


        return res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        if (error.type === "StripeCardError") {
            return res.status(400).json({ error: "Card was declined" });
        }
        return res.status(500).json({ error: error.message });
    }
}

async function confirmPayment(req, res) {
    try {
        const { paymentIntentId, userId, bookId, amount, rentalId } = req.body;

        if (!paymentIntentId || !userId || !bookId || !amount || !rentalId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const existingPayment = await Payment.findOne({ paymentIntentId });
        if (existingPayment) {
            return res.status(400).json({ error: "Payment already confirmed" });
        }

        const rental = await Rental.findById(rentalId);

        if (!rental) {
            return res.status(404).json({ error: "Rental not found." });
        }

        // user mismatch)
        if (rental.userId.toString() !== userId) {
            return res.status(403).json({ error: "You are not authorized to pay for this rental." });
        }

        // book mismatch
        if (rental.bookId.toString() !== bookId) {
            return res.status(400).json({ error: "Book ID does not match the rental record." });
        }

        // duplicate payment logic
        if (rental.status === "Confirmed") {
            return res.status(400).json({ error: "This rental has already been paid." });
        }

        /*console.log("Rental object:", rental);
        console.log("Rental fee (from DB):", rental.fee);
        console.log("Amount (from client):", amount);
        console.log("Type of rental.fee:", typeof rental.fee);
        console.log("Type of amount:", typeof amount);*/



        // amount matches rental fee
        if (rental.fee !== amount) {
            return res.status(400).json({ error: "Payment amount does not match rental fee." });
        }

        const intent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: 'pm_card_visa'
        });
        const paymentStatus = intent.status;

        const newPayment = new Payment({
            paymentIntentId,
            userId,
            bookId,
            amount,
            status: paymentStatus === 'succeeded' ? 'Completed' : "Pending",
            date: new Date(),
        });

        await newPayment.save();

        if (paymentStatus === 'succeeded') {
            await Rental.findByIdAndUpdate(rentalId, {
                status: "Confirmed"
            });
        }

        return res.status(200).json({ message: "Payment recorded successfully , book rented successfully " });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { userPayment, confirmPayment };