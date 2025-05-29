import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useContext(AuthContext)!;

  useEffect(() => {
    console.log('AuthCallbackPage mounted');
    console.log('Search params:', Object.fromEntries(searchParams));
    
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    const error = searchParams.get('message');

    console.log('Token:', token ? 'Present' : 'Missing');
    console.log('User param:', userParam ? 'Present' : 'Missing');
    console.log('Error:', error);

    if (error) {
      console.error('Authentication error:', error);
      navigate('/login?error=' + encodeURIComponent(error));
      return;
    }

    if (token && userParam) {
      try {
        console.log('Processing OAuth callback...');
        
        // Store token
        localStorage.setItem('token', token);
        console.log('Token stored in localStorage');
        
        // Parse and set user data
        const userData = JSON.parse(decodeURIComponent(userParam));
        console.log('Parsed user data:', userData);
        
        setUser({
          ...userData,
          id: userData._id || userData.id,
        });
        
        console.log('User set in context, redirecting to dashboard');
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
        navigate('/login?error=' + encodeURIComponent('Authentication failed'));
      }
    } else {
      console.error('Missing token or user data');
      navigate('/login?error=' + encodeURIComponent('Authentication failed'));
    }
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Completing sign in...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please wait while we complete your authentication.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AuthCallbackPage;