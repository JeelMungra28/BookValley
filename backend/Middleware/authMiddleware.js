const jwt = require("jsonwebtoken");
const blacklistToken = require("../Models/blacklistToken");


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
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};


const authorizeAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

module.exports = { authenticateUser, authorizeAdmin };

