const socketIO = require('../config/socket');

const handleSockets = () => {
  const io = socketIO.getIO();

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join room for real-time updates
    socket.on('join_room', (roleName) => {
      socket.join(roleName);
      console.log(`User joined room: ${roleName}`);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = handleSockets;
