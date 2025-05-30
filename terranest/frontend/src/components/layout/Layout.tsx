import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ThemeToggle from '../ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <Navbar />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
