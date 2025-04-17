const jwt = require("jsonwebtoken");
const blacklistToken = require("../Models/blacklistToken");
const User = require("../Models/User");


const authenticateUser = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const isBlacklisted = await blacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Please log in again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded._id) {
            return res.status(400).json({ message: "Invalid token payload: missing user ID" });
        }

        const user = await User.findById(decoded._id); // fetch user from DB

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};


const authorizeAdmin = (req, res, next) => {
    console.log("User info from token:", req.user);
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

module.exports = { authenticateUser, authorizeAdmin };

