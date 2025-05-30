import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LeafIcon, ChartLineIcon, UsersIcon, TreeIcon } from '../../components/ui/Icons';
import { useAuth } from '../../context/AuthContext';
import { useUserActivity } from '../../context/UserActivityContext';
import { toast } from 'react-toastify';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { stats, actions, challenges, communityUpdates, addAction, addCommunityUpdate } = useUserActivity();
  const [editingAction, setEditingAction] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPoints, setEditedPoints] = useState(0);
  const [editedEmission, setEditedEmission] = useState(0);
  const [hiddenActions, setHiddenActions] = useState<number[]>([]);
  const [hiddenChallenges, setHiddenChallenges] = useState<number[]>([]);
  const [hiddenUpdates, setHiddenUpdates] = useState<number[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  // Update total points whenever actions change
  useEffect(() => {
    const visibleActions = actions.filter(action => !hiddenActions.includes(action.id));
    const newTotal = visibleActions.reduce((sum, action) => sum + action.points, 0);
    setTotalPoints(newTotal);
  }, [actions, hiddenActions]);

  const handleEditAction = (action: any) => {
    setEditingAction(action.id);
    setEditedTitle(action.title);
    setEditedPoints(action.points);
    setEditedEmission(action.emissionSaved);
  };

  const handleSaveEdit = (actionId: number) => {
    // Update the action in the context
    const updatedActions = actions.map(action => 
      action.id === actionId 
        ? { ...action, title: editedTitle, points: editedPoints, emissionSaved: editedEmission }
        : action
    );
    
    // Update localStorage
    localStorage.setItem('userActions', JSON.stringify(updatedActions));
    
    // Update stats
    const totalEmissionSaved = updatedActions.reduce((sum, action) => sum + action.emissionSaved, 0);
    const stats = JSON.parse(localStorage.getItem('userStats') || '{}');
    stats.totalEmissionSaved = totalEmissionSaved;
    localStorage.setItem('userStats', JSON.stringify(stats));
    
    setEditingAction(null);
    toast.success('Action updated successfully!');
  };

  const handleDeleteAction = (actionId: number) => {
    setHiddenActions(prev => [...prev, actionId]);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
              Welcome back, {user?.name || 'User'}!
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              to="/actions"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
            >
              Log an Action
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Points</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {totalPoints} pts
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartLineIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">CO2 Saved</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.totalEmissionSaved} kg</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <LeafIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Actions Completed</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.actionsCompleted}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UsersIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Challenges Joined</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.challengesJoined}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TreeIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Trees Planted</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">{stats.treesPlanted}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Actions */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg lg:col-span-1 transition-colors duration-200">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Actions</h3>
              <div className="flex space-x-4">
                <Link to="/actions" className="text-sm font-medium text-primary hover:text-primary-dark">
                  View all
                </Link>
                <Link 
                  to="/actions" 
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
                >
                  Find Actions
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {actions
                  .filter(action => !hiddenActions.includes(action.id))
                  .slice(0, 5)
                  .map((action) => (
                  <li key={action.id} className="px-4 py-4 sm:px-6">
                    {editingAction === action.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white sm:text-sm"
                          placeholder="Action title"
                        />
                        <div className="flex space-x-2">
                          <input
                            type="number"
                            value={editedPoints}
                            onChange={(e) => setEditedPoints(Number(e.target.value))}
                            className="block w-1/2 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white sm:text-sm"
                            placeholder="Points"
                          />
                          <input
                            type="number"
                            value={editedEmission}
                            onChange={(e) => setEditedEmission(Number(e.target.value))}
                            className="block w-1/2 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:text-white sm:text-sm"
                            placeholder="CO2 saved"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleSaveEdit(action.id)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingAction(null)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-primary truncate">{action.title}</p>
                          <div className="ml-2 flex-shrink-0 flex items-center space-x-2">
                            <button
                              onClick={() => handleEditAction(action)}
                              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteAction(action.id)}
                              className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                              +{action.points} pts
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              {action.date}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {action.emissionSaved} kg CO2 saved
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                ))}
                {actions.length === 0 && (
                  <div className="px-4 py-5 sm:px-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">You haven't logged any actions yet.</p>
                    <Link 
                      to="/actions" 
                      className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
                    >
                      Find Actions
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </div>

          {/* Active Challenges */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg lg:col-span-1 transition-colors duration-200">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Active Challenges</h3>
              <div className="flex space-x-4">
                <Link to="/challenges" className="text-sm font-medium text-primary hover:text-primary-dark">
                  View all
                </Link>
                <Link 
                  to="/challenges" 
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
                >
                  Find Challenges
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              {challenges.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {challenges.map((challenge) => (
                    <li key={challenge.id} className="px-4 py-4 sm:px-6">
                      <div>
                        <p className="text-sm font-medium text-primary">{challenge.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ends on {challenge.endDate}</p>
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
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-light dark:bg-gray-700">
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">You haven't joined any challenges yet.</p>
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
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg lg:col-span-1 transition-colors duration-200">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Community Updates</h3>
              <div className="flex space-x-4">
                <Link to="/community" className="text-sm font-medium text-primary hover:text-primary-dark">
                  View all
                </Link>
                <Link 
                  to="/community" 
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
                >
                  Find Communities
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {communityUpdates.slice(0, 5).map((update) => (
                  <li key={update.id} className="px-4 py-4 sm:px-6">
                    <div className="flex space-x-3">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{update.user}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{update.time}</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{update.action}</p>
                      </div>
                    </div>
                  </li>
                ))}
                {communityUpdates.length === 0 && (
                  <div className="px-4 py-5 sm:px-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No community updates yet.</p>
                    <Link 
                      to="/community" 
                      className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
                    >
                      Find Communities
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Suggested Actions Section */}
        <div className="mt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                Suggested Actions
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Actions we think you might like based on your activity
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Suggested Action 1 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-3xl">
                    🌱
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-lg font-medium text-gray-900 dark:text-white truncate">Start a Home Garden</dt>
                      <dd className="mt-1">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          Beginner
                        </span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Grow your own vegetables and herbs to reduce food miles and packaging waste.</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">2.5 kg CO2</span>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                    <span className="text-sm font-medium text-primary dark:text-primary-light">+25 points</span>
                  </div>
                  <Link
                    to="/actions"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
                  >
                    Try This
                  </Link>
                </div>
              </div>
            </div>

            {/* Suggested Action 2 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-3xl">
                    🚲
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-lg font-medium text-gray-900 dark:text-white truncate">Bike to Work Week</dt>
                      <dd className="mt-1">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                          Intermediate
                        </span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Commit to cycling to work for a week to reduce your carbon footprint.</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">15 kg CO2</span>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                    <span className="text-sm font-medium text-primary dark:text-primary-light">+50 points</span>
                  </div>
                  <Link
                    to="/actions"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
                  >
                    Try This
                  </Link>
                </div>
              </div>
            </div>

            {/* Suggested Action 3 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-3xl">
                    💡
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-lg font-medium text-gray-900 dark:text-white truncate">Energy Audit</dt>
                      <dd className="mt-1">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          Advanced
                        </span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Conduct a home energy audit and implement efficiency improvements.</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">8 kg CO2</span>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                    <span className="text-sm font-medium text-primary dark:text-primary-light">+35 points</span>
                  </div>
                  <Link
                    to="/actions"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
                  >
                    Try This
                  </Link>
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

