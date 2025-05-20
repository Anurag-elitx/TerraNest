import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'public' | 'school' | 'corporate' | 'admin';
  profilePicture?: string;
  organization?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set auth token for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      
      const newUser = response.data;
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Set auth token for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${newUser.token}`;
      
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    toast.info('Logged out successfully');
    navigate('/');
  };

  const updateProfile = async (userData: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.put(`${API_URL}/api/auth/profile`, userData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      
      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Profile update failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
