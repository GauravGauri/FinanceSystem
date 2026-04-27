const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please add a budget amount'],
  },
  period: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly',
  },
  color: {
    type: String,
    default: '#3b82f6', // default blue
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Budget', budgetSchema);
