const express = require("express");
const Stripe = require("stripe");
const { userPayment, confirmPayment } = require("../Controller/payment");
const { authenticateUser } = require("../Middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET);
const Payment = require("../Models/paymentModel");

// make payment
router.post("/create", authenticateUser, userPayment);

// payment details
router.post("/confirm", authenticateUser, confirmPayment);

module.exports = router;
