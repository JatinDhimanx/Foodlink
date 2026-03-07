const FoodListing = require('../models/FoodListing');
const status = require('../constants/status');
const socketIO = require('../config/socket');

const createFoodListing = async (restaurantId, data) => {
  const listing = await FoodListing.create({
    restaurantId,
    ...data,
    status: status.FOOD.AVAILABLE
  });
  
  // Notify NGOs about new food
  socketIO.getIO().to('ngo').emit('new_food_listing', listing);
  
  return listing;
};

const getAvailableListings = async () => {
  const listings = await FoodListing.find({ status: status.FOOD.AVAILABLE }).populate('restaurantId', 'name email location phone');
  return listings;
};

const updateListingStatus = async (listingId, newStatus) => {
  const listing = await FoodListing.findById(listingId);
  if (!listing) {
    throw new Error('Listing not found');
  }
  listing.status = newStatus;
  await listing.save();
  return listing;
};

const getListingsByRestaurant = async (restaurantId) => {
    return await FoodListing.find({ restaurantId }).sort('-createdAt');
};

module.exports = {
  createFoodListing,
  getAvailableListings,
  updateListingStatus,
  getListingsByRestaurant
};
