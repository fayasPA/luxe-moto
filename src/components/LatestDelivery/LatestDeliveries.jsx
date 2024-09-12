import React from 'react';
import DeliveryVideoComponent from './DeliveryVideoComponent';
import DeliverSwiperSlider from './DeliverSwiperSlider';
import { FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const LatestDeliveries = () => {

  return (
    <div className='w-full mb-20'>
      {/* Header */}
      <div className=' w-full md:py-0'>
        <div className='header-animate-container max-w-fit ml-10 md:ml-20 text-lg md:text-2xl lg:text-3xl'>
          <h2 className=' header-animate-text'>Latest deliveries</h2>
        </div>
      </div>

      {/* body */}
      <div className='w-full h-full md:flex'>
        {/* left */}
        <div className=' w-full md:w-1/2 h-[32rem] md:h-[50rem] px-5 overflow-hidden'>
          <div className='w-full h-full'>
            <DeliverSwiperSlider />
          </div>
        </div>

        {/* right */}
        <DeliveryVideoComponent />

      </div>
      <div className='font-medium py-5 text-center text-xs md:text-sm flex justify-center mt-5'>
        <NavLink
          to="/gallery" // Add the path you want to navigate to
          className="flex gap-2 px-6 py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r bg-green-900 relative hover:bg-gradient-to-r  text-white transition-all ease-out duration-300"
        >
          <span
            className="absolute right-0 w-32 md:w-44 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 -skew-x-12 group-hover:-translate-x-36 ease pointer-events-none"
          ></span>
          <span className="relative text-base md:text-md font-normal">View All Deliveries</span>
          <FaChevronRight className='flex self-center' />
        </NavLink>

      </div>

    </div>
  );
}

export default LatestDeliveries;
