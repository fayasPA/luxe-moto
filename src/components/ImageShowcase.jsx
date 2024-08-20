import React, { useEffect, useRef } from 'react';
import img from '/videos/benz.jpg';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageShowcase = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    imageRefs.current.forEach((imageEl, index) => {
      const directions = ['-100%', '100%', '-100%', '100%', '-100%', '100%'];
      const startX = directions[index % directions.length];

      gsap.fromTo(
        imageEl,
        { x: startX, opacity: 0 }, // Start off-screen and invisible
        {
          x: '0%', // Slide to normal position
          opacity: 1, // Fade in
          duration: 2, // Duration of the slide effect
          ease: 'power2.out', // Easing function for smooth effect
          scrollTrigger: {
            trigger: imageEl,
            start: 'top 80%', // Start animation when image top is 80% from viewport top
            end: 'top 40%', // End animation when image top is 40% from viewport top
            scrub: true, // Smooth animation on scroll
            // markers: true, // Uncomment to see ScrollTrigger markers
          },
        }
      );
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden"
          ref={(el) => (imageRefs.current[index] = el)}
        >
          <img
            src={img}
            alt={`Showcase ${index + 1}`}
            className="w-screen md:w-[50vw] h-[100vh] object-cover"
          />
          {/* Car name overlay */}
          <div className="absolute bottom-0 inset-x-0 flex items-center justify-center p-4">
            <span className="text-white text-3xl md:text-4xl font-bold drop-shadow-md">
              Car Model {index + 1}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageShowcase;
