import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Footer from './components/Footer';
import 'react-range-slider-input/dist/style.css';


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
      <div className=''>
        <Outlet />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
