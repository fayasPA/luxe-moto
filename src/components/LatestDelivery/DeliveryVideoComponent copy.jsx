import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaPlay, FaPause } from 'react-icons/fa';
import info from '/videos/delivery_video.mp4';

gsap.registerPlugin(ScrollTrigger);

const DeliveryVideoComponent = () => {
  const videoRef = useRef(null); // Ref for the video element
  const videoDivRef = useRef(null); // Ref for the video container

  const [isPlaying, setIsPlaying] = useState(true); // State for tracking play/pause

  const handlePlayPause = () => {
    const videoEl = videoRef.current;
    if (videoEl.paused) {
      videoEl.play();
    } else {
      videoEl.pause();
    }
  };

  useEffect(() => {
    const videoEl = videoRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Add event listeners for play/pause
    videoEl.addEventListener('play', handlePlay);
    videoEl.addEventListener('pause', handlePause);

    // Cleanup event listeners on unmount
    return () => {
      videoEl.removeEventListener('play', handlePlay);
      videoEl.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    const divEl = videoDivRef.current;

    // Set up GSAP matchMedia for responsive animations
    const mm = gsap.matchMedia();

    mm.add(
      {
        // For desktop and larger screens
        isDesktop: "(min-width: 1280px)",
        // For mobile screens
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        gsap.fromTo(
          divEl,
          { scale: isMobile ? 0.8 : 0.6 },
          {
            scale: 1,
            ease: 'power3.inOut',
            duration: 1.5,
            scrollTrigger: {
              trigger: divEl,
              start: 'top 95%',
              end: isMobile ? 'center 30%' : 'center 40%',
              scrub: 1,
            },
          }
        );
      }
    );

    // Cleanup matchMedia on component unmount
    return () => mm.revert();
  }, []);

  return (
    <div className='w-full lg:w-1/2 h-[27rem] sm:h-[32rem] md:h-[50rem] lg:p-10 pt-10 lg:pt-0' ref={videoDivRef}>
      <div className='h-full relative'>
        <video
          ref={videoRef}
          className='w-full h-full object-cover overflow-hidden lg:rounded-3xl'
          autoPlay
          loop
          muted
        >
          <source src={info} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          onClick={handlePlayPause}
          className='absolute bottom-5 right-5 md:bottom-8 md:right-8 p-1 md:p-3 bg-green-body/60 rounded-full shadow-lg flex items-center justify-center'
        >
          {isPlaying ? (
            <FaPause size={'.9rem'} className='text-borderColor2' />
          ) : (
            <FaPlay size={'.9rem'} className='text-borderColor2' />
          )}
        </button>
      </div>
    </div>
  );
};

export default DeliveryVideoComponent;
