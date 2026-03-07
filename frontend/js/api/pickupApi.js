import tokenService from '../services/tokenService.js';

const API_URL = 'http://localhost:5000/api';

const fetchWithToken = async (endpoint, options = {}) => {
  const token = tokenService.getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error occurred');
  return data;
};

export const requestPickup = async (foodListingId) => {
  return await fetchWithToken('/pickups/request', {
    method: 'POST',
    body: JSON.stringify({ foodListingId }),
  });
};

export const getMyPickups = async () => {
  return await fetchWithToken('/pickups/my-pickups');
};

export const getPendingPickups = async () => {
  return await fetchWithToken('/pickups/pending');
};
