import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  readTime: number;
}

const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Simple Ways to Reduce Your Carbon Footprint Today",
    excerpt: "Small changes in your daily routine can make a big difference for the planet. Here are actionable steps you can take right now.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Sarah Johnson",
    date: "2023-06-15",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["sustainability", "lifestyle", "tips"],
    readTime: 5
  },
  {
    id: 2,
    title: "The Science Behind Carbon Offsets: What You Need to Know",
    excerpt: "Understanding how carbon offsets work and how to choose legitimate projects that make a real impact.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Dr. Michael Chen",
    date: "2023-06-12",
    category: "Science",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["carbon offsets", "science", "climate"],
    readTime: 8
  },
  {
    id: 3,
    title: "Building Sustainable Communities: Lessons from Around the World",
    excerpt: "Exploring successful community-led sustainability initiatives and what we can learn from them.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Emily Rodriguez",
    date: "2023-06-10",
    category: "Community",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["community", "sustainability", "global"],
    readTime: 6
  }
];

const categories = ["All", "Lifestyle", "Science", "Community", "Technology", "Policy"];

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = mockPosts[0];
  const recentPosts = mockPosts.slice(1, 4);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TerraNest Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and stories about climate action, sustainability, and building a better future for our planet.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="h-64 md:h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                    Featured
                  </span>
                  <span className="ml-3 text-sm text-gray-500">
                    {featuredPost.readTime} min read
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">
                      By {featuredPost.author} • {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {post.category}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    {post.readTime} min read
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {post.author} • {new Date(post.date).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-primary rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-green-100 mb-6">
            Get the latest sustainability tips and climate action insights delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none"
            />
            <button className="bg-white text-primary px-6 py-2 rounded-r-lg font-medium hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
