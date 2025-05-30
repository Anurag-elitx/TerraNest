import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LeafIcon, 
  TwitterIcon, 
  FacebookIcon, 
  InstagramIcon, 
  LinkedinIcon 
} from '../ui/Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <LeafIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">TerraNest</span>
            </Link>
            <p className="mt-4 text-gray-300 dark:text-gray-400 text-sm">
              Empowering individuals and communities to take climate action through practical steps and community engagement.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Platform</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/dashboard" className="text-base text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/actions" className="text-base text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200">
                  Actions
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="text-base text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200">
                  Challenges
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-base text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-base text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Connect</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200">
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200">
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200">
                <span className="sr-only">Instagram</span>
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200">
                <span className="sr-only">LinkedIn</span>
                <LinkedinIcon className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Subscribe</h3>
              <p className="mt-4 text-base text-gray-300 dark:text-gray-400">Get the latest news and updates.</p>
              <form className="mt-4 sm:flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="appearance-none min-w-0 w-full bg-white dark:bg-gray-800 border border-transparent rounded-md py-2 px-4 text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 focus:ring-primary focus:border-primary focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full bg-primary border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 focus:ring-primary"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 dark:border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <p className="text-base text-gray-400 dark:text-gray-500">
              &copy; {new Date().getFullYear()} TerraNest. All rights reserved.
            </p>
          </div>
          <p className="mt-8 text-base text-gray-400 dark:text-gray-500 md:mt-0 md:order-1">
            <Link to="/privacy" className="hover:text-white dark:hover:text-gray-200">Privacy Policy</Link>
            {' | '}
            <Link to="/terms" className="hover:text-white dark:hover:text-gray-200">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
