import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaPlay, FaPause } from 'react-icons/fa'; // Import icons for play and pause
import info from '/videos/smallHero.mp4';

const DeliveryVideoComponent = () => {
  const videoRef = useRef(null); // Create a ref to access the video element
  const videoDivRef = useRef(null); // Create a ref to access the video element

  const [isPlaying, setIsPlaying] = useState(false); // State to track play/pause status

  const handlePlayPause = () => {
    const videoEl = videoRef.current;
    if (videoEl.paused) {
      videoEl.play();
      setIsPlaying(true);
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const videoEl = videoRef.current; // Access the video element
    const divEl = videoDivRef.current; // Access the video element


    // MatchMedia to apply different animations based on screen size
    ScrollTrigger.matchMedia({
      // For desktop and larger screens
      "(min-width: 768px)": function () {
        gsap.fromTo(
          divEl,
          { scale: 0.6 }, // Initial zoom out for desktop
          {
            scale: 1.0, // Final zoom in for desktop
            ease: 'power3.inOut', // Smoother easing function
            duration: 1.5,
            scrollTrigger: {
              trigger: divEl, // Element to trigger the animation
              start: 'top 95%', // Start animation when the Swiper is 80% from the top of the viewport
              end: 'center 40%', // End animation when the bottom of Swiper is at the top of the viewport
              scrub: 1, // Smooth animation on scroll with more consistent scrubbing
              // markers: true, // Uncomment to visualize ScrollTrigger markers
            },
          }
        );
      },

      // For mobile screens
      "(max-width: 767px)": function () {
        gsap.fromTo(
          divEl,
          { scale: 0.8 }, // Initial zoom out for mobile
          {
            scale: 1, // Final zoom in for mobile
            ease: 'power3.inOut', // Smoother easing function
            duration: 1.5,
            scrollTrigger: {
              trigger: divEl, // Element to trigger the animation
              start: 'top 95%', // Start animation when the Swiper is 80% from the top of the viewport
              end: 'center 30%', // End animation when the bottom of Swiper is at the top of the viewport
              scrub: 1, // Smooth animation on scroll with more consistent scrubbing
            },
          }
        );
      }
    });

  }, []);

  return (

    <div className=' w-full md:w-1/2 h-[40rem] md:h-[50rem] md:p-10' ref={videoDivRef}>
      <div className='h-full relative'>

        <video
          ref={videoRef} // Attach ref to the video element
          className='w-full h-full object-cover overflow-hidden'
          autoPlay
          loop
          muted // Mute the video if needed
        >
          <source src={info} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          onClick={handlePlayPause}
          className='absolute  bottom-5 right-5 md:bottom-8 md:right-8 p-1 md:p-3 bg-white rounded-full shadow-lg flex items-center justify-center'
        >
          {isPlaying ? (
            <FaPause size={'.9rem'} className='text-black' />
          ) : (
            <FaPlay size={'.9rem'} className='text-black' />
          )}
        </button>

      </div>
    </div>
  )
}

export default DeliveryVideoComponent