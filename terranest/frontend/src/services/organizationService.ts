import axios from 'axios';
import { API_URL } from '../config';

export const getOrganizations = async () => {
  const response = await axios.get(`${API_URL}/api/organizations`);
  return response.data;
};

export const getOrganizationById = async (id: string) => {
  const response = await axios.get(`${API_URL}/api/organizations/${id}`);
  return response.data;
};

export const createOrganization = async (orgData: any) => {
  const response = await axios.post(`${API_URL}/api/organizations`, orgData);
  return response.data;
};

export const updateOrganization = async (id: string, orgData: any) => {
  const response = await axios.put(`${API_URL}/api/organizations/${id}`, orgData);
  return response.data;
};

export const addMember = async (orgId: string, email: string) => {
  const response = await axios.post(`${API_URL}/api/organizations/${orgId}/members`, { email });
  return response.data;
};
