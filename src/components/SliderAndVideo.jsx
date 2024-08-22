import React, { useEffect, useRef, useState } from 'react';
import ZoomSlider from './ZoomSlider';
import info from '/videos/smallHero.mp4';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaPlay, FaPause } from 'react-icons/fa'; // Import icons for play and pause
import SliderUi from './SliderUi';

gsap.registerPlugin(ScrollTrigger);

const SliderAndVideo = () => {
  const videoRef = useRef(null); // Create a ref to access the video element
  const videoRefs = useRef(null); // Create a ref to access the video element

  const [isPlaying, setIsPlaying] = useState(false); // State to track play/pause status

  useEffect(() => {
    const videoEl = videoRef.current; // Access the video element
    const divEl = videoRefs.current; // Access the video element


    // MatchMedia to apply different animations based on screen size
    ScrollTrigger.matchMedia({
      // For desktop and larger screens
      "(min-width: 768px)": function() {
        gsap.fromTo(
          divEl,
          { scale: 0.6 }, // Initial zoom out for desktop
          {
            scale: 1.0, // Final zoom in for desktop
            ease: 'power3.inOut', // Smoother easing function
            duration: 1.5,
            scrollTrigger: {
              trigger: divEl, // Element to trigger the animation
              start: 'top 120%', // Start animation when the Swiper is 80% from the top of the viewport
              end: 'center top', // End animation when the bottom of Swiper is at the top of the viewport
              scrub: 1, // Smooth animation on scroll with more consistent scrubbing
              // markers: true, // Uncomment to visualize ScrollTrigger markers
            },
          }
        );
      },

      // For mobile screens
      "(max-width: 767px)": function() {
        gsap.fromTo(
          divEl,
          { scale: 0.8 }, // Initial zoom out for mobile
          {
            scale: 1, // Final zoom in for mobile
            ease: 'power3.inOut', // Smoother easing function
            duration: 1.5,
            scrollTrigger: {
              trigger: divEl, // Element to trigger the animation
              start: 'top 120%', // Start animation when the Swiper is 80% from the top of the viewport
              end: 'center top', // End animation when the bottom of Swiper is at the top of the viewport
              scrub: 1, // Smooth animation on scroll with more consistent scrubbing
              // markers: true, // Uncomment to visualize ScrollTrigger markers
            },
          }
        );
      }
    });

  }, []);

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

  return (
    <>
    <div className='w-full h-[200%] md:h-full md:flex relative my-0'>
      <div className='w-full md:w-[50%] '>
        <div className='md:hidden p-12 h-[100vh]'><ZoomSlider /> </div> 
       <div className='hidden md:flex'> <SliderUi/> </div> 
      </div>
      <div className='w-full md:w-[50%] h-screen md:pl-16md:pr-3 relative ' ref={videoRefs}>

        <video 
          ref={videoRef} // Attach ref to the video element
          className='w-full h-full object-cover '
          autoPlay
          loop
          muted // Mute the video if needed
        >
          <source src={info} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
           <div className='absolute bottom-0 right-0 pb-4 pr-5'>
          <button
            className='bg-white p-3  rounded-full shadow-lg '
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          </div>

      </div>
    </div>
    {/* text */}
    <div className='flex justify-center items-center mx-24 md:mx-56 mt-10'>
        <p className='text-xl md:text-4xl'>
          Introducing the most electrifying Maserati story ever. Folgore is the perfect match
          between innovative performance and highest Italian luxury design.
        </p>
      </div>
    </>
  );
}

export default SliderAndVideo;
