import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              About TerraNest
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Our mission is to empower individuals and communities to take meaningful climate action.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <div className="prose prose-green prose-lg text-gray-500">
              <p>
                TerraNest was founded in 2025 with a simple but powerful vision: to make climate action accessible, measurable, and community-driven. We believe that when individuals come together with shared purpose, even small actions can create significant positive change for our planet.
              </p>
              <p>
                Climate change is one of the most pressing challenges of our time, and it can often feel overwhelming. TerraNest breaks down this complex issue into practical, everyday actions that anyone can take, while providing the tools to track your impact and connect with like-minded individuals.
              </p>
              <h3>Our Approach</h3>
              <p>
                We focus on three key pillars:
              </p>
              <ul>
                <li>
                  <strong>Individual Action</strong>: Providing personalized recommendations for reducing your carbon footprint through simple daily choices.
                </li>
                <li>
                  <strong>Community Engagement</strong>: Connecting you with others who share your environmental values to amplify your collective impact.
                </li>
                <li>
                  <strong>Measurable Impact</strong>: Tracking and visualizing the real environmental benefits of your actions to keep you motivated.
                </li>
              </ul>
              <h3>Our Team</h3>
              <p>
                TerraNest brings together experts in environmental science, technology, and community organizing. Our diverse team is united by a shared commitment to creating a more sustainable future.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
                <div className="flex flex-col items-center">
                  <img 
                    className="object-cover w-32 h-32 rounded-full mb-4"
                    src="https://media.licdn.com/dms/image/v2/D5603AQGNDM-igGL02A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725222205745?e=1753315200&v=beta&t=ba4wy5NbQj-j4IXDIw1w_Jw2imeGZE4vyYw5GaCGQBQ"
                    alt="Anurag Kumar"
                  />
                  <div className="text-center">
                    <h4 className="text-lg font-medium text-gray-900">Anurag Kumar</h4>
                    <p className="text-gray-500">Founder & CEO</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <img 
                    className="object-cover w-32 h-32 rounded-full mb-4"
                    src="https://media.licdn.com/dms/image/v2/D4D03AQF1FilF9T_MDw/profile-displayphoto-shrink_200_200/B4DZbo4VGCG8Ac-/0/1747663803296?e=1753315200&v=beta&t=pIrf81Kig0GzjPs4t8lVDuKz-6YKrO3kO-kaEzhrmtY"
                    alt="Divyansh Gupta"
                  />
                  <div className="text-center">
                    <h4 className="text-lg font-medium text-gray-900">Divyansh Gupta</h4>
                    <p className="text-gray-500">Chief Technology Officer</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <img 
                    className="object-cover w-32 h-32 rounded-full mb-4"
                    src="https://media.licdn.com/dms/image/v2/D4D03AQHiEtSN1sGFmQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724948103748?e=1753315200&v=beta&t=33fHg5jXusPm4jMHDFHzPmX4Njkozs7e1VMvITa6BKk"
                    alt="Arpit Mishra"
                  />
                  <div className="text-center">
                    <h4 className="text-lg font-medium text-gray-900">Arpit Mishra</h4>
                    <p className="text-gray-500">Chief Technology Officer</p>
                  </div>
                  </div>
              </div>
              <h3 className="mt-8">Our Partners</h3>
              <p>
                We collaborate with environmental organizations, academic institutions, and forward-thinking companies to expand our impact and ensure our approach is grounded in the latest science.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                  <img className="max-h-12" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg" alt="Transistor" />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                  <img className="max-h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
                </div>
                <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                  <img className="max-h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
                </div>
              </div>
              <h3 className="mt-8">Join Us</h3>
              <p>
                Whether you're just beginning your sustainability journey or you're a seasoned environmental advocate, TerraNest is designed for you. Join our growing community today and be part of the solution.
              </p>
              <div className="mt-8">
                <a href="/register" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Create an Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;