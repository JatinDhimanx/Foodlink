import tokenService from '../services/tokenService.js';

const API_URL = 'http://localhost:5000/api';

const fetchWithToken = async (endpoint, options = {}) => {
  const token = tokenService.getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error occurred');
  return data;
};

export const createListing = async (listingData) => {
  return await fetchWithToken('/food', {
    method: 'POST',
    body: JSON.stringify(listingData),
  });
};

export const getAvailableListings = async () => {
  return await fetchWithToken('/food/available');
};

export const getMyListings = async () => {
  return await fetchWithToken('/food/my-listings');
};
