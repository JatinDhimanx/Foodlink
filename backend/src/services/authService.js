const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (userData) => {
  const { name, email, password, role, location, phone } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    location,
    phone,
  });

  if (user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

module.exports = {
  registerUser,
  loginUser,
};
