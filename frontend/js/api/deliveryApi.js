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

export const acceptDelivery = async (pickupId) => {
  return await fetchWithToken('/deliveries/accept', {
    method: 'POST',
    body: JSON.stringify({ pickupId }),
  });
};

export const updateDeliveryStatus = async (deliveryId, status) => {
  return await fetchWithToken(`/deliveries/${deliveryId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

export const getMyDeliveries = async () => {
  return await fetchWithToken('/deliveries/my-deliveries');
};
