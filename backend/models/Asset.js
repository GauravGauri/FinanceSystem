const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Please add an asset name'],
  },
  value: {
    type: Number,
    required: [true, 'Please add a value'],
  },
  description: {
    type: String,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Asset', assetSchema);
