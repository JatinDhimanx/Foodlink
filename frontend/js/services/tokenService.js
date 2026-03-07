const TOKEN_KEY = 'foodlink_token';
const USER_KEY = 'foodlink_user';

const tokenService = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  
  setAuth: (data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify({
      id: data._id,
      name: data.name,
      role: data.role,
      email: data.email
    }));
  },
  
  getUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },
  
  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY)
};

export default tokenService;
