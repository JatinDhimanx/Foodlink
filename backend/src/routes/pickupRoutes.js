const express = require('express');
const { requestPickup, getMyPickups, getPendingPickups } = require('../controllers/pickupController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const roles = require('../constants/roles');

const router = express.Router();

router.post('/request', protect, authorize(roles.NGO), requestPickup);
router.get('/my-pickups', protect, authorize(roles.NGO), getMyPickups);
router.get('/pending', protect, authorize(roles.VOLUNTEER), getPendingPickups);

module.exports = router;
