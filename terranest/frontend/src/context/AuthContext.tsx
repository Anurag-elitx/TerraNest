import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';

export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
  organization?: string;
  totalEmissionSaved: number;
  actionsCompleted: number;
  challengesJoined: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

const loadUser = async () => {
  try {
    const userData = await authAPI.getProfile();
    setUser({
      ...userData,
      id: userData._id || userData.id, // Handle both cases
    });
  } catch (error) {
    localStorage.removeItem('token');
  } finally {
    setLoading(false);
  }
};


const login = async (email: string, password: string) => {
  try {
    const data = await authAPI.login(email, password);
    localStorage.setItem('token', data.token);
    setUser({
      ...data.user,
      id: data.user._id || data.user.id,
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};


const register = async (userData: any) => {
  try {
    const data = await authAPI.register(userData);
    localStorage.setItem('token', data.token);
    setUser({
      ...data.user,
      id: data.user._id || data.user.id,
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};



  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
