import React, { useEffect, useRef } from 'react';
import ZoomSlider from './ZoomSlider';
import info from '../../public/videos/smallHero.mp4';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SliderAndVideo = () => {
  const videoRef = useRef(null); // Create a ref to access the video element

  useEffect(() => {
    const videoEl = videoRef.current; // Access the video element

    // GSAP animation: Zoom the video in and out while scrolling
    gsap.fromTo(
      videoEl,
      {
        scale: 0.8, // Initial zoom out
      },
      {
        scale: 1.1, // Final zoom in
        ease: 'power3.inOut', // Smoother easing function
        duration: 1.5,
        scrollTrigger: {
          trigger: videoEl, // Element to trigger the animation
          start: 'top 120%', // Start animation when the Swiper is 80% from the top of the viewport
          end: 'center top', // End animation when the bottom of Swiper is at the top of the viewport
          scrub: 1, // Smooth animation on scroll with more consistent scrubbing
          // markers: true, // Uncomment to visualize ScrollTrigger markers
        },
      }
    );
  }, []);

  return (
    <div className='w-screen h-screen md:flex'>
      <div className='w-full md:w-[50%] '>
        <ZoomSlider />
      </div>
      <div className='w-full  md:w-[50%] h-full md:pl-16 md:pr-3 '>
        <video 
          ref={videoRef} // Attach ref to the video element
          className='w-full h-full object-cover'
          controls={false} // Disable default controls
          muted // Mute the video if needed
        >
          <source src={info} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default SliderAndVideo;

