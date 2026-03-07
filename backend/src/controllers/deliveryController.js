const deliveryService = require('../services/deliveryService');
const { sendResponse } = require('../utils/helpers');

const acceptDelivery = async (req, res, next) => {
  try {
    const { pickupId } = req.body;
    const data = await deliveryService.acceptDelivery(req.user._id, pickupId);
    sendResponse(res, 201, true, 'Delivery accepted successfully', data);
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { deliveryId } = req.params;
    const data = await deliveryService.updateDeliveryStatus(deliveryId, status);
    sendResponse(res, 200, true, 'Delivery status updated', data);
  } catch (error) {
    next(error);
  }
};

const getMyDeliveries = async (req, res, next) => {
  try {
    const data = await deliveryService.getDeliveriesByVolunteer(req.user._id);
    sendResponse(res, 200, true, 'Volunteer deliveries fetched', data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  acceptDelivery,
  updateStatus,
  getMyDeliveries,
};
