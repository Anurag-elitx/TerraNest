import axios from 'axios';
import { API_URL } from '../config';

export const getPosts = async (filter?: string) => {
  const url = filter 
    ? `${API_URL}/api/posts?category=${filter}` 
    : `${API_URL}/api/posts`;
  const response = await axios.get(url);
  return response.data;
};

export const getPostById = async (id: string) => {
  const response = await axios.get(`${API_URL}/api/posts/${id}`);
  return response.data;
};

export const createPost = async (postData: any) => {
  const response = await axios.post(`${API_URL}/api/posts`, postData);
  return response.data;
};

export const likePost = async (postId: string) => {
  const response = await axios.post(`${API_URL}/api/posts/${postId}/like`);
  return response.data;
};

export const commentOnPost = async (postId: string, text: string) => {
  const response = await axios.post(`${API_URL}/api/posts/${postId}/comments`, { text });
  return response.data;
};