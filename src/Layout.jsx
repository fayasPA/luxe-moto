import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Footer from './components/Footer';


const Layout = () => {
  const [loaded, setLoaded] = useState(false);
  const [exitLoader, setExitLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setExitLoader(true);
    }, 1000);
  }, []);

  return (
    <div className='min-h-screen flex flex-col relative'>
      <Navbar />
      <Loader
        onExit={() => {
          setLoaded(false);
        }}
      />
      <div className='relative z-0'>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
