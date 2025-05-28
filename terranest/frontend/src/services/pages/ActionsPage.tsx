import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const mockActions = [
  {
    id: 1,
    title: 'Use public transport',
    description: 'Take the bus, train, or other public transportation instead of driving your car.',
    category: 'transport',
    emissionSaved: 2.5,
    points: 15,
    icon: '🚌',
    frequency: 'daily'
  },
  {
    id: 2,
    title: 'Eat a vegetarian meal',
    description: 'Choose plant-based foods instead of meat for at least one meal.',
    category: 'food',
    emissionSaved: 1.8,
    points: 10,
    icon: '🥗',
    frequency: 'daily'
  },
  {
    id: 3,
    title: 'Reduce water usage',
    description: 'Take shorter showers, turn off the tap while brushing teeth, and fix leaky faucets.',
    category: 'water',
    emissionSaved: 0.7,
    points: 5,
    icon: '💧',
    frequency: 'daily'
  },
  {
    id: 4,
    title: 'Use reusable bags',
    description: 'Bring your own bags when shopping instead of using plastic bags.',
    category: 'waste',
    emissionSaved: 0.5,
    points: 5,
    icon: '🛍️',
    frequency: 'daily'
  },
  {
    id: 5,
    title: 'Turn off lights when not in use',
    description: 'Save energy by turning off lights in rooms that are not being used.',
    category: 'energy',
    emissionSaved: 0.3,
    points: 3,
    icon: '💡',
    frequency: 'daily'
  },
  {
    id: 6,
    title: 'Plant a tree',
    description: 'Plant a tree in your yard or participate in a community tree planting event.',
    category: 'other',
    emissionSaved: 20,
    points: 50,
    icon: '🌳',
    frequency: 'one-time'
  },
  {
    id: 7,
    title: 'Compost food waste',
    description: 'Compost your food scraps instead of throwing them in the trash.',
    category: 'waste',
    emissionSaved: 0.8,
    points: 8,
    icon: '🍎',
    frequency: 'daily'
  },
  {
    id: 8,
    title: 'Bike to work',
    description: 'Use a bicycle for your commute instead of driving.',
    category: 'transport',
    emissionSaved: 3.0,
    points: 20,
    icon: '🚲',
    frequency: 'daily'
  },
  {
    id: 9,
    title: 'Install energy-efficient light bulbs',
    description: 'Replace traditional incandescent bulbs with LED or CFL bulbs.',
    category: 'energy',
    emissionSaved: 15,
    points: 30,
    icon: '💡',
    frequency: 'one-time'
  }
];

const mockCompletedActions = [
  {
    id: 101,
    actionId: 1,
    date: '2023-06-15',
    notes: 'Took the bus to work'
  },
  {
    id: 102,
    actionId: 2,
    date: '2023-06-14',
    notes: 'Had a vegetarian lunch'
  }
];

const ActionsPage: React.FC = () => {
  const { user } = useAuth();
  const [actions, setActions] = useState(mockActions);
  const [completedActions, setCompletedActions] = useState(mockCompletedActions);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggingAction, setIsLoggingAction] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [actionNote, setActionNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredActions = actions.filter(action => {
    const matchesCategory = selectedCategory === 'all' || action.category === selectedCategory;
    const matchesSearch = action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          action.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // In a real app, you would fetch actions from your API
  useEffect(() => {
    // Example:
    // const fetchActions = async () => {
    //   try {
    //     const response = await api.get('/actions');
    //     setActions(response.data);
    //   } catch (error) {
    //     console.error('Error fetching actions:', error);
    //   }
    // };
    // 
    // fetchActions();
  }, []);

  // In a real app, you would fetch user's completed actions from your API
  useEffect(() => {
    // Example:
    // const fetchCompletedActions = async () => {
    //   try {
    //     const response = await api.get('/user/actions');
    //     setCompletedActions(response.data);
    //   } catch (error) {
    //     console.error('Error fetching completed actions:', error);
    //   }
    // };
    // 
    // fetchCompletedActions();
  }, []);

  const handleLogAction = (action: any) => {
    setSelectedAction(action);
    setActionNote('');
    setIsLoggingAction(true);
  };

  const handleSubmitAction = async () => {
    if (!selectedAction) return;
    
    setIsSubmitting(true);
    
    // In a real app, you would submit the action to your API
    try {
      // Example:
      // const response = await api.post('/user/actions', {
      //   actionId: selectedAction.id,
      //   notes: actionNote,
      //   date: new Date().toISOString()
      // });
      
      // Mock the response
      const newCompletedAction = {
        id: Date.now(),
        actionId: selectedAction.id,
        date: new Date().toISOString().split('T')[0],
        notes: actionNote
      };
      
      setCompletedActions([newCompletedAction, ...completedActions]);
      setIsLoggingAction(false);
      setSelectedAction(null);
      setActionNote('');
      
      alert(`Action "${selectedAction.title}" logged successfully!`);
    } catch (error) {
      console.error('Error logging action:', error);
      alert('Failed to log action. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport':
        return 'bg-blue-100 text-blue-800';
      case 'energy':
        return 'bg-yellow-100 text-yellow-800';
      case 'food':
        return 'bg-green-100 text-green-800';
      case 'waste':
        return 'bg-purple-100 text-purple-800';
      case 'water':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Actions
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Complete actions to reduce your carbon footprint and earn points.
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Filter by Category
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="transport">Transport</option>
              <option value="energy">Energy</option>
              <option value="food">Food</option>
              <option value="waste">Waste</option>
              <option value="water">Water</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search Actions
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-primary focus:border-primary block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by title or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredActions.map((action) => (
            <div key={action.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-3xl">
                    {action.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-lg font-medium text-gray-900 truncate">{action.title}</dt>
                      <dd className="mt-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(action.category)}`}>
                          {action.category}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">{action.frequency}</span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{action.emissionSaved} kg CO2</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm font-medium text-primary">+{action.points} points</span>
                  </div>
                  <button
                    onClick={() => handleLogAction(action)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Log Action
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredActions.length === 0 && (
          <div className="mt-6 text-center py-12 bg-white shadow rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No actions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-900">Your Recent Activity</h3>
          {completedActions.length > 0 ? (
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {completedActions.map((completedAction) => {
                  const actionDetails = actions.find(a => a.id === completedAction.actionId);
                  return (
                    <li key={completedAction.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">
                            {actionDetails?.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-primary">{actionDetails?.title}</p>
                            <p className="text-sm text-gray-500">{completedAction.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            +{actionDetails?.points} pts
                          </span>
                          <span className="ml-2 text-sm text-gray-500">{actionDetails?.emissionSaved} kg CO2</span>
                        </div>
                      </div>
                      {completedAction.notes && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 italic">"{completedAction.notes}"</p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
              <p className="text-sm text-gray-500">You haven't logged any actions yet. Start by logging an action above!</p>
            </div>
          )}
        </div>
      </div>

      {/* Log Action Modal */}
      {isLoggingAction && selectedAction && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <div className="text-2xl">{selectedAction.icon}</div>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Log Action: {selectedAction.title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {selectedAction.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center space-x-4">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{selectedAction.emissionSaved} kg CO2</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-primary">+{selectedAction.points} points</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Add notes (optional)
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="e.g., Took the bus to work today"
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
                  onClick={handleSubmitAction}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging...' : 'Log Action'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setIsLoggingAction(false);
                    setSelectedAction(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionsPage;