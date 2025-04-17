const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const blacklistToken = require("../Models/blacklistToken");
const rateLimit = require("express-rate-limit");


async function DeleteUserbyID(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(req.params.id);
        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

async function TestUser(req, res) {
    console.log("Test route hit");
    return res.json({ message: "Hello from the server side" });
}

async function RegisterTestRoute(req, res) {
    return res.json({ message: "Register route hit" });
}

async function RegisterUser(req, res) {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    // Validate name
    if (!/^[A-Za-z\s]+$/.test(name)) {
        return res.status(400).json({ message: "Name must contain only letters and spaces" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password length
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const emailLower = email.toLowerCase();

        user = new User({ name, email: emailLower, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send response with token and user details
        return res.status(201).json({ token, user: { id: user._id, name, email } });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

async function LoginUser(req, res) {
    const { email, password } = req.body; // Get email & password from request body

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    try {
        // Step 1: Check if user exists
        const emailLower = email.toLowerCase();
        const user = await User.findOne({ email: emailLower });
        if (!user) return res.status(400).json({ message: "User not found" });

        //Step 2: Validate password
        const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        //Step 3: Generate JWT token
        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

        //Step 4: Respond with token & user details
        res.json({
            token,
            user: { id: user._id, name: user.name, email, }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

}

async function LogoutUser(req, res) {
    const authHeader = req.header("Authorization")
    if (!authHeader) return res.status(400).json({ message: "Token not provided" });

    const token = authHeader.split(" ")[1];
    try {
        await blacklistToken.create({ token });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function getUserProfile(req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

async function updateUserProfile(req, res) {
    const { name, email, password } = req.body;

    try {
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        return res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }

}

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,                   // Maximum 5 login attempts in 15 minutes
    message: { message: "Too many login attempts, please try again later" }
});

module.exports = {
    DeleteUserbyID,
    TestUser,
    RegisterTestRoute,
    RegisterUser,
    LoginUser,
    LogoutUser,
    getUserProfile,
    updateUserProfile,
    loginLimiter
};