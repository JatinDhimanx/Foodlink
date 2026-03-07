const mongoose = require('mongoose');
const status = require('../constants/status');

const deliverySchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pickupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pickup',
    required: true,
  },
  status: {
    type: String,
    enum: [status.DELIVERY.PENDING, status.DELIVERY.IN_TRANSIT, status.DELIVERY.DELIVERED, status.DELIVERY.CANCELLED],
    default: status.DELIVERY.PENDING,
  },
  startedAt: { type: Date },
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Delivery', deliverySchema);
