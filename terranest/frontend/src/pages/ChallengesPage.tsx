import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  startDate: string;
  endDate: string;
  points: number;
  level: string;
  scope: string;
  participants: Array<{ id: string; name: string }>;
  completedBy: number;
  actions: Array<{ id: number; title: string; count: number }>;
  isJoined: boolean;
  progress: number;
  location?: string;
}

const mockChallenges: Challenge[] = [
  {
    id: 1,
    title: 'Zero Waste Week',
    description: 'Reduce your waste production by avoiding single-use items and properly recycling for one week.',
    category: 'waste',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    startDate: '2023-06-01',
    endDate: '2023-06-30',
    points: 100,
    level: 'beginner',
    scope: 'global',
    participants: [],
    completedBy: 78,
    actions: [
      { id: 4, title: 'Use reusable bags', count: 5 },
      { id: 7, title: 'Compost food waste', count: 7 }
    ],
    isJoined: true,
    progress: 60
  },
{
    id: 2,
    title: 'Bike to Work',
    description: 'Replace your car commute with biking for two weeks to reduce emissions and improve your health.',
    category: 'transport',
    image: 'https://images.unsplash.com/photo-1519583272095-6433daf26b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    startDate: '2023-06-15',
    endDate: '2023-07-15',
    points: 150,
    level: 'intermediate',
    scope: 'global',
    participants: [{ id: '1', name: 'John Doe' }],
    completedBy: 82,
    actions: [
      { id: 8, title: 'Bike to work', count: 10 }
    ],
    isJoined: true,
    progress: 40
  },
  {
    id: 3,
    title: 'Plant-Based Month',
    description: 'Adopt a plant-based diet for a month to reduce your carbon footprint from food consumption.',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    startDate: '2023-07-01',
    endDate: '2023-07-31',
    points: 200,
    level: 'advanced',
    scope: 'global',
    participants: [],
    completedBy: 93,
    actions: [
      { id: 2, title: 'Eat a vegetarian meal', count: 30 }
    ],
    isJoined: false,
    progress: 0
  }
];

export const ChallengesPage: React.FC = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  const isUserJoined = (challenge: Challenge) => {
    return user && challenge.participants.some(p => p.id === user.id);
  };

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || challenge.level === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || 
                          (selectedStatus === 'joined' && challenge.isJoined) ||
                          (selectedStatus === 'not-joined' && !challenge.isJoined);
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesStatus && matchesSearch;
  });

  const handleJoinChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowJoinModal(true);
  };

  const confirmJoinChallenge = async () => {
    if (!selectedChallenge || !user) return;
    
    setIsJoining(true);
    
    try {
      setTimeout(() => {
        setChallenges(challenges.map(challenge => 
          challenge.id === selectedChallenge.id 
            ? { 
                ...challenge, 
                isJoined: true, 
                participants: [...challenge.participants, { id: user.id, name: user.name }]
              } 
            : challenge
        ));
        
        setShowJoinModal(false);
        setSelectedChallenge(null);
        setIsJoining(false);
        
        alert(`You've successfully joined the "${selectedChallenge.title}" challenge!`);
      }, 1000);
    } catch (error) {
      console.error('Error joining challenge:', error);
      alert('Failed to join challenge. Please try again.');
      setIsJoining(false);
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

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
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
              Challenges
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Join challenges to make a bigger impact and earn rewards.
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
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
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
              Difficulty Level
            </label>
            <select
              id="level"
              name="level"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Challenges</option>
              <option value="joined">Joined</option>
              <option value="not-joined">Not Joined</option>
            </select>
          </div>
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-primary focus:border-primary block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search challenges"
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

        {/* Challenges Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="h-48 w-full relative">
                <img 
                  src={challenge.image} 
                  alt={challenge.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(challenge.category)}`}>
                    {challenge.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelBadge(challenge.level)}`}>
                    {challenge.level}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{challenge.description}</p>
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}</span>
                </div>
                
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span>{challenge.participants.length} participants</span>
                </div>
                
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{challenge.completedBy} completed</span>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-primary">+{challenge.points} points</span>
                  </div>
                  
                  {challenge.isJoined ? (
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500 mb-1">{challenge.progress}% complete</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleJoinChallenge(challenge)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Join Challenge
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredChallenges.length === 0 && (
          <div className="mt-6 text-center py-12 bg-white shadow rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No challenges found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSelectedStatus('all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Join Challenge Modal */}
      {showJoinModal && selectedChallenge && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Join {selectedChallenge.title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to join this challenge? You'll be able to track your progress and compete with others.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
                  onClick={confirmJoinChallenge}
                  disabled={isJoining}
                >
                  {isJoining ? 'Joining...' : 'Join Challenge'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setShowJoinModal(false);
                    setSelectedChallenge(null);
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

export default ChallengesPage;

