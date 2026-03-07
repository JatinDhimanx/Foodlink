const pickupService = require('../services/pickupService');
const { sendResponse } = require('../utils/helpers');

const requestPickup = async (req, res, next) => {
  try {
    const { foodListingId } = req.body;
    const data = await pickupService.requestPickup(req.user._id, foodListingId);
    sendResponse(res, 201, true, 'Pickup requested successfully', data);
  } catch (error) {
    next(error);
  }
};

const getMyPickups = async (req, res, next) => {
  try {
    const data = await pickupService.getPickupsByNgo(req.user._id);
    sendResponse(res, 200, true, 'NGO pickups fetched', data);
  } catch (error) {
    next(error);
  }
};

const getPendingPickups = async (req, res, next) => {
  try {
    const data = await pickupService.getPendingPickups();
    sendResponse(res, 200, true, 'Pending pickups fetched', data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requestPickup,
  getMyPickups,
  getPendingPickups,
};
