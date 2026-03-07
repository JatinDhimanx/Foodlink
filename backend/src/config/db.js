const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  try {
    let uri = env.MONGO_URI;
    
    // Check if the URI is the default template and use mongodb-memory-server
    if (uri.includes('<username>')) {
      console.log('Using local persistent MongoDB connection on port 27017...');
      uri = 'mongodb://127.0.0.1:27017/foodlink';
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
