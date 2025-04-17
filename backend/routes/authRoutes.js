const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../Middleware/authMiddleware");
const { DeleteUserbyID, TestUser, RegisterTestRoute, RegisterUser, LoginUser, LogoutUser, loginLimiter } = require("../Controller/user");
const router = express.Router();

// Test route
router.get("/", TestUser);

// Register route (GET for testing)
router.get("/register", RegisterTestRoute);

// Register User (POST)
router.post("/register", RegisterUser);

// Login User (POST)
router.post("/login", loginLimiter, LoginUser);

// Logout User
router.post("/logout", authenticateUser, LogoutUser);

// Delete User
router.delete("/delete/:id", authenticateUser, authorizeAdmin, DeleteUserbyID);

module.exports = router;
