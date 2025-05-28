import api from './api';

export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  user: {
    id: string;
    name: string;
    profilePicture: string;
  };
  organization?: {
    id: string;
    name: string;
  };
  images: string[];
  tags: string[];
  likes: string[];
  comments: Array<{
    id: string;
    user: {
      id: string;
      name: string;
      profilePicture: string;
    };
    text: string;
    date: string;
  }>;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  category?: string;
  organization?: string;
  images?: string[];
  tags?: string[];
}

class PostService {
  async getUserFeed(params?: {
    page?: number;
    limit?: number;
  }) {
    try {
      const response = await api.get('/posts/feed', { params });
      return response.data;
    } catch (error) {
      return { posts: [] };
    }
  }

  async createPost(data: CreatePostData) {
    try {
      const response = await api.post('/posts', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create post');
    }
  }

  async toggleLike(id: string) {
    try {
      const response = await api.post(`/posts/${id}/like`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to toggle like');
    }
  }
}

export default new PostService();
