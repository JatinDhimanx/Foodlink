const Pickup = require('../models/Pickup');
const foodService = require('./foodService');
const status = require('../constants/status');
const socketIO = require('../config/socket');

const requestPickup = async (ngoId, foodListingId) => {
  // Check if food applies
  const listing = await foodService.updateListingStatus(foodListingId, status.FOOD.RESERVED);

  const pickup = await Pickup.create({
    ngoId,
    foodListingId,
    status: status.PICKUP.PENDING
  });

  // Notify Volunteers about new pickup delivery opportunity
  socketIO.getIO().to('volunteer').emit('new_pickup_request', { pickup, listing });
  
  // Notify Restaurant 
  socketIO.getIO().emit(`restaurant_${listing.restaurantId}`, { type: 'RESERVED', pickup });

  return pickup;
};

const getPickupsByNgo = async (ngoId) => {
  return await Pickup.find({ ngoId })
    .populate({
        path: 'foodListingId',
        populate: { path: 'restaurantId', select: 'name location phone' }
    }).sort('-createdAt');
};

const getPendingPickups = async () => {
    return await Pickup.find({ status: status.PICKUP.PENDING })
        .populate({
            path: 'foodListingId',
            populate: { path: 'restaurantId', select: 'name location phone' }
        })
        .populate('ngoId', 'name location phone');
};

const updatePickupStatus = async (pickupId, newStatus) => {
    const pickup = await Pickup.findById(pickupId);
    if (!pickup) throw new Error('Pickup not found');
    
    pickup.status = newStatus;
    await pickup.save();
    return pickup;
};

module.exports = {
  requestPickup,
  getPickupsByNgo,
  getPendingPickups,
  updatePickupStatus
};
