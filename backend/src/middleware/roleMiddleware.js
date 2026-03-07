const { sendResponse } = require('../utils/helpers');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendResponse(
        res,
        403,
        false,
        `User role ${req.user ? req.user.role : 'Unknown'} is not authorized to access this route`
      );
    }
    next();
  };
};

module.exports = { authorize };
