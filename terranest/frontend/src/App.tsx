import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserActivityProvider } from './context/UserActivityContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import LandingPage from './services/pages/LandingPage';
import LoginPage from './services/pages/LoginPage';
import RegisterPage from './services/pages/RegisterPage';
import DashboardPage from './services/pages/DashboardPage';
import ActionsPage from './services/pages/ActionsPage';
import { ChallengesPage } from './services/pages/ChallengesPage';
import CommunityPage from './services/pages/CommunityPage';
import OffsetPage from './services/pages/OffsetPage';
import ProfilePage from './services/pages/ProfilePage';
import SettingsPage from './services/pages/SettingsPage';
import AboutPage from './services/pages/AboutPage';
import FAQPage from './services/pages/FAQPage';
import ContactPage from './services/pages/ContactPage';
import BlogPage from './services/pages/BlogPage';
import PrivacyPage from './services/pages/PrivacyPage';
import TermsPage from './services/pages/TermsPage';
import { handleOAuthCallback } from './utils/handleOAuthCallback';
import CommunityDetailsPage from './services/pages/CommunityDetailsPage';

function App() {
  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.add(initialTheme);
  }, []);

  useEffect(() => {
    if (window.location.pathname === '/dashboard' && window.location.search.includes('token=')) {
      handleOAuthCallback();
    }
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <UserActivityProvider>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                
                {/* Auth Routes (redirect to dashboard if logged in) */}
                <Route 
                  path="/login" 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <LoginPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <RegisterPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/actions" 
                  element={
                    <ProtectedRoute>
                      <ActionsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/challenges" 
                  element={
                    <ProtectedRoute>
                      <ChallengesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/community" 
                  element={
                    <ProtectedRoute>
                      <CommunityPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/offset" 
                  element={
                    <ProtectedRoute>
                      <OffsetPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/community/:id" element={<CommunityDetailsPage />} />
              </Routes>
            </Layout>
            <ToastContainer position="top-right" autoClose={5000} />
          </UserActivityProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
