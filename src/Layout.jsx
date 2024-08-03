import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col relative'>
      <Navbar />
      <div className='relative z-0'>
        <Outlet />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
