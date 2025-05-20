import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

// Mock data for offset projects
const mockProjects = [
  {
    id: 1,
    name: "Reforestation Project",
    description: "Support tree planting efforts in deforested areas to capture carbon and restore ecosystems.",
    location: "Amazon Rainforest, Brazil",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    pricePerTon: 15,
    totalTons: 5000,
    tonsRemaining: 3245,
    category: "reforestation",
    rating: 4.8,
    reviews: 124,
    verified: true
  },
  // Other projects...
];

// Mock data for user's carbon footprint
const mockFootprint = {
  total: 12.5, // tons of CO2 per year
  breakdown: {
    transport: 4.2,
    home: 3.8,
    food: 2.5,
    products: 1.2,
    services: 0.8
  },
  comparison: {
    national: 16.2,
    global: 4.8
  }
};

// Mock data for user's offset history
const mockOffsetHistory = [
  {
    id: 101,
    date: "2023-05-15",
    project: "Reforestation Project",
    amount: 2,
    cost: 30
  },
  {
    id: 102,
    date: "2023-03-22",
    project: "Solar Energy Farm",
    amount: 1.5,
    cost: 33
  }
];

const OffsetPage = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState(mockProjects);
  const [footprint, setFootprint] = useState(mockFootprint);
  const [offsetHistory, setOffsetHistory] = useState(mockOffsetHistory);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [showOffsetModal, setShowOffsetModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [offsetAmount, setOffsetAmount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  // Filter projects based on category, search query, and sort
  const filteredProjects = projects
    .filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricePerTon - b.pricePerTon;
        case 'price-high':
          return b.pricePerTon - a.pricePerTon;
        case 'rating':
          return b.rating - a.rating;
        case 'availability':
          return b.tonsRemaining - a.tonsRemaining;
        default: // recommended
          return (b.rating * 0.4) + (a.pricePerTon * -0.6); // weighted score
      }
    });

  // In a real app, you would fetch projects, footprint data, and offset history from your API
  useEffect(() => {
    // Example:
    // const fetchData = async () => {
    //   try {
    //     const [projectsRes, footprintRes, historyRes] = await Promise.all([
    //       api.get('/offset/projects'),
    //       api.get('/users/me/footprint'),
    //       api.get('/users/me/offset-history')
    //     ]);
    //     setProjects(projectsRes.data);
    //     setFootprint(footprintRes.data);
    //     setOffsetHistory(historyRes.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    // 
    // fetchData();
  }, []);

  const handleOffsetProject = (project) => {
    setSelectedProject(project);
    setOffsetAmount(1);
    setShowOffsetModal(true);
  };

  const confirmOffset = async () => {
    if (!selectedProject) return;
    
    setIsSubmitting(true);
    
    // In a real app, you would submit the offset purchase to your API
    try {
      // Example:
      // const response = await api.post('/offset/purchase', {
      //   projectId: selectedProject.id,
      //   amount: offsetAmount
      // });
      
      // Mock the response
      setTimeout(() => {
        // Update project's remaining tons
        setProjects(projects.map(project => 
          project.id === selectedProject.id 
            ? { ...project, tonsRemaining: project.tonsRemaining - offsetAmount } 
            : project
        ));
        
        // Add to offset history
        const newOffset = {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          project: selectedProject.name,
          amount: offsetAmount,
          cost: offsetAmount * selectedProject.pricePerTon
        };
        
        setOffsetHistory([newOffset, ...offsetHistory]);
        
        setShowOffsetModal(false);
        setSelectedProject(null);
        setIsSubmitting(false);
        
        // Show success message
        alert(`You've successfully offset ${offsetAmount} tons of CO2!`);
      }, 1000);
    } catch (error) {
      console.error('Error purchasing offset:', error);
      alert('Failed to purchase offset. Please try again.');
      setIsSubmitting(false);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'reforestation':
        return 'bg-green-100 text-green-800';
      case 'renewable-energy':
        return 'bg-blue-100 text-blue-800';
      case 'methane-capture':
        return 'bg-purple-100 text-purple-800';
      case 'agriculture':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Carbon Offset
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Offset your carbon footprint by supporting verified environmental projects.
            </p>
          </div>
        </div>

        {/* Carbon Footprint Summary */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Your Carbon Footprint
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Based on your activities and lifestyle.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{formatNumber(footprint.total)}</div>
                <div className="text-sm text-gray-500">Tons CO2e per year</div>
              </div>
              <div className="text-center mt-4 sm:mt-0">
                <div className="text-3xl font-bold text-gray-700">{formatNumber(footprint.comparison.national)}</div>
                <div className="text-sm text-gray-500">National Average</div>
              </div>
              <div className="text-center mt-4 sm:mt-0">
                <div className="text-3xl font-bold text-gray-700">{formatNumber(footprint.comparison.global)}</div>
                <div className="text-sm text-gray-500">Global Average</div>
              </div>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <h4 className="text-sm font-medium text-gray-500">BREAKDOWN</h4>
              <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-5">
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-500">Transport</span>
                  </div>
                  <div className="text-lg font-medium">{formatNumber(footprint.breakdown.transport)} tons</div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm text-gray-500">Home</span>
                  </div>
                  <div className="text-lg font-medium">{formatNumber(footprint.breakdown.home)} tons</div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-500">Food</span>
                  </div>
                  <div className="text-lg font-medium">{formatNumber(footprint.breakdown.food)} tons</div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm text-gray-500">Products</span>
                  </div>
                  <div className="text-lg font-medium">{formatNumber(footprint.breakdown.products)} tons</div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm text-gray-500">Services</span>
                  </div>
                  <div className="text-lg font-medium">{formatNumber(footprint.breakdown.services)} tons</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:px-6 text-center">
              <Link
                to="/footprint-calculator"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Update Your Footprint Calculation
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`${
                activeTab === 'projects'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Offset Projects
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`${
                activeTab === 'history'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Your Offset History
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`${
                activeTab === 'learn'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Learn About Offsetting
            </button>
          </nav>
        </div>

        {/* Offset Projects Tab */}
        {activeTab === 'projects' && (
          <>
            {/* Filters and Search */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Project Type
                </label>
                <select
                  id="category"
                  name="category"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="reforestation">Reforestation</option>
                  <option value="renewable-energy">Renewable Energy</option>
                  <option value="methane-capture">Methane Capture</option>
                  <option value="agriculture">Sustainable Agriculture</option>
                </select>
              </div>
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
                  Sort By
                </label>
                <select
                  id="sort"
                  name="sort"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="availability">Availability</option>
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
                    placeholder="Search projects by name, description, or location"
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

            {/* Projects Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="h-48 w-full relative">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-0 right-0 mt-2 mr-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(project.category)}`}>
                        {project.category.replace('-', ' ')}
                      </span>
                    </div>
                    {project.verified && (
                      <div className="absolute top-0 left-0 mt-2 ml-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center">
                          <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">{project.description}</p>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{project.location}</span>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{project.rating} ({project.reviews} reviews)</span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Availability</span>
                        <span className="font-medium">{project.tonsRemaining.toLocaleString()} / {project.totalTons.toLocaleString()} tons</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${(project.tonsRemaining / project.totalTons) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${project.pricePerTon}</span>
                        <span className="text-sm text-gray-500"> / ton CO2</span>
                      </div>
                      
                      <button
                        onClick={() => handleOffsetProject(project)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Offset Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No results message */}
            {filteredProjects.length === 0 && (
              <div className="mt-6 text-center py-12 bg-white shadow rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSortBy('recommended');
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

        {/* Offset History Tab */}
        {activeTab === 'history' && (
          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Your Offset History
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Record of your carbon offset purchases.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Offset</div>
                  <div className="text-2xl font-bold text-primary">
                    {formatNumber(offsetHistory.reduce((sum, item) => sum + item.amount, 0))} tons
                  </div>
                </div>
              </div>
              {offsetHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cost
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Certificate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {offsetHistory.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.project}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatNumber(item.amount)} tons
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${formatNumber(item.cost)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a 
                              href="#" 
                              className="text-primary hover:text-primary-dark"
                              onClick={(e) => {
                                e.preventDefault();
                                alert('Certificate download would be implemented here');
                              }}
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No offset history</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven't purchased any carbon offsets yet.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Browse Offset Projects
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Learn About Offsetting Tab */}
        {activeTab === 'learn' && (
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Understanding Carbon Offsetting
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Learn how carbon offsetting works and why it's important.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="prose max-w-none">
                <h4>What is Carbon Offsetting?</h4>
                <p>
                  Carbon offsetting is the process of compensating for your carbon dioxide (CO2) emissions by funding projects that reduce or remove CO2 from the atmosphere. These projects can include reforestation, renewable energy, methane capture, and more.
                </p>
                
                <h4 className="mt-6">How Does it Work?</h4>
                <p>
                  When you purchase a carbon offset, you're essentially investing in a project that reduces greenhouse gas emissions. The amount of reduction is measured in tons of CO2 equivalent (CO2e). For example, if you purchase an offset for 1 ton of CO2e, the project you're supporting will reduce or remove 1 ton of CO2e from the atmosphere.
                </p>
                
                <h4 className="mt-6">Types of Offset Projects</h4>
                <ul>
                  <li>
                    <strong>Reforestation and Afforestation:</strong> Planting trees that absorb CO2 as they grow.
                  </li>
                  <li>
                    <strong>Renewable Energy:</strong> Developing clean energy sources like solar, wind, or hydroelectric power to replace fossil fuels.
                  </li>
                  <li>
                    <strong>Methane Capture:</strong> Capturing methane emissions from landfills, livestock, or other sources before they enter the atmosphere.
                  </li>
                  <li>
                    <strong>Energy Efficiency:</strong> Implementing technologies or practices that reduce energy consumption.
                  </li>
                  <li>
                    <strong>Sustainable Agriculture:</strong> Promoting farming practices that sequester carbon in soil.
                  </li>
                </ul>
                
                <h4 className="mt-6">Verification and Certification</h4>
                <p>
                  High-quality carbon offset projects are verified by independent third parties to ensure they deliver the promised emissions reductions. Look for certifications from respected organizations like Gold Standard, Verified Carbon Standard (VCS), Climate Action Reserve, or American Carbon Registry.
                </p>
                
                <h4 className="mt-6">Carbon Offsetting vs. Reduction</h4>
                <p>
                  While offsetting is valuable, it's important to remember that reducing your emissions should always be the first priority. Offsetting works best as part of a comprehensive strategy that includes:
                </p>
                <ol>
                  <li>Measuring your carbon footprint</li>
                  <li>Reducing emissions where possible</li>
                  <li>Offsetting the emissions you can't eliminate</li>
                </ol>
                
                <h4 className="mt-6">Making the Most of Your Offsets</h4>
                <p>
                  To ensure your offsetting efforts have the greatest impact:
                </p>
                <ul>
                  <li>Choose projects with additional benefits beyond carbon reduction, such as biodiversity protection or community development</li>
                  <li>Look for projects with permanence (long-term impact)</li>
                  <li>Verify that projects wouldn't have happened without offset funding (additionality)</li>
                  <li>Support a mix of project types for a balanced approach</li>
                </ul>
                
                <div className="mt-8 bg-green-50 p-4 rounded-md">
                  <h4 className="text-green-800">Ready to Offset Your Carbon Footprint?</h4>
                  <p className="text-green-700">
                    Browse our verified projects and start making a positive impact today.
                  </p>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    View Offset Projects
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Offset Purchase Modal */}
      {showOffsetModal && selectedProject && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Offset with {selectedProject.name}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Select the amount of CO2 you want to offset with this project.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="mb-4">
                  <label htmlFor="offset-amount" className="block text-sm font-medium text-gray-700">
                    Amount to Offset (tons CO2)
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      name="offset-amount"
                      id="offset-amount"
                      min="0.1"
                      max={selectedProject.tonsRemaining}
                      step="0.1"
                      className="focus:ring-primary focus:border-primary flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                      value={offsetAmount}
                      onChange={(e) => setOffsetAmount(Math.min(parseFloat(e.target.value) || 0, selectedProject.tonsRemaining))}
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      tons
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price per ton:</span>
                    <span className="font-medium">${selectedProject.pricePerTon}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500">Quantity:</span>
                    <span className="font-medium">{formatNumber(offsetAmount)} tons</span>
                  </div>
                  <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg">${formatNumber(offsetAmount * selectedProject.pricePerTon)}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 mb-4">
                  <p>
                    By purchasing this offset, you'll receive a certificate documenting your contribution to fighting climate change.
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
                  onClick={confirmOffset}
                  disabled={isSubmitting || offsetAmount <= 0}
                >
                  {isSubmitting ? 'Processing...' : 'Purchase Offset'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setShowOffsetModal(false);
                    setSelectedProject(null);
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

export default OffsetPage;

