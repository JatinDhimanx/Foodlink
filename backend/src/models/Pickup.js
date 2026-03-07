const mongoose = require('mongoose');
const status = require('../constants/status');

const pickupSchema = new mongoose.Schema({
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodListingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodListing',
    required: true,
  },
  status: {
    type: String,
    enum: [status.PICKUP.PENDING, status.PICKUP.ACCEPTED, status.PICKUP.COMPLETED, status.PICKUP.CANCELLED],
    default: status.PICKUP.PENDING,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pickup', pickupSchema);
