import { register, login } from './api/authApi.js';
import tokenService from './services/tokenService.js';
import locationService from './services/locationService.js';
import notificationService from './services/notificationService.js';
import navbar from './components/navbar.js';

document.addEventListener('DOMContentLoaded', () => {
  navbar.init();

  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await login(email, password);
        tokenService.setAuth(res.data);
        notificationService.show('Logged in successfully!', 'success');
        setTimeout(() => {
          window.location.href = `/dashboard-${res.data.role}.html`;
        }, 1000);
      } catch (error) {
        notificationService.show(error.message, 'error');
      }
    });
  }

  if (registerForm) {
    const roleSelect = document.getElementById('role');
    const locationGroup = document.getElementById('location-group');
    
    // Auto-fetch location if restaurant or NGO
    document.getElementById('fetch-location')?.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const btn = e.target;
        btn.textContent = 'Locating...';
        const coords = await locationService.getCurrentPosition();
        document.getElementById('lat').value = coords.lat;
        document.getElementById('lng').value = coords.lng;
        btn.textContent = 'Location Found ✓';
        btn.style.backgroundColor = '#2ECC71';
        btn.style.color = 'white';
        btn.style.border = 'none';
      } catch (error) {
        notificationService.show('Failed to get location. Please allow location access.', 'error');
        e.target.textContent = 'Get Current Location';
      }
    });

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const role = roleSelect.value;
      
      const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value,
        role: role
      };

      if (['restaurant', 'ngo'].includes(role)) {
         userData.location = {
           lat: parseFloat(document.getElementById('lat').value),
           lng: parseFloat(document.getElementById('lng').value),
           address: document.getElementById('address').value
         };
         
         if (isNaN(userData.location.lat)) {
             notificationService.show('Location coordinates are required', 'error');
             return;
         }
      }

      try {
        const res = await register(userData);
        tokenService.setAuth(res.data);
        notificationService.show('Registered successfully!', 'success');
        setTimeout(() => {
          window.location.href = `/dashboard-${role}.html`;
        }, 1000);
      } catch (error) {
        notificationService.show(error.message, 'error');
      }
    });
  }
});
