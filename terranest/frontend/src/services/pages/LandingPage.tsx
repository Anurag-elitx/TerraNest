import React from 'react';
import { Link } from 'react-router-dom';
import { LeafIcon, UsersIcon, ChartLineIcon } from '../../components/ui/Icons';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-green-500 to-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Take Climate Action with TerraNest
              </h1>
              <p className="mt-6 text-xl text-white">
                Join our community and make a difference through simple daily actions, challenges, and community initiatives.
              </p>
              <div className="mt-8 flex space-x-4">
                <Link
                  to="/register"
                  className="inline-block bg-white text-primary font-medium rounded-md px-6 py-3 hover:bg-gray-100 transition duration-150"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="inline-block bg-transparent border-2 border-white text-white font-medium rounded-md px-6 py-3 hover:bg-white hover:bg-opacity-10 transition duration-150"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="mt-12 md:mt-0 md:w-1/2">
              <img
                src="/hero-image.png"
                alt="Climate action illustration"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How TerraNest Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to take climate action and track your impact.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary bg-opacity-10 text-primary">
                <LeafIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Daily Actions</h3>
              <p className="mt-2 text-gray-600">
                Complete simple eco-friendly actions daily to reduce your carbon footprint.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary bg-opacity-10 text-primary">
                <UsersIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Community Challenges</h3>
              <p className="mt-2 text-gray-600">
                Join challenges with your community, school, or organization to amplify your impact.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary bg-opacity-10 text-primary">
                <ChartLineIcon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Track Your Impact</h3>
              <p className="mt-2 text-gray-600">
                See your progress and the collective impact of our community in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Our Global Impact
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Together, we're making a measurable difference for our planet.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-4xl font-extrabold text-primary">10,000+</p>
              <p className="mt-2 text-lg font-medium text-gray-900">Eco-Actions Completed</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-4xl font-extrabold text-primary">5,000+</p>
              <p className="mt-2 text-lg font-medium text-gray-900">Trees Planted</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-4xl font-extrabold text-primary">100+</p>
              <p className="mt-2 text-lg font-medium text-gray-900">Schools & Organizations</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to take action?</span>
            <span className="block text-green-100">Join TerraNest today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
