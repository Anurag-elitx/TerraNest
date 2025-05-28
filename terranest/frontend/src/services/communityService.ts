import api from './api';

export interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  admin: {
    id: string;
    name: string;
    profilePicture: string;
  };
  members: Array<{
    id: string;
    name: string;
    profilePicture: string;
  }>;
  memberCount: number;
  postCount: number;
  isPrivate: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommunityData {
  name: string;
  description: string;
  category: string;
  image?: string;
}

class CommunityService {
  async getCommunities(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    try {
      const response = await api.get('/communities', { params });
      return response.data;
    } catch (error) {
      return {
        communities: [
          {
            id: '1',
            name: 'Green Living Community',
            description: 'A community focused on sustainable living practices',
            category: 'lifestyle',
            memberCount: 150,
            postCount: 45,
            isPrivate: false,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            admin: { id: '1', name: 'Admin', profilePicture: '' },
            members: []
          }
        ]
      };
    }
  }

  async createCommunity(data: CreateCommunityData) {
    try {
      const response = await api.post('/communities', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create community');
    }
  }

  async joinCommunity(id: string) {
    try {
      const response = await api.post(`/communities/${id}/join`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to join community');
    }
  }

  async leaveCommunity(id: string) {
    try {
      const response = await api.post(`/communities/${id}/leave`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to leave community');
    }
  }

  async getUserCommunities(type: 'joined' | 'admin' = 'joined') {
    try {
      const response = await api.get('/communities/user/my-communities', {
        params: { type }
      });
      return response.data;
    } catch (error) {
      return { communities: [] };
    }
  }
}

export default new CommunityService();
