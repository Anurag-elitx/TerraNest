import axios from 'axios';
import { API_URL } from '../config';

export const getActions = async () => {
  const response = await axios.get(`${API_URL}/api/actions`);
  return response.data;
};

export const getActionById = async (id: string) => {
  const response = await axios.get(`${API_URL}/api/actions/${id}`);
  return response.data;
};

export const completeAction = async (actionId: string, data: any) => {
  const response = await axios.post(`${API_URL}/api/user-actions`, {
    action: actionId,
    ...data
  });
  return response.data;
};

export const getUserActions = async () => {
  const response = await axios.get(`${API_URL}/api/user-actions/me`);
  return response.data;
};
