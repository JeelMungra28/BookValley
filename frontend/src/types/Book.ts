export interface Book {
  [x: string]: any;
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  price: number;
  coverImage: string;
  createdAt: string;
  available: boolean; // Indicates if the book is available for purchase
}

// Current system information
export const SYSTEM_INFO = {
  currentDate: "2025-04-16 21:21:50", // UTC
  currentUser: "JeelMungra28",
};
