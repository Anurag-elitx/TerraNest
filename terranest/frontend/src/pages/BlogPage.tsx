import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock blog posts data
const mockPosts = [
  {
    id: 1,
    title: "10 Simple Ways to Reduce Your Carbon Footprint Today",
    excerpt: "Small changes in your daily routine can add up to significant reductions in your environmental impact. Here are ten easy steps you can take starting today.",
    category: "Tips & Tricks",
    author: {
      name: "Emma Wilson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "2023-06-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Understanding Carbon Offsetting: Benefits and Limitations",
    excerpt: "Carbon offsetting can be a valuable tool in your climate action toolkit, but it's important to understand how it works and its place in a comprehensive approach.",
    category: "Education",
    author: {
      name: "David Chen",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "2023-06-10",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1500829243541-74b677fecc30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  },
  {
    id: 3,
    title: "The Rise of Community-Led Climate Initiatives",
    excerpt: "Across the globe, communities are taking climate action into their own hands. These grassroots movements are creating innovative solutions tailored to local needs.",
    category: "Community",
    author: {
      name: "Sophia Martinez",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "2023-06-05",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  },
  {
    id: 4,
    title: "Climate Anxiety: How to Stay Hopeful in Challenging Times",
    excerpt: "Feeling overwhelmed by climate news is common. Learn strategies to manage climate anxiety while staying engaged and effective in your environmental efforts.",
    category: "Wellbeing",
    author: {
      name: "James Taylor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "2023-05-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  },
  {
    id: 5,
    title: "The Environmental Impact of Your Digital Life",
    excerpt: "From streaming services to cloud storage, our digital activities have a carbon footprint too. Learn how to minimize your digital environmental impact.",
    category: "Technology",
    author: {
      name: "Alex Johnson",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "2023-05-20",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  },
  {
    id: 6,
    title: "Sustainable Eating: A Guide to Climate-Friendly Food Choices",
    excerpt: "What we eat has a significant impact on our carbon footprint. Discover how to make more sustainable food choices without sacrificing nutrition or enjoyment.",
    category: "Lifestyle",
    author: {
      name: "Olivia Kim",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    date: "2023-05-15",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: false
  }
];

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const featuredPost = posts.find(post => post.featured);
  
  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];
  
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // Example:
        // const response = await api.get('/blog-posts');
        // setPosts(response.data);
        
        // Using mock data instead
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        setPosts(mockPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            TerraNest Blog
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Insights, tips, and stories about climate action and sustainable living
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          <div className="flex-1 min-w-0 lg:col-span-2">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-primary focus:border-primary block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search articles"
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
          <div>
            <label htmlFor="category" className="sr-only">Category</label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg text-gray-500">Loading articles...</span>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && selectedCategory === 'all' && searchQuery === '' && (
              <div className="mt-12 max-w-lg mx-auto lg:max-w-none">
                <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={featuredPost.image} alt={featuredPost.title} />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-light text-primary-dark">
                          Featured
                        </span>
                        <span className="ml-2">{featuredPost.category}</span>
                      </p>
                      <Link to={`/blog/${featuredPost.id}`} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{featuredPost.title}</p>
                        <p className="mt-3 text-base text-gray-500">{featuredPost.excerpt}</p>
                      </Link>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={featuredPost.author.image} alt={featuredPost.author.name} />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{featuredPost.author.name}</p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                          <span aria-hidden="true">&middot;</span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Post Grid */}
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {filteredPosts.filter(post => !post.featured || selectedCategory !== 'all' || searchQuery !== '').map((post) => (
                <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={post.image} alt={post.title} />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary">
                        {post.category}
                      </p>
                      <Link to={`/blog/${post.id}`} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                        <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
                      </Link>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={post.author.image} alt={post.author.name} />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span aria-hidden="true">&middot;</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No results message */}
            {filteredPosts.length === 0 && (
              <div className="mt-12 text-center py-12 bg-white shadow rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
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
          </>
        )}

        {/* Newsletter Signup */}
        <div className="mt-24 bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-6 sm:p-12 sm:flex sm:items-center">
            <div className="sm:flex-1">
              <h3 className="text-xl font-bold text-gray-900">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Get the latest articles, resources, and insights on sustainable living delivered to your inbox.
              </p>
            </div>
            <form className="mt-4 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
              <div className="sm:flex">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-primary focus:border-primary sm:max-w-xs rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                We care about your data. Read our{' '}
                <Link to="/privacy" className="font-medium text-gray-900 underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
