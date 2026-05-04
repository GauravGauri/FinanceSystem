import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set token from localStorage on initial load to prevent 401s on reload
if (typeof window !== 'undefined') {
  const userString = localStorage.getItem('user');
  if (userString) {
    try {
      const user = JSON.parse(userString);
      if (user && user.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      }
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
    }
  }
}

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;

