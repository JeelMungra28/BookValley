const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: "1d" } // Auto-delete after 1 day
});

const BlacklistedToken = mongoose.model("BlacklistedToken", blacklistedTokenSchema);

module.exports = BlacklistedToken;
