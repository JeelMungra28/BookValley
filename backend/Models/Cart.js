const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate total price before saving
cartSchema.pre('save', async function(next) {
  try {
    let total = 0;
    for (const item of this.items) {
      const book = await mongoose.model('Book').findById(item.bookId);
      if (book) {
        total += book.price * item.quantity;
      }
    }
    this.totalPrice = total;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Cart', cartSchema); 