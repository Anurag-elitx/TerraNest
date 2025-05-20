import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ActionsPage from './pages/ActionsPage'
import { ChallengesPage } from './pages/ChallengesPage'
import CommunityPage from './pages/CommunityPage'
import OffsetPage from './pages/OffsetPage'
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
const Dashboard = () => <div className="p-8">Dashboard Page</div>;
const Actions = () => <div className="p-8">Actions Page</div>;
const Challenges = () => <div className="p-8">Challenges Page</div>;
const Community = () => <div className="p-8">Community Page</div>;
const Offset = () => <div className="p-8">Offset Page</div>;
const Login = () => <div className="p-8">Login Page</div>;
const Register = () => <div className="p-8">Register Page</div>;
const Profile = () => <div className="p-8">Profile Page</div>;
const Settings = () => <div className="p-8">Settings Page</div>;

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/actions" element={<ActionsPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/offset" element={<OffsetPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </Layout>
        <ToastContainer position="top-right" autoClose={5000} />
      </AuthProvider>
    </Router>
  );
}

export default App;
