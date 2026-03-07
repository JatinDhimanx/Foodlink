const http = require('http');
const app = require('./app');
const env = require('./config/env');
const connectDB = require('./config/db');
const socketIO = require('./config/socket');
const handleSockets = require('./sockets/socketHandler');

// Connect to database
connectDB();

const server = http.createServer(app);

// Initialize Socket.io
socketIO.init(server);
handleSockets();

const PORT = env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});
