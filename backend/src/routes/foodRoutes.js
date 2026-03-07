const express = require('express');
const { createListing, getAvailableListings, getMyListings } = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const roles = require('../constants/roles');

const router = express.Router();

router.post('/', protect, authorize(roles.RESTAURANT), createListing);
router.get('/available', getAvailableListings); // Accessible to everyone
router.get('/my-listings', protect, authorize(roles.RESTAURANT), getMyListings);

module.exports = router;
