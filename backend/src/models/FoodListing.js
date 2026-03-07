const mongoose = require('mongoose');
const status = require('../constants/status');

const foodListingSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodType: { type: String, required: true },
  quantity: { type: String, required: true },
  pickupTime: { type: Date, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true },
  },
  status: {
    type: String,
    enum: [status.FOOD.AVAILABLE, status.FOOD.RESERVED, status.FOOD.PICKED_UP, status.FOOD.DELIVERED],
    default: status.FOOD.AVAILABLE,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FoodListing', foodListingSchema);
