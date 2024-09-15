import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import info from '/videos/ad_bg.mp4';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { AD_VIDEO_URL } from '../utils/urls';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const InfoVideo = React.memo(() => {
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

  // useEffect(() => {
  //   const video = videoRef.current;

  //   // Set up GSAP animations
  //   const mm = gsap.matchMedia(); // MatchMedia for handling responsive animations

  //   // Video zoom-out effect
  //   if (videoDivRef.current) {
  //     gsap.fromTo(
  //       videoDivRef.current,
  //       { scale: 1 },
  //       {
  //         scale: 0.5,
  //         scrollTrigger: {
  //           trigger: videoDivRef.current,
  //           start: 'top 20%',
  //           end: 'bottom top',
  //           scrub: true,
  //           markers: false,
  //         },
  //         ease: 'none',
  //       }
  //     );
  //   }

  //   // Responsive animations using matchMedia for textRef
  //   mm.add(
  //     {
  //       // Small screens (up to 767px)
  //       isSmall: '(max-width: 767px)',
  //       // Medium and larger screens (768px and above)
  //       isLarge: '(min-width: 768px)',
  //     },
  //     (context) => {
  //       let { isSmall, isLarge } = context.conditions;

  //       if (isSmall) {
  //         // Small screens animation
  //         gsap.fromTo(
  //           textRef.current,
  //           { y: 30, opacity: 0 },
  //           {
  //             y: 0,
  //             opacity: 1,
  //             duration: 1,
  //             ease: 'power2.out',
  //             scrollTrigger: {
  //               trigger: videoDivRef.current,
  //               start: 'center 70%', // Trigger later for small screens
  //               end: 'center 20',
  //               scrub: true,
  //             },
  //           }
  //         );
  //       }

  //       if (isLarge) {
  //         // Large screens animation
  //         gsap.fromTo(
  //           textRef.current,
  //           { y: 50, opacity: 0 },
  //           {
  //             y: 0,
  //             opacity: 1,
  //             duration: 1.5,
  //             ease: 'power2.out',
  //             scrollTrigger: {
  //               trigger: videoDivRef.current,
  //               start: 'top 20%',
  //               end: 'center top',
  //               scrub: true,
  //             },
  //           }
  //         );
  //       }
  //     }
  //   );

  //   // Clean up the animations when component unmounts
  //   return () => {
  //     mm.revert(); // Revert all media queries when the component unmounts
  //   };
  // }, [videoDivRef]);

  return (
    <div className='w-full flex flex-col'>
      <div ref={videoDivRef} className='relative flex-1 flex flex-col justify-center items-center'>
        <div className='relative w-full h-96 md:h-[70vh]'>
          <video
            className='w-full h-full object-cover'
            muted
            loop
            ref={videoRef}
            autoPlay={true}
          >
            <source src={AD_VIDEO_URL} type='video/mp4' />
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
});

export default InfoVideo;
