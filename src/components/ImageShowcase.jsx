import React, { useEffect, useRef } from 'react';
import img from '/videos/benz.jpg';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ImageShowcase = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    imageRefs.current.forEach((imageEl, index) => {
      const directions = ['-100%', '100%', '-100%', '100%', '-100%', '100%'];
      const startX = directions[index % directions.length];

      gsap.fromTo(
        imageEl,
        { x: startX, opacity: 0 }, // Start off-screen and invisible
        {
          x: '0%', // Slide to normal position
          opacity: 1, // Fade in
          duration: 2, // Duration of the slide effect
          ease: 'power2.out', // Easing function for smooth effect
          scrollTrigger: {
            trigger: imageEl,
            start: 'top 95%', // Start animation when image top is 80% from viewport top
            end: 'bottom 105%', // End animation when the bottom of Swiper is at the top of the viewport
            scrub: true, // Smooth animation on scroll
          },
        }
      );
    });
  }, []);

  return (
    <div>
      <div className='w-full md:py-0 mb-5'>
        <div className='font-medium max-w-fit ml-10 md:ml-20 text-3xl md:text-7xl header-animate-container'>
          <h2 >Pre Owned Luxury Premium Cars</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden  mt-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden"
            ref={(el) => (imageRefs.current[index] = el)}
          >
            <NavLink to={`/vehicles/${index}`} >
              <img
                src={img}
                alt={`Showcase ${index + 1}`}
                className="w-screen md:w-[50vw] h-[100vh] object-cover group-hover:opacity-85 hover:scale-110 transition-transform duration-[2000ms] ease-in"
              />
            </NavLink>

            {/* Car name overlay */}
            <div className="absolute bottom-10 md:bottom-14 inset-x-0 flex flex-col items-start justify-start md:items-center md:justify-center gap-4 mx-5 md:mx-auto w-fit">
              <span className="text-white text-base md:text-xl font-semibold drop-shadow-md">
                Spectre{index + 1}
              </span>
              <span className="text-white text-3xl md:text-4xl font-bold drop-shadow-md">
                ROLLS ROYCE {index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center items-center py-10'>
        <div className='w-fit flex justify-center items-center gap-10'>

          <div className='w-fit text-md md:text-xl'>
            <p className=''>
              We have a lot more to show you.
            </p>
          </div>

          <div className=' flex justify-center items-center'>
          <button
            className="flex gap-2 px-6 py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r from-gray-700 to-black relative hover:bg-gradient-to-r hover:from-green hover:to-green-300 text-white transition-all ease-out duration-300"
          >
            <span
              className="absolute right-0 w-32 md:w-44 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"
            ></span>
            <span className="relative text-base md:text-xl font-semibold">Discover More</span>
            <FaChevronRight className='flex self-center' />
          </button>
        </div>


        </div>
      </div>


    </div>
  );
};

export default ImageShowcase;
