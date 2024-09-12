import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import info from '/videos/ad_bg.mp4';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const InfoVideo = () => {
  const videoDivRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  // Sync the play/pause state with the actual video state
  useEffect(() => {
    const handleVideoPlay = () => setIsPlaying(true);
    const handleVideoPause = () => setIsPlaying(false);

    const video = videoRef.current;
    if (video) {
      video.addEventListener('play', handleVideoPlay);
      video.addEventListener('pause', handleVideoPause);
    }

    return () => {
      if (video) {
        video.removeEventListener('play', handleVideoPlay);
        video.removeEventListener('pause', handleVideoPause);
      }
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    // Set the video start time to 12 seconds
    if (video) {
      video.currentTime = 5; // Set the starting time to 5 seconds

      // If the video is autoplaying, ensure it starts from 5 seconds
      video.addEventListener('loadedmetadata', () => {
        video.currentTime = 5;
      });
    }

    if (videoDivRef.current) {
      gsap.fromTo(
        videoDivRef.current,
        {
          scale: 1, // Initial scale
        },
        {
          scale: 0.5, // Zoom-out scale
          scrollTrigger: {
            trigger: videoDivRef.current,
            start: 'top 20%', // Trigger when the top of the video hits 20% of the viewport height
            end: 'bottom top',
            scrub: true, // Smoothly animate based on scroll position
            markers: false,
            scroller: '[data-scroll-container]',
          },
          ease: 'none', // No easing for a smooth scrolling effect
        }
      );
    }

    gsap.fromTo(
      textRef.current,
      {
        y: 50, // Start 50px below its natural position
        opacity: 0, // Start fully transparent
      },
      {
        y: 0, // End at its natural position
        opacity: 1, // End fully visible
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: videoDivRef.current,
          start: 'top 20%', // Start animation when the video div reaches 20% of the viewport height
          end: 'bottom top',
          scrub: true,
          scroller: '[data-scroll-container]',
        },
      }
    );
  }, []);

  return (
    <div className='w-full flex flex-col'>
      <div ref={videoDivRef} className='relative flex-1 flex flex-col justify-center items-center'>
        <div className='relative w-full h-96 md:h-[70vh]'>
          <video
            className='w-full h-full object-cover'
            muted // Mute the video if needed
            loop
            ref={videoRef}
            autoPlay={true} // Autoplay is now false for more control
          >
            <source src={info} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
          <button
            onClick={handlePlayPause}
            className='absolute bottom-4 right-4 md:bottom-8 md:right-8 p-2 md:p-3 bg-green-body/60 rounded-full shadow-lg flex items-center justify-center'
          >
            {isPlaying ? (
              <PauseIcon className='w-6 h-6 md:w-8 md:h-8 text-borderColor2' />
            ) : (
              <PlayIcon className='w-6 h-6 md:w-8 md:h-8 text-borderColor2' />
            )}
          </button>
        </div>
        <div className='w-full text-center p-4 md:p-8'>
          <p ref={textRef} className='text-sm md:text-xl lg:text-2xl font-extralight text-borderColor'>
            Introducing the most electrifying Car stories ever.{' '}
            <strong className='text-white' style={{ fontFamily: 'babylon, sans-serif' }}>
              Luxe Moto
            </strong>{' '}
            is the perfect match for your used car purchase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoVideo;
