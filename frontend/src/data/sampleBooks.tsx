import { Book } from "../types/Book";

// Sample data for demonstration
const sampleBooks: Book[] = [
    // {
    //     "_id": "67c707cbccbeb09f00195815",
    //     "title": "The Alchemist",
    //     "author": "Paulo Coelho",
    //     "category": "Fiction",
    //     "description": "A journey of self-discovery.",
    //     "price": 300,
    //     "coverImage": "https://example.com/book-cover.jpg",
    //     "createdAt": "2025-03-04T14:01:47.762Z",
    // },
    // {
    //     _id: "67c70833ccbeb09f00195817",
    //     title: "Harry Potter",
    //     author: "J.K. Rowling",
    //     category: "Fantasy",
    //     description: "A young wizard's adventure.",
    //     price: 400,
    //     coverImage: "https://example.com/harry-potter.jpg",
    //     createdAt: "2025-03-04T14:03:31.051Z",
    // },
    {
        _id: "67c707cbccbeb09f00195817",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        description: "The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
        price: 275,
        coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
        createdAt: "2025-03-04T14:01:47.762Z",

        available: true
    },
    {
        _id: "67c707cbccbeb09f00195818",
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "Non-Fiction",
        description: "A brief history of humankind, exploring the ways in which biology and history have defined us.",
        price: 450,
        coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646",
        createdAt: "2025-04-14T14:01:47.762Z",
        available: true // More   
    },
    {
        _id: "67c707cbccbeb09f00195819",
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        description: "An easy and proven way to build good habits and break bad ones.",
        price: 400,
        coverImage: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18",
        createdAt: "2025-04-15T10:30:00.000Z",
        available: true // Even more recent
    },
    {
        _id: "67c707cbccbeb09f00195820",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        category: "Thriller",
        description: "A shocking psychological thriller of a woman's act of violence against her husband.",
        price: 325,
        coverImage: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd",
        createdAt: "2025-04-16T08:15:23.000Z",
        available: true // Very recent (today)
    },
    {
        _id: "67c707cbccbeb09f00195815",
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        description: "A journey of self-discovery.",
        price: 300,
        coverImage: "https://example.com/book-cover.jpg",
        createdAt: "2025-03-04T14:01:47.762Z",
        available: false
    },
    {
        _id: "67c70833ccbeb09f00195817",
        title: "Harry Potter",
        author: "J.K. Rowling",
        category: "Fantasy",
        description: "A young wizard's adventure.",
        price: 400,
        coverImage: "https://example.com/harry-potter.jpg",
        createdAt: "2025-03-04T14:03:31.051Z",
        available: true

    },
    {
        _id: "67c7432be048e07874592792",
        title: "Harry Potter 3",
        author: "J.K. Rowling",
        category: "Fantasy",
        description: "",
        price: 4000,
        coverImage: "https://example.com/harry-potter.jpg",
        createdAt: "2025-03-04T18:15:07.269Z",
        available: true

    },
    {
        _id: "67c763890e9d89e05cf98eae",
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Finance",
        description: "A book about financial education.",
        price: 299,
        coverImage: "https://example.com/book-cover.jpg",
        createdAt: "2025-03-04T20:33:13.912Z",
        available: true

    },
    {
        _id: "67c76b7b0e9d89e05cf98eb0",
        title: "Rich Dad Poor Dad 2",
        author: "Robert Kiyosaki",
        category: "Finance",
        description: "A book about financial education.",
        price: 299,
        coverImage: "https://example.com/book-cover.jpg",
        createdAt: "2025-03-04T21:07:07.014Z",
        available: false

    },
    {
        _id: "67fe52a272c7d3fdecc2a349",
        title: "The Art of Coding",
        author: "Jane Doe",
        category: "Technology",
        description: "A comprehensive guide to modern software development practices.",
        price: 499,
        coverImage: "https://example.com/images/the-art-of-coding.jpg",
        createdAt: "2025-04-15T12:35:46.140Z",
        available: false
    }
];

export default sampleBooks;