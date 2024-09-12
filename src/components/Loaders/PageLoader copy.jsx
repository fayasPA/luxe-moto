import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../../assets/css/PageLoader.css';

const PageLoader = ({ setIsLoading }) => {
  const [isVisible, setIsVisible] = useState(true);
  const topHalfRef = useRef(null);
  const middleRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const timelineRef = useRef(gsap.timeline({ paused: true }));

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(topHalfRef.current, {
      y: '-100%',
      duration: 1,
      ease: 'power2.inOut',
    })
      .to(
        bottomHalfRef.current,
        {
          y: '100%',
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=1'
      )
      .to(
        middleRef.current,
        {
          scale: 0.5,
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=1'
      )
      .to(
        '.spinner span',
        {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=1'
      )
      .eventCallback('onComplete', () => {
        setIsLoading(false); // Directly set loading to false
      });

    const timeoutId = setTimeout(() => {
      tl.play();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [setIsLoading]);

  if (!isVisible) return (<div className='h-full w-full hidden bg-red'></div>); // Don't render the loader if it's not visible

  return (
    <div className='h-screen w-full relative z-50'>
      <div className='h-1/2 w-full border-b-[0.5px] border-gray-400' ref={topHalfRef}></div>
      <div className='h-1/2 w-full border-t-[0.5px] border-gray-400' ref={bottomHalfRef}></div>

      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center' ref={middleRef}>
        <div className="spinner ">
          <span>L</span>
          <span>U</span>
          <span>X</span>
          <span>E</span>
          <span className='space'> </span> {/* Adding space in the p tag */}
          <span>M</span>
          <span>O</span>
          <span>T</span>
          <span>O</span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
