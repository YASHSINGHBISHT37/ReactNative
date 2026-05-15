import axios from 'axios';
import { BASE_URL } from '../constants/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'Something went wrong';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

// API methods
export const getAlbum = async (browseId) => {
  return await api.get(`/album/${browseId}`);
};

export const searchMusic = async (query, filter = 'songs') => {
  return await api.get('/search/', {
    params: { q: query, filter },
  });
};

export const getArtist = async (channelId) => {
  return await api.get(`/artist/${channelId}`);
};

export const getHome = async () => {
  return await api.get('/home/');
};

// Export instance for future use
export default api;