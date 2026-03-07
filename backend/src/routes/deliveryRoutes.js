const express = require('express');
const { acceptDelivery, updateStatus, getMyDeliveries } = require('../controllers/deliveryController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const roles = require('../constants/roles');

const router = express.Router();

router.post('/accept', protect, authorize(roles.VOLUNTEER), acceptDelivery);
router.put('/:deliveryId/status', protect, authorize(roles.VOLUNTEER), updateStatus);
router.get('/my-deliveries', protect, authorize(roles.VOLUNTEER), getMyDeliveries);

module.exports = router;
