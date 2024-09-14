import React, { useEffect, useRef } from 'react';
import DeliveryVideoComponent from './DeliveryVideoComponent';
import DeliverSwiperSlider from './DeliverSwiperSlider';
import { FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LatestDeliveries = () => {
  const headerRef = useRef(null); // Create a ref for header text container

  // useEffect(() => {
  //   // Register ScrollTrigger plugin with GSAP
  //   gsap.registerPlugin(ScrollTrigger);

  //   // Create the scroll animation with reversible actions
  //   gsap.fromTo(
  //     headerRef.current,
  //     {
  //       y: 100,      // Start 100px below its natural position
  //       opacity: 0,  // Start fully transparent
  //     },
  //     {
  //       y: 0,        // End at its natural position
  //       opacity: 1,  // End fully visible
  //       duration: 1.5, // Animation duration
  //       ease: 'power3.out',
  //       scrollTrigger: {
  //         trigger: ".header-animate-container", // Element to trigger animation
  //         start: 'top bottom',  // When the top of the element hits 80% of the viewport
  //         end: 'bottom 80%',    // End when the element is near the top of the viewport
  //         scrub: true,       // Smooth scrubbing for reversing animation
  //         toggleActions: 'play reverse play reverse', // Reverses on scroll up
  //         markers: true,    // Set to 'true' for debugging markers
  //       },
  //     }
  //   );
  // }, []);

  return (
    <div className='w-full mb-10 md:mb-20 mt-5'>
      {/* Header */}
      <div className='w-full md:py-0'>
        <div className='header-animate-container max-w-fit ml-10 md:ml-20 text-lg md:text-2xl lg:text-3xl'>
          <h2 ref={headerRef} className='header-animate-text'>
            Latest Deliveries
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className='w-full h-full lg:flex'>
        {/* Left - Swiper Slider */}
        <div className='w-full lg:w-1/2 h-[27rem] sm:h-[32rem] md:h-[50rem] px-5 overflow-hidden'>
          <DeliverSwiperSlider />
        </div>
        {/* Right - Delivery Video Component */}
        <div className='w-full lg:w-1/2 h-[27rem] sm:h-[32rem] md:h-[50rem] px-0 lg:px-5 overflow-hidden'>
          <DeliveryVideoComponent />
        </div>

        {/* <DeliveryVideoComponent /> */}
      </div>

      {/* Footer with "View All Deliveries" Button */}
      <div className='font-medium py-5 text-center text-xs md:text-sm flex justify-center mt-5'>
        <NavLink
          to="/gallery"
          className="flex gap-2 px-6 py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r bg-green-900 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
        >
          <span
            className="absolute right-0 w-32 md:w-44 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 -skew-x-12 group-hover:-translate-x-36 ease pointer-events-none"
          ></span>
          <span className="relative text-xs md:text-sm lg:text-base font-normal">View All Deliveries</span>
          <FaChevronRight className='flex self-center' />
        </NavLink>
        {/* <NavLink
          className="flex gap-2 px-6 py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r bg-green-900 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
        >
          <span
            className="absolute right-0 w-32 md:w-44 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 -skew-x-12 group-hover:-translate-x-36 ease pointer-events-none"
          ></span>
          <span className="relative text-base md:text-md font-normal"></span>
          <FaChevronRight className='flex self-center' />
        </NavLink> */}
      </div>
    </div>
  );
};

export default LatestDeliveries;
