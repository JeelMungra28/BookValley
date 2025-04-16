const express = require("express");
const { authenticateUser } = require("../Middleware/authMiddleware");
const { getUserProfile, updateUserProfile } = require("../Controller/user");
const router = express.Router();

// Get user profile
router.get("/profile", authenticateUser, getUserProfile);

// Update user profile
router.put("/profile", authenticateUser, updateUserProfile);

module.exports = router;
