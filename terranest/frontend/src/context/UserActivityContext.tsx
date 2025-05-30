import React, { createContext, useContext, useState, useEffect } from 'react';

interface Action {
  id: number;
  title: string;
  date: string;
  points: number;
  emissionSaved: number;
}

interface Challenge {
  id: number;
  title: string;
  progress: number;
  endDate: string;
}

interface CommunityUpdate {
  id: number;
  user: string;
  action: string;
  time: string;
}

interface UserStats {
  totalEmissionSaved: number;
  actionsCompleted: number;
  challengesJoined: number;
  treesPlanted: number;
}

interface UserActivityContextType {
  actions: Action[];
  challenges: Challenge[];
  communityUpdates: CommunityUpdate[];
  stats: UserStats;
  addAction: (action: Omit<Action, 'id'>) => void;
  addChallenge: (challenge: Omit<Challenge, 'id'>) => void;
  addCommunityUpdate: (update: Omit<CommunityUpdate, 'id'>) => void;
  updateChallengeProgress: (challengeId: number, progress: number) => void;
}

const UserActivityContext = createContext<UserActivityContextType | undefined>(undefined);

const initialActions: Action[] = [
  {
    id: 1,
    title: 'Used public transport',
    date: '2024-03-15',
    points: 15,
    emissionSaved: 2.5
  },
  {
    id: 2,
    title: 'Ate vegetarian meal',
    date: '2024-03-14',
    points: 10,
    emissionSaved: 1.8
  },
  {
    id: 3,
    title: 'Reduced water usage',
    date: '2024-03-13',
    points: 5,
    emissionSaved: 0.7
  },
  {
    id: 4,
    title: 'Used reusable bags',
    date: '2024-03-12',
    points: 5,
    emissionSaved: 0.5
  },
  {
    id: 5,
    title: 'Turned off unused lights',
    date: '2024-03-11',
    points: 3,
    emissionSaved: 0.3
  }
];

const initialChallenges: Challenge[] = [
  {
    id: 1,
    title: 'Zero Waste Week',
    progress: 60,
    endDate: '2024-03-30'
  },
  {
    id: 2,
    title: 'Bike to Work',
    progress: 40,
    endDate: '2024-04-15'
  },
  {
    id: 3,
    title: 'Plant-Based Month',
    progress: 25,
    endDate: '2024-04-30'
  }
];

const initialCommunityUpdates: CommunityUpdate[] = [
  {
    id: 1,
    user: 'Sarah Johnson',
    action: 'joined the "Zero Waste Week" challenge',
    time: '2 hours ago'
  },
  {
    id: 2,
    user: 'Mike Chen',
    action: 'completed the "Bike to Work" action',
    time: '3 hours ago'
  },
  {
    id: 3,
    user: 'Emma Wilson',
    action: 'created a new community "Green Tech Innovators"',
    time: '5 hours ago'
  },
  {
    id: 4,
    user: 'David Brown',
    action: 'reached 100 points milestone',
    time: '1 day ago'
  },
  {
    id: 5,
    user: 'Lisa Martinez',
    action: 'planted 5 trees through the app',
    time: '2 days ago'
  }
];

const initialStats: UserStats = {
  totalEmissionSaved: 5.8,
  actionsCompleted: 5,
  challengesJoined: 5,
  treesPlanted: 5
};

export const UserActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [actions, setActions] = useState<Action[]>(initialActions);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [communityUpdates, setCommunityUpdates] = useState<CommunityUpdate[]>(initialCommunityUpdates);
  const [stats, setStats] = useState<UserStats>(initialStats);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedActions = localStorage.getItem('userActions');
    const savedChallenges = localStorage.getItem('userChallenges');
    const savedCommunityUpdates = localStorage.getItem('communityUpdates');
    const savedStats = localStorage.getItem('userStats');

    if (savedActions) setActions(JSON.parse(savedActions));
    if (savedChallenges) setChallenges(JSON.parse(savedChallenges));
    if (savedCommunityUpdates) setCommunityUpdates(JSON.parse(savedCommunityUpdates));
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userActions', JSON.stringify(actions));
    localStorage.setItem('userChallenges', JSON.stringify(challenges));
    localStorage.setItem('communityUpdates', JSON.stringify(communityUpdates));
    localStorage.setItem('userStats', JSON.stringify(stats));
  }, [actions, challenges, communityUpdates, stats]);

  const addAction = (action: Omit<Action, 'id'>) => {
    const newAction = {
      ...action,
      id: Date.now()
    };
    setActions(prev => [newAction, ...prev]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalEmissionSaved: prev.totalEmissionSaved + action.emissionSaved,
      actionsCompleted: prev.actionsCompleted + 1
    }));
  };

  const addChallenge = (challenge: Omit<Challenge, 'id'>) => {
    const newChallenge = {
      ...challenge,
      id: Date.now()
    };
    setChallenges(prev => [...prev, newChallenge]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      challengesJoined: prev.challengesJoined + 1
    }));
  };

  const addCommunityUpdate = (update: Omit<CommunityUpdate, 'id'>) => {
    const newUpdate = {
      ...update,
      id: Date.now()
    };
    setCommunityUpdates(prev => [newUpdate, ...prev]);
  };

  const updateChallengeProgress = (challengeId: number, progress: number) => {
    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, progress }
          : challenge
      )
    );
  };

  return (
    <UserActivityContext.Provider
      value={{
        actions,
        challenges,
        communityUpdates,
        stats,
        addAction,
        addChallenge,
        addCommunityUpdate,
        updateChallengeProgress
      }}
    >
      {children}
    </UserActivityContext.Provider>
  );
};

export const useUserActivity = () => {
  const context = useContext(UserActivityContext);
  if (context === undefined) {
    throw new Error('useUserActivity must be used within a UserActivityProvider');
  }
  return context;
}; 