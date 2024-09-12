import React, { useState } from 'react';
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

  return (
    <div className='flex flex-col'>
      {isLoading ? (
        <PageLoader setIsLoading={setIsLoading} /> // Pass setIsLoading to control the loader's visibility
      ) : (
        <>
          <ToastContainer toastClassName="custom-toast" />
          <FloatingBtn />
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
