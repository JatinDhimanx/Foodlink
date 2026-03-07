const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  try {
    let uri = env.MONGO_URI;
    
    // Check if the URI is the default template and use mongodb-memory-server
    if (uri.includes('<username>')) {
      console.log('No realistic MONGO_URI provided. Starting in-memory MongoDB...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
