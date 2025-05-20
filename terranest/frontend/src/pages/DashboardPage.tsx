import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LeafIcon, ChartLineIcon, UsersIcon, TreeIcon } from '../components/ui/Icons';
import AuthContext from '../context/AuthContext';

// Mock data for the dashboard
const mockStats = {
  totalEmissionSaved: 1250,
  actionsCompleted: 48,
  challengesJoined: 5,
  treesPlanted: 12
};

const mockRecentActions = [
  { id: 1, title: 'Used public transport', date: '2023-06-15', points: 15, emissionSaved: 2.5 },
  { id: 2, title: 'Vegetarian meal', date: '2023-06-14', points: 10, emissionSaved: 1.8 },
  { id: 3, title: 'Reduced water usage', date: '2023-06-13', points: 5, emissionSaved: 0.7 },
  { id: 4, title: 'Used reusable bag', date: '2023-06-12', points: 5, emissionSaved: 0.5 }
];

const mockActiveChallenges = [
  { id: 1, title: 'Zero Waste Week', progress: 60, endDate: '2023-06-30' },
  { id: 2, title: 'Bike to Work', progress: 40, endDate: '2023-07-15' }
];

const mockCommunityUpdates = [
  { id: 1, user: 'Sarah J.', action: 'completed the "Plant a Tree" challenge', time: '2 hours ago' },
  { id: 2, user: 'Mike T.', action: 'saved 5kg of CO2 by cycling to work', time: '5 hours ago' },
  { id: 3, user: 'Emma R.', action: 'joined the "Plastic Free July" challenge', time: '1 day ago' }
];

const DashboardPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(mockStats);
  const [recentActions, setRecentActions] = useState(mockRecentActions);
  const [activeChallenges, setActiveChallenges] = useState(mockActiveChallenges);
  const [communityUpdates, setCommunityUpdates] = useState(mockCommunityUpdates);

  // In a real app, you would fetch this data from your API
  useEffect(() => {
    // Fetch user stats, recent actions, active challenges, and community updates
    // Example:
    // const fetchDashboardData = async () => {
    //   try {
    //     const statsResponse = await api.get('/user/stats');
    //     setStats(statsResponse.data);
    //     
    //     const actionsResponse = await api.get('/user/actions/recent');
    //     setRecentActions(actionsResponse.data);
    //     
    //     const challengesResponse = await api.get('/user/challenges/active');
    //     setActiveChallenges(challengesResponse.data);
    //     
    //     const updatesResponse = await api.get('/community/updates');
    //     setCommunityUpdates(updatesResponse.data);
    //   } catch (error) {
    //     console.error('Error fetching dashboard data:', error);
    //   }
    // };
    // 
    // fetchDashboardData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Welcome back, {user?.name || 'User'}!
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              to="/actions"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Log an Action
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartLineIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">CO2 Saved</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.totalEmissionSaved} kg</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <LeafIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Actions Completed</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.actionsCompleted}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UsersIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Challenges Joined</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.challengesJoined}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TreeIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Trees Planted</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stats.treesPlanted}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Actions */}
          <div className="bg-white shadow rounded-lg lg:col-span-1">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Actions</h3>
              <Link to="/actions" className="text-sm font-medium text-primary hover:text-primary-dark">
                View all
              </Link>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {recentActions.map((action) => (
                  <li key={action.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-primary truncate">{action.title}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          +{action.points} pts
                        </p>
                       </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {action.date}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {action.emissionSaved} kg CO2 saved
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Active Challenges */}
          <div className="bg-white shadow rounded-lg lg:col-span-1">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Active Challenges</h3>
              <Link to="/challenges" className="text-sm font-medium text-primary hover:text-primary-dark">
                View all
              </Link>
            </div>
            <div className="border-t border-gray-200">
              {activeChallenges.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {activeChallenges.map((challenge) => (
                    <li key={challenge.id} className="px-4 py-4 sm:px-6">
                      <div>
                        <p className="text-sm font-medium text-primary">{challenge.title}</p>
                        <p className="text-sm text-gray-500 mt-1">Ends on {challenge.endDate}</p>
                      </div>
                      <div className="mt-2">
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block text-primary">
                                {challenge.progress}% Complete
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-light">
                            <div 
                              style={{ width: `${challenge.progress}%` }} 
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-5 sm:px-6 text-center">
                  <p className="text-sm text-gray-500">You haven't joined any challenges yet.</p>
                  <Link 
                    to="/challenges" 
                    className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
                  >
                    Find Challenges
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Community Updates */}
          <div className="bg-white shadow rounded-lg lg:col-span-1">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Community Updates</h3>
              <Link to="/community" className="text-sm font-medium text-primary hover:text-primary-dark">
                View all
              </Link>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {communityUpdates.map((update) => (
                  <li key={update.id} className="px-4 py-4 sm:px-6">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium">
                          {update.user.charAt(0)}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-800">
                          <span className="font-medium text-gray-900">{update.user}</span> {update.action}
                        </p>
                        <p className="text-sm text-gray-500">{update.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Suggested Actions */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Suggested Actions</h3>
            <Link to="/actions" className="text-sm font-medium text-primary hover:text-primary-dark">
              View all actions
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-900">Use public transport</dt>
                      <dd className="mt-1 text-sm text-gray-500">Save 2.5kg CO2 per trip</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                    Log Action
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-900">Eat a vegetarian meal</dt>
                      <dd className="mt-1 text-sm text-gray-500">Save 1.8kg CO2 per meal</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                    Log Action
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-900">Reduce energy usage</dt>
                      <dd className="mt-1 text-sm text-gray-500">Save 0.7kg CO2 per day</dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                    Log Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

