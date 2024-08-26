import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/Loaders/PageLoader';

const Layout = () => {
  // State to control whether the loader is visible
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle hiding the loader
  const handleLoaderExit = () => {
    setIsLoading(false); // Set loading to false to hide the loader
  };

  return (
    <div className='flex flex-col'>
      {isLoading ? (
        <PageLoader onExit={handleLoaderExit} /> // Pass the handleLoaderExit to the PageLoader component
      ) : (
        <>
          <Navbar />
          <div>
            <Outlet />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
