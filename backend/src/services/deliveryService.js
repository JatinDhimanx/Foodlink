const Delivery = require('../models/Delivery');
const pickupService = require('./pickupService');
const foodService = require('./foodService');
const status = require('../constants/status');
const socketIO = require('../config/socket');

const acceptDelivery = async (volunteerId, pickupId) => {
  const pickup = await pickupService.updatePickupStatus(pickupId, status.PICKUP.ACCEPTED);

  const delivery = await Delivery.create({
    volunteerId,
    pickupId,
    status: status.DELIVERY.PENDING
  });

  // Notify NGO and Restaurant
  socketIO.getIO().emit(`ngo_${pickup.ngoId}`, { type: 'DELIVERY_ACCEPTED', delivery });

  return delivery;
};

const updateDeliveryStatus = async (deliveryId, newDeliveryStatus) => {
  const delivery = await Delivery.findById(deliveryId).populate('pickupId');
  if (!delivery) throw new Error('Delivery not found');

  delivery.status = newDeliveryStatus;
  
  if (newDeliveryStatus === status.DELIVERY.IN_TRANSIT) {
     delivery.startedAt = new Date();
     await foodService.updateListingStatus(delivery.pickupId.foodListingId, status.FOOD.PICKED_UP);
  } else if (newDeliveryStatus === status.DELIVERY.DELIVERED) {
     delivery.completedAt = new Date();
     await pickupService.updatePickupStatus(delivery.pickupId._id, status.PICKUP.COMPLETED);
     await foodService.updateListingStatus(delivery.pickupId.foodListingId, status.FOOD.DELIVERED);
  }

  await delivery.save();

  socketIO.getIO().emit(`delivery_update_${delivery.pickupId._id}`, delivery);

  return delivery;
};

const getDeliveriesByVolunteer = async (volunteerId) => {
    return await Delivery.find({ volunteerId })
        .populate({
            path: 'pickupId',
            populate: [
                { path: 'ngoId', select: 'name location phone' },
                { 
                    path: 'foodListingId', 
                    populate: { path: 'restaurantId', select: 'name location phone' } 
                }
            ]
        })
        .sort('-createdAt');
};

module.exports = {
  acceptDelivery,
  updateDeliveryStatus,
  getDeliveriesByVolunteer
};
