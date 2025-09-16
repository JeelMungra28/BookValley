const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error(
        "MongoDB connection string is missing in environment variables"
      );
    }

    const options = {
      // These options help with Vercel's serverless environment
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    };

    await mongoose
      .connect(mongoURI, options)
      .then(() => console.log("MongoDB connected"));
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;
