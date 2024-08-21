import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import info from '/videos/info.mp4';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const InfoVideo = () => {
  const videoRef = useRef(null);
  const videoRefs = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRefs.current) {
      if (isPlaying) {
        videoRefs.current.pause();
      } else {
        videoRefs.current.play();
      }//comment
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      gsap.fromTo(videoRef.current,
        {
          scale: 1, // Initial scale
        },
        {
          scale: 0.7, // Zoom-out scale
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 75%", // Trigger when the top of the video hits 75% of the viewport height
            end: "bottom top", // End when the bottom of the video hits the top of the viewport
            scrub: true, // Smoothly animate based on scroll position
          },
          yoyo: true,
          ease: "none", // No easing for a smooth scrolling effect
        }
      );
    }
  }, []);

  return (
    <>
      <div className=' my-6 mx-6 relative' ref={videoRef}>
        <video 
          ref={videoRefs}
          className='w-full h-auto '
          controls={false} // Disable default controls
          muted // Mute the video if needed
          loop
          autoPlay
        >
          <source src={info} type="video/mp4" /> 
          Your browser does not support the video tag.
          

          
          </video>
          <button
          onClick={handlePlayPause}
          className='absolute  bottom-0 right-0 md:bottom-8 md:right-8 p-1 md:p-3 bg-white rounded-full shadow-lg flex items-center justify-center'
        >
          {isPlaying ? (
            <PauseIcon className='w-6 h-6 md:w-8 md:h-8 text-black' />
          ) : (
            <PlayIcon className='w-6 h-6 md:w-8 md:h-8 text-black' />
          )}
        </button>

      </div>
      <div className='flex justify-center items-center mx-24 md:mx-56 mt-10'>
        <p className='text-xl md:text-4xl'>
          Introducing the most electrifying Maserati story ever. Folgore is the perfect match
          between innovative performance and highest Italian luxury design.
        </p>
      </div>
    </>
  );
};

export default InfoVideo;
