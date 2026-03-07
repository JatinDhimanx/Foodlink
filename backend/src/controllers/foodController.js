const foodService = require('../services/foodService');
const { sendResponse } = require('../utils/helpers');

const createListing = async (req, res, next) => {
  try {
    const data = await foodService.createFoodListing(req.user._id, req.body);
    sendResponse(res, 201, true, 'Food listing created successfully', data);
  } catch (error) {
    next(error);
  }
};

const getAvailableListings = async (req, res, next) => {
  try {
    const listings = await foodService.getAvailableListings();
    sendResponse(res, 200, true, 'Available listings fetched', listings);
  } catch (error) {
    next(error);
  }
};

const getMyListings = async (req, res, next) => {
  try {
    const listings = await foodService.getListingsByRestaurant(req.user._id);
    sendResponse(res, 200, true, 'Restaurant listings fetched', listings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createListing,
  getAvailableListings,
  getMyListings,
};
