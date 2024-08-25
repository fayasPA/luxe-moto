import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import info from '/videos/info.mp4';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const InfoVideo = () => {
  const videoDivRef = useRef(null);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }//comment
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoDivRef.current) {
      gsap.fromTo(videoDivRef.current,
        {
          scale: 1, // Initial scale
        },
        {
          scale: 0.3, // Zoom-out scale
          scrollTrigger: {
            trigger: '.info-video-div',
            start: "top 0%", // Trigger when the top of the video hits 75% of the viewport height
            end: 'bottom top',
          // end: "bottom bottom", // End when the bottom of the video hits the top of the viewport
            scrub: true, // Smoothly animate based on scroll position
            // pin: true
          },
          yoyo: true,
          ease: "none", // No easing for a smooth scrolling effect
          markers: true,
        }
      );
    }
  }, []);

  return (
    <div className='h-screen w-full info-video-div pt-10 md:pt-28'>
      <div className='relative h-[80%]' ref={videoDivRef}>
        <video
          className='w-full h-full object-cover'
          controls={false} // Disable default controls
          muted // Mute the video if needed
          loop
          autoPlay
          ref={videoRef}
        >
          <source src={info} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          onClick={handlePlayPause}
          className='absolute  bottom-5 right-5 md:bottom-8 md:right-8 p-1 md:p-3 bg-white rounded-full shadow-lg flex items-center justify-center'
        >
          {isPlaying ? (
            <PauseIcon className='w-6 h-6 md:w-8 md:h-8 text-black' />
          ) : (
            <PlayIcon className='w-6 h-6 md:w-8 md:h-8 text-black' />
          )}
        </button>

      </div>

      <div className='flex justify-center items-center text-center h-[20%]'>
        <p className='text-xl md:text-4xl max-w-md md:max-w-3xl'>
          Introducing the most electrifying Car stories ever. <strong className='text-green'>Luxe Moto</strong> is the perfect match
          for your used car purchase.
        </p>
      </div>
    </div>
  );
};

export default InfoVideo;
