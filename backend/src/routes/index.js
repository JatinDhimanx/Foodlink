const express = require('express');
const authRoutes = require('./authRoutes');
const foodRoutes = require('./foodRoutes');
const pickupRoutes = require('./pickupRoutes');
const deliveryRoutes = require('./deliveryRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/food', foodRoutes);
router.use('/pickups', pickupRoutes);
router.use('/deliveries', deliveryRoutes);

module.exports = router;
