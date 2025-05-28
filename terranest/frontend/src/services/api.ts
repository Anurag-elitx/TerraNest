import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5004/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};

// Actions API
export const actionsAPI = {
  getAll: () => api.get('/actions'),
  getActions: (params: any) => api.get('/actions', { params }),
  logAction: (actionId: string, data: any) => api.post(`/actions/${actionId}/log`, data),
  create: (data: any) => api.post('/actions', data),
  update: (id: string, data: any) => api.put(`/actions/${id}`, data),
  delete: (id: string) => api.delete(`/actions/${id}`),
};

// Challenges API
export const challengesAPI = {
  getAll: () => api.get('/challenges'),
  create: (data: any) => api.post('/challenges', data),
  join: (id: string) => api.post(`/challenges/${id}/join`),
  leave: (id: string) => api.post(`/challenges/${id}/leave`),
};

// Posts API
export const postsAPI = {
  getAll: () => api.get('/posts'),
  create: (data: any) => api.post('/posts', data),
  update: (id: string, data: any) => api.put(`/posts/${id}`, data),
  delete: (id: string) => api.delete(`/posts/${id}`),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
};

// Add these to your existing API object
export const communityAPI = {
  getAll: (params: any) => api.get('/communities', { params }),
  create: (data: any) => api.post('/communities', data),
  join: (id: string) => api.post(`/communities/${id}/join`),
  leave: (id: string) => api.post(`/communities/${id}/leave`),
  getUserCommunities: (type: string) => api.get(`/communities/user/my-communities?type=${type}`),
};

export const postAPI = {
  getUserFeed: () => api.get('/posts/feed'),
  create: (data: any) => api.post('/posts', data),
  toggleLike: (id: string) => api.post(`/posts/${id}/like`),
};

export default api;
