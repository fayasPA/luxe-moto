// Updated Layout component
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/Loaders/PageLoader';
import './assets/css/ToggleSwitch.css'
import 'react-range-slider-input/dist/style.css';

const Layout = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='flex flex-col'>
      {isLoading ? (
        <PageLoader setIsLoading={setIsLoading} /> // Pass setIsLoading directly to PageLoader
      ) : (
        <>
        <div className='overflow-hidden'>
          <Navbar />
        </div>
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
