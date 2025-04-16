export interface BookType {
    id: string;
    title: string;
    author: string;
    coverImage: string;
    rating: number;
    price: number;
    available: boolean;
}

// Sample featured books data
export const featuredBooks: BookType[] = [
    {
        id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        coverImage: "/placeholder.svg?height=400&width=300",
        rating: 4.5,
        price: 5.99,
        available: true,
    },
    {
        id: "2",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        coverImage: "/placeholder.svg?height=400&width=300",
        rating: 4.8,
        price: 6.99,
        available: true,
    },
    {
        id: "3",
        title: "1984",
        author: "George Orwell",
        coverImage: "/placeholder.svg?height=400&width=300",
        rating: 4.6,
        price: 4.99,
        available: false,
    },
    {
        id: "4",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        coverImage: "/placeholder.svg?height=400&width=300",
        rating: 4.7,
        price: 7.99,
        available: true,
    },
];

// Sample new arrivals
export const newArrivals: BookType[] = [
    {
        id: "5",
        title: "Project Hail Mary",
        author: "Andy Weir",
        coverImage: "/placeholder.svg?height=400&width=300",
        rating: 4.9,
        price: 8.99,
        available: true,
    },
    {
        id: "6",
        title: "The Midnight Library",
        author: "Matt Haig",
        coverImage: "/placeholder.svg?height=400&width=300",
        rating: 4.4,
        price: 6.49,
        available: true,
    },
    {
        id: "7",
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        coverImage: "/placeholder.svg?height=400&width=300",
        rating: 4.3,
        price: 7.49,
        available: true,
    },
];

// Sample categories
export const categories = [
    { id: "fiction", name: "Fiction", count: 245, icon: "📚" },
    { id: "non-fiction", name: "Non-Fiction", count: 156, icon: "📝" },
    { id: "science", name: "Science", count: 87, icon: "🔬" },
    { id: "history", name: "History", count: 112, icon: "🏛️" },
    { id: "biography", name: "Biography", count: 65, icon: "👤" },
    { id: "fantasy", name: "Fantasy", count: 93, icon: "🧙" },
];