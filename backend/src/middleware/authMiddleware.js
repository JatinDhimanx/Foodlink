const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/User');
const { sendResponse } = require('../utils/helpers');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      return sendResponse(res, 401, false, 'Not authorized, token failed');
    }
  }

  if (!token) {
    return sendResponse(res, 401, false, 'Not authorized, no token');
  }
};

module.exports = { protect };
