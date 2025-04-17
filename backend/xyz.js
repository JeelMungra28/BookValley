/*
const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Yzc1Njg3NWEwOTQ2N2IzOGExMDdhYyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NDExOTg3ODQsImV4cCI6MTc0MTIwMjM4NH0.aepENo_NF0EkkYtQHGZ5-TNq4KZ187ti74_6ZKxPDro";
const decoded = jwt.decode(token);
console.log(decoded);
*/

const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Yzc1Njg3NWEwOTQ2N2IzOGExMDdhYyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NDExOTk2MTAsImV4cCI6MTc0MTIwMzIxMH0._rBCMF-U6vMM4uHgoVOGrSpNCiJ14PAj95ii0PuDyYE"; // Replace with your token

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token is valid:", decoded);
} catch (error) {
    console.log("Token verification failed:", error.message);
}
