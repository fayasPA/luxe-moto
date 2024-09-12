import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { axiosAPI } from '../utils/axiosAPI';
import { BASE_IMAGE_URL, GET_LATEST_VEHICLES } from '../utils/urls';
import sampleBg from '/images/logo-white.png'

gsap.registerPlugin(ScrollTrigger);

const ImageShowcase = () => {
  
  // skeletons
  const VehicleCardSkeleton = () => (
    <div className="relative overflow-hidden">
      <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-borderColor/60 animate-pulse"></div>
      <div className="w-full bg-borderColor px-2 absolute bottom-0 inset-x-0 flex flex-col items-start justify-start gap-1">
        <div className="bg-borderColor h-6 w-3/4 rounded-md mb-2"></div>
        <div className="bg-borderColor h-8 w-1/2 rounded-md"></div>
      </div>
    </div>
  );
  
  // Skeleton Loader for the whole section
  const SkeletonLoader = () => (
    <div>
      <div className='w-full md:py-0 mb-5'>
        <div className='max-w-fit ml-10 md:ml-20 text-lg md:text-2xl lg:text-3xl header-animate-container'>
          <div className='bg-borderColor h-8 w-3/4 md:w-1/2 lg:w-1/3 rounded-md animate-pulse'></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden mt-4 ">
        {[...Array(3)].map((_, index) => (
          <VehicleCardSkeleton key={index} />
        ))}
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center py-10 px-4 md:px-10'>
        <div className='w-full md:w-auto flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10'>
          <div className='w-full md:w-auto font-extralight text-sm md:text-lg lg:text-xl text-[#ffffffce] text-center md:text-left'>
            <div className='bg-borderColor h-6 w-3/4 md:w-1/2 lg:w-1/3 rounded-md animate-pulse'></div>
          </div>
          <div className='flex justify-center items-center'>
            <div className="flex gap-2 px-4 py-3 md:px-6 md:py-3.5 lg:px-10 lg:py-4 overflow-hidden bg-borderColor rounded-md animate-pulse">
              <div className="bg-borderColor h-8 w-1/2 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = axiosAPI();
  useEffect(() => {
    setLoading(true)
    get_latest_vehicles();
  }, []);

  async function get_latest_vehicles() {
    try {
      const response = await axiosInstance.get(GET_LATEST_VEHICLES);
      if (response.status === 200 && response.data.premium_cars) {
        setData(response.data.premium_cars);
      }
    } catch (error) {
      console.log("---------BANNER_ERROR", error);
    } finally{
      setLoading(false)
    }
  }

  return (
    <div>
    {loading ? (
      <SkeletonLoader />
    ) : (
      <>
        <div className='w-full md:py-0 mb-5'>
          <div className='max-w-fit ml-10 md:ml-20 text-lg md:text-2xl lg:text-3xl header-animate-container'>
            <h2>Pre-owned luxury premium cars</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden mt-4">
          {data.length > 0 ? data.map((vehicle, index) => (
            <div key={index} className="relative overflow-hidden">
              <NavLink to={`/vehicles/${index}`}>
                <img
                  src={`${BASE_IMAGE_URL}${vehicle.image}`}
                  alt={`Showcase ${index + 1}`}
                  className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover group-hover:opacity-85 hover:scale-110 transition-transform duration-[2000ms] ease-in"
                />
              </NavLink>
              <div className="w-full bg-green-body/40 px-2 absolute bottom-0 inset-x-0 flex flex-col items-start justify-start gap-1">
                <span className="pt-1 text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold drop-shadow-md">
                  {vehicle.model}
                </span>
                <span className="text-white text-xl sm:text-2xl md:text-2xl lg:text-4xl font-bold drop-shadow-md">
                  {vehicle.brand}
                </span>
              </div>
            </div>
          )):(
            <div className='blur-md h-40 md:h-96 w-screen overflow-hidden rounded-lg flex justify-center items-center'>
              <div className='h-full w-full flex justify-center items-center'>
              <img
                src={sampleBg}
                alt="Main Car"
                className='h-8 md:h-full w-full md:w-1/2'
              />
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col md:flex-row justify-center items-center py-10 px-4 md:px-10'>
          <div className='w-full md:w-auto flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10'>
            <div className='w-full md:w-auto font-extralight text-sm md:text-lg lg:text-xl text-[#ffffffce] text-center md:text-left'>
              <p>We have a lot more to show you.</p>
            </div>
            <div className='flex justify-center items-center'>
              <NavLink
                to="/vehicles"
                className="flex gap-2 px-4 py-3 md:px-6 md:py-3.5 lg:px-10 lg:py-4 overflow-hidden group bg-gradient-to-r bg-green-900 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
              >
                <span
                  className="absolute right-0 w-24 md:w-32 lg:w-44 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 -skew-x-12 group-hover:-translate-x-36 ease pointer-events-none"
                ></span>
                <span className="relative text-[0.75rem] md:text-sm lg:text-base font-normal">
                  Discover More
                </span>
                <FaChevronRight className='flex self-center' />
              </NavLink>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
  );
};

export default ImageShowcase;
