import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onExit }) => {
  // Refs for accessing DOM elements directly
  const containerRef = useRef(null);
  const topHalfRef = useRef(null);
  const middleRef = useRef(null);
  const bottomHalfRef = useRef(null);

  useEffect(() => {
    // GSAP timeline for the initial text and section animations
    const tl = gsap.timeline();

    // Animate the opacity of the middle section from 0 to 1
    tl.to(middleRef.current, {
      duration: 2, // Duration of the fade-in animation
      opacity: 1,  // Final opacity value
      ease: 'power1.inOut', // Easing function for smooth animation
    });

    // Animate opacity of top and bottom sections
    tl.to(topHalfRef.current, {
      duration: 2, // Duration of the fade-in animation
      opacity: 1,  // Final opacity value
      ease: 'power1.inOut', // Easing function for smooth animation
    }, '-=2'); // Overlap with previous animation

    tl.to(bottomHalfRef.current, {
      duration: 2, // Duration of the fade-in animation
      opacity: 1,  // Final opacity value
      ease: 'power1.inOut', // Easing function for smooth animation
    }, '-=2'); // Overlap with previous animation

  }, []); // Empty dependency array means this effect runs only once on mount

  useEffect(() => {
    if (onExit) {
      setTimeout(() => {
        // GSAP timeline for the exit animation
        const exitTl = gsap.timeline({
          onComplete: onExit, // Callback function to execute when the animation completes
        });

        // Animate middle section (zoom out and fade out)
        exitTl.to(middleRef.current, {
          scale: 0.1, // Zoom out by scaling down
          opacity: 0, // Fade out
          duration: 1, // Duration of the animation
          ease: 'power1.inOut', // Easing function for smooth animation
        });

        // Animate top half (move out upwards)
        exitTl.to(topHalfRef.current, {
          y: '-100%', // Move the top half out of view upwards
          duration: 1, // Duration of the animation
          ease: 'power1.inOut', // Easing function for smooth animation
        }, 0); // Start the top half animation at the same time as the middle section

        // Animate bottom half (move out downwards)
        exitTl.to(bottomHalfRef.current, {
          y: '100%', // Move the bottom half out of view downwards
          duration: 1, // Duration of the animation
          ease: 'power1.inOut', // Easing function for smooth animation
        }, 0); // Start the bottom half animation at the same time as the middle section

      }, 2000); // Delay before the exit animation starts
    }
  }, [onExit]); // Effect depends on the onExit prop

  return (
    <div
      ref={containerRef} // Container for the entire loader
      className="fixed inset-0 z-50 flex flex-col touch-none overflow-hidden"
    >
      {/* Top half of the screen */}
      <div
        ref={topHalfRef} // Ref for accessing the top half
        className="relative flex-1 bg-white"
        style={{
          opacity: 0, // Initial opacity for fade-in effect
        }}
      />
      
      {/* Middle section where the "Luxe Moto" text is displayed */}
      <div
        ref={middleRef} // Ref for accessing the middle section
        className="relative flex flex-col items-center justify-center flex-1 bg-white rounded"
        style={{
          opacity: 0, // Initial opacity for fade-in effect
        }}
      >
        <p
          className="text-9xl font-bold whitespace-nowrap text-black"

        >
          Luxe Moto
       </p>
      </div>

      {/* Bottom half of the screen */}
      <div
        ref={bottomHalfRef} // Ref for accessing the bottom half
        className="relative flex-1 bg-white"
        style={{
          opacity: 0, // Initial opacity for fade-in effect
        }}
      />
    </div>
  );
};

export default Loader;
