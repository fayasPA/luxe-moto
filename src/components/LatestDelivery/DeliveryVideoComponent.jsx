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
    gsap.fromTo(
      divEl,
      {
        scale: 0.6, // Initial scale (zoomed out)
      },
      {
        scale: 1, // Target scale (zoomed in)
        ease: 'power3.inOut', // Smoother easing function
        duration: 1.5, // Duration for smoother transition
        scrollTrigger: {
          trigger: divEl, // Element to trigger the animation
          start: 'top 95%', // Start animation when the Swiper is near the viewport
          end: 'center 50%', // End animation when the Swiper reaches the center
          scrub: 1, // Smooth animation scrubbing
          once: false, // Allow animation to replay when scrolling back up
        },
      }
    );
  }, []);

  return (
    <div className='w-full h-full pl-0 lg:pl-24 py-5 lg:py-10' ref={videoDivRef}>
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
