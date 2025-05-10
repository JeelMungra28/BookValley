# Backend of BookValley

## 📚 Overview

The backend of BookValley is a RESTful API built with Node.js and Express. It provides endpoints for managing books, rentals, user authentication, and wishlists. The backend ensures secure and efficient data handling with MongoDB as the database.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables by creating a `.env` file with the following:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run start
   ```

5. The backend will be accessible at:
   ```
   http://localhost:5000
   ```

---

## 🛠️ Tech Stack

- **Language**: JavaScript
- **Framework**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

---

## 📂 Directory Structure

- `Controller/`: Contains logic for handling API requests
- `Routes/`: Defines API endpoints
- `Models/`: MongoDB schema definitions
- `Middleware/`: Middleware functions for authentication and validation

---

## ✨ Key Features

- CRUD operations for books
- User authentication with JWT
- Rental management, including calculating rental fees
- Wishlist functionality

---

## 🔧 Development

1. To run the server in development mode:
   ```bash
   npm run dev
   ```

2. To lint the code:
   ```bash
   npm run lint
   ```

---

## 📞 Contact

For any queries, reach out to [JeelMungra28](https://github.com/JeelMungra28).

---
