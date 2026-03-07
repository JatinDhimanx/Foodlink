const authService = require('../services/authService');
const { sendResponse } = require('../utils/helpers');

const register = async (req, res, next) => {
  try {
    const data = await authService.registerUser(req.body);
    sendResponse(res, 201, true, 'User registered successfully', data);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    sendResponse(res, 200, true, 'Logged in successfully', data);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    sendResponse(res, 200, true, 'User profile fetched', req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
