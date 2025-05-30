import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface CommunityMember {
  id: number;
  name: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
  profilePicture: string;
  contributions: number;
}

interface CommunityEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  image: string;
}

interface CommunityPost {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    profilePicture: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  image?: string;
}

const mockMembers: CommunityMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "admin",
    joinedAt: "2023-01-15",
    profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
    contributions: 156
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "moderator",
    joinedAt: "2023-02-20",
    profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
    contributions: 89
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "member",
    joinedAt: "2023-03-10",
    profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
    contributions: 45
  },
  {
    id: 4,
    name: "David Brown",
    role: "member",
    joinedAt: "2023-04-05",
    profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
    contributions: 32
  }
];

const mockEvents: CommunityEvent[] = [
  {
    id: 1,
    title: "Community Meetup",
    description: "Join us for our monthly community meetup where we'll discuss upcoming initiatives and share ideas.",
    date: "2024-04-15T18:00:00Z",
    location: "Community Center, Room 101",
    attendees: 45,
    maxAttendees: 50,
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "Workshop: Sustainable Living",
    description: "Learn practical tips for reducing your environmental footprint in this hands-on workshop.",
    date: "2024-04-20T14:00:00Z",
    location: "Green Space, Main Hall",
    attendees: 28,
    maxAttendees: 30,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const mockPosts: CommunityPost[] = [
  {
    id: 1,
    title: "Welcome to our community!",
    content: "We're excited to have you join us in our mission to create a more sustainable future. Let's work together to make a difference!",
    author: {
      id: 1,
      name: "Sarah Johnson",
      profilePicture: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    createdAt: "2024-03-01T10:00:00Z",
    likes: 45,
    comments: 12,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "Upcoming Community Projects",
    content: "Here's what we're planning for the next quarter. We'd love to hear your thoughts and suggestions!",
    author: {
      id: 2,
      name: "Michael Chen",
      profilePicture: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    createdAt: "2024-03-05T15:30:00Z",
    likes: 32,
    comments: 8
  }
];

const CommunityDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isJoined, setIsJoined] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock community data
  const community = {
    id: Number(id),
    name: "Green Campus Initiative",
    description: "A community of students and faculty working to make our campus more sustainable. We focus on implementing eco-friendly practices, organizing awareness campaigns, and creating a greener environment for everyone.",
    category: "education",
    members: 156,
    postCount: 45,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isJoined: false,
    isAdmin: false,
    posts: 5,
    events: 3,
    createdAt: "2023-06-01T00:00:00Z",
    stats: {
      totalActions: 234,
      carbonSaved: 1234,
      eventsHosted: 12,
      activeMembers: 89
    }
  };

  const handleJoinCommunity = () => {
    setShowJoinModal(true);
  };

  const confirmJoinCommunity = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsJoined(true);
      setShowJoinModal(false);
      toast.success(`You've successfully joined "${community.name}"!`);
    } catch (error) {
      toast.error('Failed to join community');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{community.name}</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">{community.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-primary dark:text-primary-light">{community.stats.totalActions}</div>
            <div className="text-gray-600 dark:text-gray-400">Total Actions</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-primary dark:text-primary-light">{community.stats.carbonSaved} kg</div>
            <div className="text-gray-600 dark:text-gray-400">Carbon Saved</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-primary dark:text-primary-light">{community.stats.eventsHosted}</div>
            <div className="text-gray-600 dark:text-gray-400">Events Hosted</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-primary dark:text-primary-light">{community.stats.activeMembers}</div>
            <div className="text-gray-600 dark:text-gray-400">Active Members</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'members', 'events', 'posts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-primary text-primary dark:text-primary-light'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About {community.name}</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300">
                  {community.description}
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We are dedicated to creating a sustainable campus environment through education, action, and community engagement. Our goal is to inspire and empower students and faculty to make environmentally conscious decisions in their daily lives.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">What We Do</h3>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                  <li>Organize campus-wide sustainability initiatives</li>
                  <li>Host educational workshops and events</li>
                  <li>Implement recycling and waste reduction programs</li>
                  <li>Advocate for sustainable policies on campus</li>
                  <li>Connect students with environmental opportunities</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Community Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockMembers.map((member) => (
                  <div key={member.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center">
                    <img
                      src={member.profilePicture}
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{member.role}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {member.contributions} contributions
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockEvents.map((event) => (
                  <div key={event.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{event.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {event.attendees}/{event.maxAttendees} attendees
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Posts</h2>
              <div className="space-y-6">
                {mockPosts.map((post) => (
                  <div key={post.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={post.author.profilePicture}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{post.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Posted by {post.author.name} on {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="rounded-lg max-h-96 w-auto mb-4"
                      />
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Join Button */}
        {!isJoined && (
          <div className="mt-8 text-center">
            <button
              onClick={handleJoinCommunity}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
            >
              Join Community
            </button>
          </div>
        )}
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                    Join {community.name}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to join this community? You'll be able to see all posts and participate in discussions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 sm:col-start-2 sm:text-sm"
                  onClick={confirmJoinCommunity}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Joining...' : 'Join Community'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowJoinModal(false)}
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

export default CommunityDetailsPage; 