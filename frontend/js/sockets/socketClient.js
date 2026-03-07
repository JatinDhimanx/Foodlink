import tokenService from '../services/tokenService.js';
import notificationService from '../services/notificationService.js';

let socket = null;

const socketClient = {
  connect: () => {
    if (!socket && window.io) {
      socket = window.io('http://localhost:5000');
      
      const user = tokenService.getUser();
      if (user) {
        // Join role-based room
        socket.emit('join_room', user.role);
        
        // Listen for generic updates
        socket.on('new_food_listing', (listing) => {
          if (user.role === 'ngo') {
            notificationService.show('New food listing available nearby!', 'info');
            // Dispatch a custom event to notify components
            window.dispatchEvent(new CustomEvent('foodlink:new_listing', { detail: listing }));
          }
        });

        socket.on('new_pickup_request', (data) => {
          if (user.role === 'volunteer') {
            notificationService.show('New delivery task available!', 'info');
            window.dispatchEvent(new CustomEvent('foodlink:new_pickup', { detail: data }));
          }
        });
      }
    }
    return socket;
  },

  getSocket: () => socket,

  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }
};

export default socketClient;
