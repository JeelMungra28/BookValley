const Book = require('../Models/Book');
const Category = require('../Models/Category');

exports.globalSearch = async (req, res) => {
    try {
        const { q: query } = req.query;

        if (!query) {
            return res.json({
                books: [],
                categories: [],
                total: 0
            });
        }

        // Search in books
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).limit(10);

        // Search in categories
        const categories = await Category.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).limit(5);

        // Get search suggestions
        const suggestions = [
            ...books.map(book => ({
                type: 'book',
                title: book.title,
                id: book._id
            })),
            ...categories.map(category => ({
                type: 'category',
                title: category.name,
                id: category._id
            }))
        ].slice(0, 5);

        res.json({
            books,
            categories,
            suggestions,
            total: books.length + categories.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Error performing search', error: error.message });
    }
}; 