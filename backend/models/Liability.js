const mongoose = require('mongoose');

const liabilitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Please add a liability name'],
  },
  value: {
    type: Number,
    required: [true, 'Please add a value'],
  },
  interestRate: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Liability', liabilitySchema);
