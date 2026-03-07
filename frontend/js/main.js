import tokenService from './services/tokenService.js';
import socketClient from './sockets/socketClient.js';
import navbar from './components/navbar.js';
import notificationService from './services/notificationService.js';

document.addEventListener('DOMContentLoaded', () => {
  navbar.init();

  if (document.getElementById('map-view')) return; // Leave map logic to map script
  
  const user = tokenService.getUser();
  if (user) {
    socketClient.connect();
    // Reconnect sockets if page loads and user is logged in
  } else {
    // If on a protected page, redirect
    const publicPages = ['/index.html', '/', '/login.html', '/register.html'];
    if (!publicPages.includes(window.location.pathname)) {
      window.location.href = '/login.html';
    }
  }
});
