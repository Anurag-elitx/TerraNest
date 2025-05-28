import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    challenges: true,
    achievements: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    actionsVisible: true,
    challengesVisible: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      // API call to save settings
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // API call to delete account
        logout();
        toast.success('Account deleted successfully');
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Settings
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your account settings and preferences.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {/* Notifications */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Notifications
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Choose what notifications you want to receive.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      notifications.email ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                    onClick={() => handleNotificationChange('email', !notifications.email)}
                  >
                    <span
                      className={`${
                        notifications.email ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                    <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      notifications.push ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                    onClick={() => handleNotificationChange('push', !notifications.push)}
                  >
                    <span
                      className={`${
                        notifications.push ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Challenge Updates</h4>
                    <p className="text-sm text-gray-500">Get notified about new challenges and updates</p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      notifications.challenges ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                    onClick={() => handleNotificationChange('challenges', !notifications.challenges)}
                  >
                    <span
                      className={`${
                        notifications.challenges ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Achievement Notifications</h4>
                    <p className="text-sm text-gray-500">Get notified when you earn badges or reach milestones</p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      notifications.achievements ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                    onClick={() => handleNotificationChange('achievements', !notifications.achievements)}
                  >
                    <span
                      className={`${
                        notifications.achievements ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Privacy
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Control what information is visible to other users.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Profile Visibility</h4>
                    <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      privacy.profileVisible ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                    onClick={() => handlePrivacyChange('profileVisible', !privacy.profileVisible)}
                  >
                    <span
                      className={`${
                        privacy.profileVisible ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Actions Visibility</h4>
                    <p className="text-sm text-gray-500">Show your completed actions to others</p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      privacy.actionsVisible ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                    onClick={() => handlePrivacyChange('actionsVisible', !privacy.actionsVisible)}
                  >
                    <span
                      className={`${
                        privacy.actionsVisible ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Challenge Participation</h4>
                    <p className="text-sm text-gray-500">Show your challenge participation to others</p>
                  </div>
                  <button
                    type="button"
                    className={`${
                      privacy.challengesVisible ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                    onClick={() => handlePrivacyChange('challengesVisible', !privacy.challengesVisible)}
                  >
                    <span
                      className={`${
                        privacy.challengesVisible ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Account Actions
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage your account and data.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Export Data</h4>
                    <p className="text-sm text-gray-500">Download a copy of your data</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Export
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                    <p className="text-sm text-gray-500">Update your account password</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Change
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-red-900">Delete Account</h4>
                    <p className="text-sm text-red-500">Permanently delete your account and all data</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveSettings}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
