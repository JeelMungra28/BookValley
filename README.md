# BookValley

![BookValley](https://github.com/JeelMungra28/BookValley/assets/201526211/8c57d390-f1c3-4a1a-bc8c-fcb83ce5e1b7)

## 📚 Modern Book Rental Platform

BookValley is a contemporary book rental platform that allows users to discover, rent, and enjoy books with personalized recommendations.

**Last Updated:** 2025-05-02

## 🌟 Features

- **Book Browsing**: Search and filter through our extensive collection of books
- **Book Rental System**: Rent books for specified periods with automatic fee calculation
- **Wishlist Management**: Save your favorite books for future reading
- **User Authentication**: Secure user accounts with proper authorization levels
- **Admin Dashboard**: For administrators to manage books and rentals
- **Responsive UI**: Works on all devices with a modern interface

## 🛠️ Tech Stack

- **Frontend**: TypeScript, React, HTML, CSS
- **Backend**: JavaScript, Node.js, Express
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT-based authentication system

## 📋 Project Structure

The project is divided into two main sections:

### Frontend
- Built with React and TypeScript
- Component-based architecture
- Responsive design for all devices

### Backend
- RESTful API design
- Controller-based architecture
- MongoDB database integration
- Authentication middleware

## 📝 API Endpoints

### Books
- `GET /api/books`: Fetch all books with pagination and sorting
- `GET /api/books/search`: Search for books by query
- `POST /api/books/add`: Add a new book (admin only)
- `DELETE /api/books/:id`: Delete a book (admin only)

### Rentals
- `POST /api/rentals/rent`: Rent a book
- `PUT /api/rentals/:rentalId/return`: Mark a book as returned
- `GET /api/rentals/history`: Get user's rental history

### Wishlist
- `GET /api/wishlist`: Get user's wishlist
- `POST /api/wishlist`: Add book to wishlist
- `DELETE /api/wishlist/:bookId`: Remove book from wishlist
- `GET /api/wishlist/:bookId/status`: Check if a book is in the user's wishlist

## 💻 Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run start
```

## 📱 Usage Examples

### Browsing Books
- Use the search bar to find specific books
- Apply filters for category, price range, and more
- Sort books by title, author, or price

### Renting a Book
1. Select a book and navigate to its detail page
2. Choose a rental period
3. Complete the rental process
4. Return the book before the due date to avoid late fees

## 👥 Contributing

Contributions to BookValley are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Project maintained by [JeelMungra28](https://github.com/JeelMungra28)


---

**BookValley** - Discover, rent, and enjoy books with personalized recommendations
