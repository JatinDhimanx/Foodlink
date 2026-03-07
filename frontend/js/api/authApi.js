import tokenService from '../services/tokenService.js';

const API_URL = 'http://localhost:5000/api';

const fetchWithToken = async (endpoint, options = {}) => {
  const token = tokenService.getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

export const login = async (email, password) => {
  return await fetchWithToken('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const register = async (userData) => {
  return await fetchWithToken('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const getMe = async () => {
  return await fetchWithToken('/auth/me');
};
