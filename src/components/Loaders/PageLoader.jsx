import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../../assets/css/PageLoader.css';
import companyLogo from '/images/logo-white.png'; // Update the path to your image

const PageLoader = ({ setIsLoading }) => {
  const middleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false); // Set loading to false once the animation is complete
      },
    });

    // Scale the logo towards the screen in the first 2 seconds
    tl.fromTo(
      middleRef.current,
      {
        opacity: 0,
        scale: 1,
      },
      {
        opacity: 1,
        scale: 2.5,
        duration: 2,
        // ease: 'sine.out',
      }
    )
    // After 2 seconds, fade out the whole loader


  }, [setIsLoading]);

  return (
    <div className=' w-full'>
      <div
        className='h-screen w-full z-50 text-sm sm:text-lg md:text-2xl lg:3xl font-bold flex flex-col justify-center items-center text-center'

      >
        <div className='w-fit flex gap-2 justify-center items-center text-center' ref={middleRef}>
          <img src={companyLogo} alt="Luxe Moto Logo" className='w-6 md:w-8 h-3 md:h-5 -mt-[.5px] md:-mt-[.2px]' />
          <p className=''><span className=""
            style={{ fontFamily: "'Babylon', sans-serif" }}
          >LUXE MOTO</span>&nbsp;</p>
        </div>

      </div>
    </div>
  );
};

export default PageLoader;
