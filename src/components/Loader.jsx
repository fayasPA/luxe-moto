import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onExit }) => {
  const [isVisible, setIsVisible] = useState(true); // State to manage loader visibility
  const containerRef = useRef(null);
  const topHalfRef = useRef(null);
  const middleRef = useRef(null);
  const bottomHalfRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(middleRef.current, {
      duration: 2,
      opacity: 1,
      ease: 'power1.inOut',
    });

    tl.to(topHalfRef.current, {
      duration: 2,
      opacity: 1,
      ease: 'power1.inOut',
    }, '-=2');

    tl.to(bottomHalfRef.current, {
      duration: 2,
      opacity: 1,
      ease: 'power1.inOut',
    }, '-=2');

  }, []); // Empty dependency array means this effect runs only once on mount

  useEffect(() => {
    if (onExit) {
      setTimeout(() => {
        const exitTl = gsap.timeline({
          onComplete: () => {
            setIsVisible(false); // Hide the loader after animation
            if (onExit) onExit(); // Call the onExit callback
          },
        });

        exitTl.to(middleRef.current, {
          scale: 0.1,
          opacity: 0,
          duration: 1,
          ease: 'power1.inOut',
        });

        exitTl.to(topHalfRef.current, {
          y: '-100%',
          duration: 1,
          ease: 'power1.inOut',
        }, 0);

        exitTl.to(bottomHalfRef.current, {
          y: '100%',
          duration: 1,
          ease: 'power1.inOut',
        }, 0);

      }, 2000); // Delay before the exit animation starts  
    }
  }, [onExit]);

  return (
    isVisible && (
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 flex flex-col touch-none overflow-hidden"
      >
        <div
          ref={topHalfRef}
          className="relative flex-1 bg-white"
          style={{
            opacity: 0,
          }}
        />
        
        <div
          ref={middleRef}
          className="relative flex flex-col items-center justify-center flex-1 bg-white rounded"
          style={{
            opacity: 0,
          }}
        >
          <p className="text-5xl md:text-9xl font-bold whitespace-nowrap text-black">
            Luxe Moto
          </p>
        </div>

        <div
          ref={bottomHalfRef}
          className="relative flex-1 bg-white"
          style={{
            opacity: 0,
          }}
        />
      </div>
    )
  );
};

export default Loader;
