import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import communityService, { Community as CommunityType, CreateCommunityData } from '../../services/communityService';
import postService, { Post as PostType, CreatePostData } from '../../services/postService';

interface Community {
  id: number;
  name: string;
  description: string;
  category: string;
  members: number;
  postCount: number;
  image: string;
  isJoined: boolean;
  isAdmin: boolean;
  posts: number;
  events: number;
  createdAt: string;
}

interface Post {
  id: string;
  communityId: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string;
    profilePicture: string;
  };
  createdAt: string;
  date: string;
  likes: string[];
  comments: string[];
  image?: string;
  organization?: {
    id: string;
    name: string;
}
}

const mockCommunities = [
  {
    id: 1,
    name: "Green Campus Initiative",
    description: "A community of students and faculty working to make our campus more sustainable.",
    category: "education",
    members: 156,
    postCount: 45, 
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isJoined: true,
    isAdmin: false,
    posts: 5,
    events: 3,
    createdAt: "2023-06-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Urban Gardeners Collective",
    description: "Growing food and community in urban spaces. Share tips, harvests, and gardening wisdom.",
    category: "gardening",
    members: 342,
    postCount: 128,
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isJoined: true,
    isAdmin: true,
    posts: 12,
    events: 4,
    createdAt: "2024-08-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Zero Waste Living",
    description: "Tips and support for reducing waste in everyday life. From beginners to experts.",
    category: "lifestyle",
    members: 892,
    postCount: 256,
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isJoined: false,
    isAdmin: false,
    posts: 8,
    events: 2,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Clean Energy Advocates",
    description: "Promoting renewable energy solutions and policy changes for a sustainable future.",
    category: "energy",
    members: 215,
    postCount: 89,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isJoined: false,
    isAdmin: false,
    posts: 38,
    events: 1,
    createdAt: "2022-10-01T00:00:00Z"
  },
  {
    id: 5,
    name: "Sustainable Transportation",
    description: "Discussing alternatives to car-dependent lifestyles: cycling, public transit, EVs, and more.",
    category: "transport",
    members: 178,
    postCount: 412,
    image: "https://images.unsplash.com/photo-1519583272095-6433daf26b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isJoined: false,
    isAdmin: false,
    posts: 120,
    events: 2,
    createdAt: "2019-12-01T00:00:00Z"
  },
  {
    id: 6,
    name: "Eco-Friendly Parenting",
    description: "Raising environmentally conscious children while minimizing your family's footprint.",
    category: "lifestyle",
    members: 423,
    postCount: 143,
    image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isJoined: false,
    isAdmin: false,
    posts: 43,
    events: 4,
    createdAt: "2025-04-01T00:00:00Z"
  }
];

const mockPosts= [
  {
    id: "1",
    communityId: 1,
    title: "Campus Cleanup Day Results",
    content: "Thanks to everyone who participated in our campus cleanup day! We collected over 200 pounds of trash and recyclables.",
    user: {
      id: "101",
      name: "Jamie Smith",
      profilePicture: "https://randomuser.me/api/portraits/women/65.jpg",
      createdAt: "2023-06-15T14:32:00Z",
      likes: ["102", "103", "104"],
      comments: ["1", "2", "3"],
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      organization: {
      id: "1",
      name: "Green Campus Initiative"
    }
    },
    date: "2023-06-15T14:32:00Z",
    likes: 24,
    comments: 8,
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "2",
    communityId: 2,
    title: "Summer Harvest Share",
    content: "Our community garden is producing more than we can eat! Join us this Saturday for a harvest share. Bring your extra produce to trade!",
    user: {
      id: "102",
      name: "Miguel Rodriguez",
      profilePicture: "https://randomuser.me/api/portraits/men/42.jpg",
      createdAt: "2023-06-15T14:32:00Z",
      likes: ["102", "103", "104"],
      comments: ["1", "2", "3"],
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      organization: {
      id: "2",
      name: "Summer Harvest Share"
    }
    },
    date: "2023-06-14T09:15:00Z",
    likes: 37,
    comments: 12,
    image: "https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "3",
    communityId: 1,
    title: "New Solar Panels Installation",
    content: "The university has approved our proposal for solar panels on the science building! Installation begins next month.",
    user: {
      id: "103",
      name: "Sarah Johnson",
      profilePicture: "https://randomuser.me/api/portraits/women/22.jpg",
      createdAt: "2023-06-15T14:32:00Z",
      likes: ["102", "103", "104"],
      comments: ["1", "2", "3"],
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      organization: {
      id: "3",
      name: "New Solar Panels Installation"
    }
    },
    date: "2023-06-12T16:45:00Z",
    likes: 52,
    comments: 15,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const CommunityPage: React.FC = () => {
  const { user } = useAuth();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [activeTab, setActiveTab] = useState('communities');
  
  const [newCommunityData, setNewCommunityData] = useState<CreateCommunityData>({
    name: '',
    description: '',
    category: 'lifestyle',
    image: ''
  });
  
  const [newPostData, setNewPostData] = useState<CreatePostData>({
    title: '',
    content: '',
    organization: '',
    images: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);
  const [adminCommunities, setAdminCommunities] = useState<Community[]>([]);

  useEffect(() => {
    fetchCommunities();
    if (user) {
      fetchUserCommunities();
    }
  }, [selectedCategory, searchQuery, user]);

  useEffect(() => {
    if (activeTab === 'feed' && user) {
      fetchUserFeed();
    }
  }, [activeTab, user]);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await communityService.getCommunities({
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        search: searchQuery || undefined
      });
      setCommunities(response.communities);
    } catch (error) {
      console.error('Error fetching communities:', error);
      toast.error('Failed to load communities');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCommunities = async () => {
    try {
      const [joinedResponse, adminResponse] = await Promise.all([
        communityService.getUserCommunities('joined'),
        communityService.getUserCommunities('admin')
      ]);
      setJoinedCommunities(joinedResponse.communities);
      setAdminCommunities(adminResponse.communities);
    } catch (error) {
      console.error('Error fetching user communities:', error);
    }
  };

  const fetchUserFeed = async () => {
    try {
      setLoading(true);
      const response = await postService.getUserFeed();
      setPosts(response.posts);
    } catch (error) {
      console.error('Error fetching user feed:', error);
      toast.error('Failed to load feed');
    } finally {
      setLoading(false);
    }
  };

  const filteredCommunities = communities.filter((community) => {
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          community.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJoinCommunity = (community: Community) => {
    setSelectedCommunity(community);
    setShowJoinModal(true);
  };

  const confirmJoinCommunity = async () => {
    if (!selectedCommunity) return;
    
    setIsSubmitting(true);
    
    try {
      await communityService.joinCommunity(String(selectedCommunity.id));
      
      setCommunities(communities.map(community => 
        community.id === selectedCommunity.id 
          ? { ...community, members: (community.members || 0) + 1 } 
          : community
      ));
      
      await fetchUserCommunities();
      
      setShowJoinModal(false);
      setSelectedCommunity(null);
      toast.success(`You've successfully joined "${selectedCommunity.name}"!`);
    } catch (error: any) {
      console.error('Error joining community:', error);
      toast.error(error.response?.data?.message || 'Failed to join community');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLeaveCommunity = async (communityId: number) => {
    if (!window.confirm('Are you sure you want to leave this community?')) return;
    
    try {
      await communityService.leaveCommunity(String(communityId));
      
      setCommunities(communities.map(community => 
        community.id === communityId 
          ? { ...community, members: (community.members || 0) - 1 } 
          : community
      ));
      
      await fetchUserCommunities();
      
      toast.success('You have left the community.');
    } catch (error: any) {
      console.error('Error leaving community:', error);
      toast.error(error.response?.data?.message || 'Failed to leave community');
    }
  };

  const handleCreateCommunity = async (e: React.FormEvent) => {    e.preventDefault();
    
    if (!newCommunityData.name || !newCommunityData.description) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newCommunity = await communityService.createCommunity(newCommunityData);
      
      setCommunities([newCommunity, ...communities]);
      await fetchUserCommunities();
      
      setShowCreateModal(false);
      setNewCommunityData({
        name: '',
        description: '',
        category: 'lifestyle',
        image: ''
      });
      
      toast.success(`Community "${newCommunityData.name}" has been created!`);
    } catch (error: any) {
      console.error('Error creating community:', error);
      toast.error(error.response?.data?.message || 'Failed to create community');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostData.title || !newPostData.content || !newPostData.organization) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newPost = await postService.createPost(newPostData);
      
      if (activeTab === 'feed') {
        setPosts([newPost, ...posts]);
      }
      
      setShowPostModal(false);
      setNewPostData({
        title: '',
        content: '',
        organization: '',
        images: []
      });
      
      toast.success('Your post has been published!');
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

const handleToggleLike = async (postId: string) => { 
  if (!user) {
    toast.error('Please login to like posts');
    return;
  }

  try {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(user.id || '');
        return {
          ...post,
          likes: isLiked
            ? post.likes.filter(id => id !== user.id)
            : [...post.likes, user.id || '']
        };
      }
      return post;
    }));

    // In a real app, you would call your API here
    // await postService.toggleLike(postId);
  } catch (error) {
    console.error('Error toggling like:', error);
    toast.error('Failed to update like');
  }
};

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education':
        return 'bg-blue-100 text-blue-800';
      case 'gardening':
        return 'bg-green-100 text-green-800';
      case 'lifestyle':
        return 'bg-purple-100 text-purple-800';
      case 'energy':
        return 'bg-yellow-100 text-yellow-800';
      case 'transport':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Community
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Connect with like-minded individuals and organizations to share ideas and make a bigger impact.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => setShowPostModal(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Post
            </button>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Community
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('communities')}
              className={`${
                activeTab === 'communities'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              All Communities
            </button>
            <button
              onClick={() => setActiveTab('joined')}
              className={`${
                activeTab === 'joined'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Communities
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`${
                activeTab === 'admin'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Managed by Me
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`${
                activeTab === 'feed'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Community Feed
            </button>
          </nav>
        </div>

        {/* Filters and Search (for communities tabs) */}
        {(activeTab === 'communities' || activeTab === 'joined' || activeTab === 'admin') && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                <option value="education">Education</option>
                <option value="gardening">Gardening</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="energy">Energy</option>
                <option value="transport">Transportation</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-primary focus:border-primary block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search communities"
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
        )}

        {/* Communities Grid */}
        {activeTab === 'communities' && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCommunities.map((community) => {
              const isJoined = joinedCommunities.some(c => c.id === community.id);
              return (
                <div key={community.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="h-48 w-full relative">
                    <img 
                      src={community.image || `https://source.unsplash.com/800x600/?${community.category}`} 
                      alt={community.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-0 right-0 mt-2 mr-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(community.category)}`}>
                        {community.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900">{community.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">{community.description}</p>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      <span>{community.postCount} posts</span>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                      </svg>
                      <span>{community.postCount} posts</span>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      {isJoined ? (
                        <button
                          onClick={() => handleLeaveCommunity(community.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Leave
                        </button>
                      ) : (
                        <button
                          onClick={() => handleJoinCommunity(community)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Join Community
                        </button>
                      )}
                      
                      <Link
                        to={`/community/${community.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-primary hover:text-primary-dark focus:outline-none"
                      >
                        View Details
                        <svg className="ml-1 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* My Communities */}
        {activeTab === 'joined' && (
          <div className="mt-8">
            {joinedCommunities.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {joinedCommunities.filter(c => 
                  selectedCategory === 'all' || c.category === selectedCategory
                ).filter(c => 
                  c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  c.description.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((community) => {
                  const isAdmin = adminCommunities.some(c => c.id === community.id);
                  return (
                    <div key={community.id} className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="h-48 w-full relative">
                        <img 
                          src={community.image || `https://source.unsplash.com/800x600/?${community.category}`} 
                          alt={community.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-0 right-0 mt-2 mr-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(community.category)}`}>
                            {community.category}
                          </span>
                        </div>
                        {isAdmin && (
                          <div className="absolute top-0 left-0 mt-2 ml-2">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary text-white">
                              Admin
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900">{community.name}</h3>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{community.description}</p>
                        
                        <div className="mt-4 flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                          <span>{community.postCount} posts</span>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <button
                            onClick={() => handleLeaveCommunity(community.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            Leave
                          </button>
                          
                          <Link
                            to={`/community/${community.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-primary hover:text-primary-dark focus:outline-none"
                          >
                            View Details
                            <svg className="ml-1 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white shadow rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No communities joined</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't joined any communities yet. Join a community to connect with others.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab('communities')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Browse Communities
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Communities I Manage */}
        {activeTab === 'admin' && (
          <div className="mt-8">
            {adminCommunities.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {adminCommunities.filter(c => 
                  selectedCategory === 'all' || c.category === selectedCategory
                ).filter(c => 
                  c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  c.description.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((community) => (
                  <div key={community.id} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="h-48 w-full relative">
                      <img 
                        src={community.image || `https://source.unsplash.com/800x600/?${community.category}`} 
                        alt={community.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-0 right-0 mt-2 mr-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(community.category)}`}>
                          {community.category}
                        </span>
                      </div>
                      <div className="absolute top-0 left-0 mt-2 ml-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary text-white">
                          Admin
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-medium text-gray-900">{community.name}</h3>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{community.description}</p>
                      
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        <span>{community.postCount} posts</span>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <Link
                          to={`/community/${community.id}/manage`}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Manage
                        </Link>
                        
                        <Link
                          to={`/community/${community.id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-primary hover:text-primary-dark focus:outline-none"
                        >
                          View Details
                          <svg className="ml-1 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white shadow rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No communities managed</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't manage any communities yet. Create a community to get started.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Create Community
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Community Feed */}
        {activeTab === 'feed' && (
          <div className="mt-8">
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => {
                  const community = communities.find(c => c.id.toString() === post.organization?.id);
                  const isLiked = post.likes.includes(user?.id || '');
                  return (
                    <div key={post.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <div className="flex items-center">
                          <img 
                            src={post.user.profilePicture} 
                            alt={post.user.name}
                            className="h-10 w-10 rounded-full"
                          />
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{post.user.name}</span>
                              <span className="mx-1">•</span>
                              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                              <span className="mx-1">•</span>
                              <span>in {post.organization?.name || 'Unknown Community'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <p className="text-sm text-gray-600">{post.content}</p>
        
                        {post.image && (
                          <div className="mt-4">
                            <img 
                              src={post.image} 
                              alt="Post attachment"
                              className="rounded-lg max-h-96 w-auto"
                            />
                          </div>
                        )}
        
        <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={() => handleToggleLike(post.id)}
            className={`flex items-center text-sm ${isLiked ? 'text-primary' : 'text-gray-500'} hover:text-primary`}
          >
            <svg className={`h-5 w-5 mr-1 ${isLiked ? 'text-primary' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            {post.likes.length} Likes
          </button>
          <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <svg className="h-5 w-5 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
            {post.comments.length} Comments
          </button>
          <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <svg className="h-5 w-5 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  );
})}

              </div>
            ) : (
              <div className="text-center py-12 bg-white shadow rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No posts yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are no posts in your communities yet. Be the first to post!
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowPostModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Create Post
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* No results message */}
        {(activeTab === 'communities' && filteredCommunities.length === 0) && (
          <div className="mt-6 text-center py-12 bg-white shadow rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No communities found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
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
      </div>

      {/* Create Community Modal */}
      {showCreateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Create a New Community
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Create a community to connect with others who share your sustainability interests.
                    </p>
                  </div>
                </div>
              </div>
              <form className="mt-5 space-y-4" onSubmit={handleCreateCommunity}>
                <div>
                  <label htmlFor="community-name" className="block text-sm font-medium text-gray-700">
                    Community Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="community-name"
                      id="community-name"
                      required
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., Urban Gardeners Network"
                      value={newCommunityData.name}
                      onChange={(e) => setNewCommunityData({...newCommunityData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="community-description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="community-description"
                      name="community-description"
                      rows={3}
                      required
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What is this community about?"
                      value={newCommunityData.description}
                      onChange={(e) => setNewCommunityData({...newCommunityData, description: e.target.value})}
                    ></textarea>
                  </div>
                </div>
                <div>
                  <label htmlFor="community-category" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <div className="mt-1">
                    <select
                      id="community-category"
                      name="community-category"
                      required
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      value={newCommunityData.category}
                      onChange={(e) => setNewCommunityData({...newCommunityData, category: e.target.value})}
                    >
                      <option value="education">Education</option>
                      <option value="gardening">Gardening</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="energy">Energy</option>
                      <option value="transport">Transportation</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="community-image" className="block text-sm font-medium text-gray-700">
                    Cover Image URL (optional)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="community-image"
                      id="community-image"
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="https://example.com/image.jpg"
                      value={newCommunityData.image}
                      onChange={(e) => setNewCommunityData({...newCommunityData, image: e.target.value})}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Leave blank to use a default image based on your category.
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Community'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => {
                      setShowCreateModal(false);
                      setNewCommunityData({
                        name: '',
                        description: '',
                        category: 'lifestyle',
                        image: ''
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {showPostModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Create a New Post
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Share your thoughts, questions, or achievements with your community.
                    </p>
                  </div>
                </div>
              </div>
              <form className="mt-5 space-y-4" onSubmit={handleCreatePost}>
                <div>
                  <label htmlFor="post-community" className="block text-sm font-medium text-gray-700">
                    Community *
                  </label>
                  <div className="mt-1">
                    <select
                      id="post-community"
                      name="post-community"
                      required
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      value={newPostData.organization}
                      onChange={(e) => setNewPostData({...newPostData, organization: e.target.value})}
                    >
                      <option value="">Select a community</option>
                      {joinedCommunities.map(community => (
                        <option key={community.id} value={community.id}>{community.name}</option>
                      ))}
                    </select>
                  </div>
                  {joinedCommunities.length === 0 && (
                    <p className="mt-1 text-xs text-red-500">
                      You need to join a community before you can post.
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="post-title" className="block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="post-title"
                      id="post-title"
                      required
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Give your post a title"
                      value={newPostData.title}
                      onChange={(e) => setNewPostData({...newPostData, title: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="post-content" className="block text-sm font-medium text-gray-700">
                    Content *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="post-content"
                      name="post-content"
                      rows={4}
                      required
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What would you like to share?"
                      value={newPostData.content}
                      onChange={(e) => setNewPostData({...newPostData, content: e.target.value})}
                    ></textarea>
                  </div>
                </div>
                <div>
                  <label htmlFor="post-image" className="block text-sm font-medium text-gray-700">
                    Image URL (optional)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="post-image"
                      id="post-image"
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="https://example.com/image.jpg"
                      value={newPostData.images?.[0] || ''}
                      onChange={(e) => setNewPostData({...newPostData, images: e.target.value ? [e.target.value] : []})}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
                    disabled={isSubmitting || joinedCommunities.length === 0}
                  >
                    {isSubmitting ? 'Posting...' : 'Post'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => {
                      setShowPostModal(false);
                      setNewPostData({
                        title: '',
                        content: '',
                        organization: '',
                        images: []
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Join Community Modal */}
      {showJoinModal && selectedCommunity && (
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
                    Join {selectedCommunity.name}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to join this community? You'll be able to see all posts and participate in discussions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
                  onClick={confirmJoinCommunity}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Joining...' : 'Join Community'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setShowJoinModal(false);
                    setSelectedCommunity(null);
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

export default CommunityPage;