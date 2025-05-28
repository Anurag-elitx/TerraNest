import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Anurag Kumar",
      role: "Teammate",
      image: "https://avatars.githubusercontent.com/u/180947675?v=4",
      bio: "Environmental scientist with 10+ years in climate research and sustainability consulting."
    },
    {
      name: "Divyansh Gupta",
      role: "Teammate",
      image: "https://avatars.githubusercontent.com/u/169717681?v=4",
      bio: "Software engineer passionate about using technology to solve environmental challenges."
    },
    {
      name: "Arpit Mishra",
      role: "Teammate",
      image: "https://avatars.githubusercontent.com/u/182322786?v=4",
      bio: "Community organizer with expertise in building sustainable grassroots movements."
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Company Founded",
      description: "TerraNest was founded with the mission to democratize climate action."
    },
    {
      year: "2023",
      title: "Platform Launch",
      description: "Launched our beta platform with action tracking and community features."
    },
    {
      year: "2023",
      title: "10K Users",
      description: "Reached 10,000 active users tracking their environmental impact."
    },
    {
      year: "2023",
      title: "Carbon Marketplace",
      description: "Launched verified carbon offset marketplace with 50+ projects."
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanding to serve communities worldwide with localized content."
    }
  ];

  const values = [
    {
      title: "Transparency",
      description: "We believe in open, honest communication about climate impact and our platform's effectiveness.",
      icon: (
        <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Community",
      description: "Climate action is most effective when we work together. We foster collaboration and mutual support.",
      icon: (
        <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Science-Based",
      description: "All our calculations and recommendations are grounded in peer-reviewed climate science.",
      icon: (
        <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Accessibility",
      description: "Climate action should be accessible to everyone, regardless of background or resources.",
      icon: (
        <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-primary">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              About TerraNest
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-green-100">
              Empowering individuals and communities to take meaningful climate action through 
              technology, education, and collaboration.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-gray-600 lg:mx-auto">
              Climate change is the defining challenge of our time, but it can feel overwhelming 
              for individuals to know how to make a difference. TerraNest bridges this gap by 
              providing tools, community, and verified opportunities for climate action.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary text-white mx-auto">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Track Impact</h3>
                <p className="mt-2 text-base text-gray-600">
                  Measure and visualize your environmental impact with science-based calculations.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary text-white mx-auto">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Build Community</h3>
                <p className="mt-2 text-base text-gray-600">
                  Connect with like-minded individuals and organizations working toward sustainability.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-primary text-white mx-auto">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Take Action</h3>
                <p className="mt-2 text-base text-gray-600">
                  Access verified carbon offset projects and participate in meaningful climate initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 lg:mx-auto">
              These principles guide everything we do at TerraNest.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-md bg-green-100 mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">{value.title}</h3>
                  <p className="mt-2 text-base text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 lg:mx-auto">
              We're a diverse team of environmental scientists, engineers, and community organizers 
              united by our passion for climate action.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    className="mx-auto h-32 w-32 rounded-full"
                    src={member.image}
                    alt={member.name}
                  />
                  <h3 className="mt-6 text-lg font-medium text-gray-900">{member.name}</h3>
                  <p className="text-base text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Journey
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 lg:mx-auto">
              From idea to impact - here's how TerraNest has grown.
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white">
                        <span className="text-sm font-medium">{milestone.year}</span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-medium text-gray-900">{milestone.title}</h3>
                      <p className="text-base text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">25K+</div>
              <div className="text-green-100">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">500K</div>
              <div className="text-green-100">Actions Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">2.5M</div>
              <div className="text-green-100">kg CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">150+</div>
              <div className="text-green-100">Communities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Partners
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 lg:mx-auto">
              We work with leading organizations to verify carbon offset projects and provide 
              accurate environmental data.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="col-span-1 flex justify-center">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-center text-gray-400 font-semibold">
                    Verra Registry
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-center text-gray-400 font-semibold">
                    Gold Standard
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-center text-gray-400 font-semibold">
                    Climate Action Reserve
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-center text-gray-400 font-semibold">
                    American Carbon Registry
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of individuals and organizations taking climate action with TerraNest.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

