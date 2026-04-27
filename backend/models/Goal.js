const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Please add a goal name'],
    trim: true,
  },
  targetAmount: {
    type: Number,
    required: [true, 'Please add a target amount'],
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
    required: false,
  },
  color: {
    type: String,
    default: '#10b981', // default emerald
  },
  icon: {
    type: String,
    default: 'target',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Goal', goalSchema);
