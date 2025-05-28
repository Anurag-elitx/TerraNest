import React, { useState } from 'react';

interface OffsetProject {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
  pricePerTon: number;
  totalTons: number;
  soldTons: number;
  image: string;
  certification: string;
  rating: number;
}

const mockProjects: OffsetProject[] = [
  {
    id: 1,
    title: "Amazon Rainforest Conservation",
    description: "Protecting 10,000 hectares of Amazon rainforest from deforestation while supporting local communities.",
    location: "Brazil",
    type: "Forest Conservation",
    pricePerTon: 25,
    totalTons: 50000,
    soldTons: 32000,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    certification: "VCS, CCB",
    rating: 4.8
  },
  {
    id: 2,
    title: "Wind Farm Development",
    description: "Supporting renewable energy generation through wind farm development in rural communities.",
    location: "India",
    type: "Renewable Energy",
    pricePerTon: 18,
    totalTons: 75000,
    soldTons: 45000,
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    certification: "Gold Standard",
    rating: 4.6
  },
  {
    id: 3,
    title: "Reforestation Initiative",
    description: "Planting native trees to restore degraded landscapes and create carbon sinks.",
    location: "Kenya",
    type: "Reforestation",
    pricePerTon: 22,
    totalTons: 30000,
    soldTons: 18000,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    certification: "VCS",
    rating: 4.7
  }
];

const OffsetPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<OffsetProject | null>(null);
  const [offsetAmount, setOffsetAmount] = useState<number>(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handlePurchase = (project: OffsetProject) => {
    setSelectedProject(project);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    alert(`Successfully purchased ${offsetAmount} tons of carbon offsets from ${selectedProject?.title}!`);
    setShowPurchaseModal(false);
    setSelectedProject(null);
    setOffsetAmount(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Carbon Offset Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Offset your carbon footprint by supporting verified climate projects around the world. 
            Every purchase helps fund renewable energy, forest conservation, and community development.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">2.5M+</div>
            <div className="text-gray-600">Tons CO₂ Offset</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-gray-600">Verified Projects</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-gray-600">Countries</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                    {project.type}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">{project.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {project.location}
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{Math.round((project.soldTons / project.totalTons) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(project.soldTons / project.totalTons) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {project.soldTons.toLocaleString()} / {project.totalTons.toLocaleString()} tons sold
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${project.pricePerTon}
                    </div>
                    <div className="text-sm text-gray-500">per ton CO₂</div>
                  </div>
                  
                  <button
                    onClick={() => handlePurchase(project)}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Purchase
                  </button>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  Certified by: {project.certification}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Modal */}
        {showPurchaseModal && selectedProject && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Purchase Carbon Offsets
                </h3>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900">{selectedProject.title}</h4>
                  <p className="text-sm text-gray-600">{selectedProject.location}</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (tons CO₂)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={offsetAmount}
                    onChange={(e) => setOffsetAmount(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${(selectedProject.pricePerTon * offsetAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Processing fee:</span>
                    <span className="font-medium">$2.00</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>${(selectedProject.pricePerTon * offsetAmount + 2).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPurchaseModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmPurchase}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffsetPage;