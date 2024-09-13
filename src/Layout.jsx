import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/Loaders/PageLoader';
import './assets/css/ToggleSwitch.css';
import 'react-range-slider-input/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import FloatingBtn from './components/FloatingBtn';
import LocomotiveScroll from 'locomotive-scroll';

const Layout = () => {
  const locomotiveScroll = new LocomotiveScroll();
  const [isLoading, setIsLoading] = useState(true);

  // Load the content behind the loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after 3 seconds (or when the content is ready)
    }, 3000); // Adjust time as necessary

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex flex-col">
      {/* Loader shows initially */}
      {isLoading && <PageLoader setIsLoading={setIsLoading} />}

      {/* Pre-load the content while the loader is showing */}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <ToastContainer toastClassName="custom-toast" />
        <FloatingBtn />
        <div className="overflow-hidden">
          <Navbar />
        </div>
        <div>
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
