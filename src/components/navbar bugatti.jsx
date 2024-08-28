import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { gsap } from 'gsap';
import { NavLink } from 'react-router-dom';
import companyLogo from '/images/blackLogo.png'; // Update the path to your image

const moreList = [
  { name: 'Home', path: '/' },
  { name: 'Collections', path: '/vehicles' },
  { name: 'Sellcar', path: '/sellcar' },
  { name: 'Showroom', path: '/showroom' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Insurance', path: '/insurance' },
  { name: 'Emi-Calculator', path: '/emi-calculator' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const commonRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.common-animation', // Target all elements with this class
        { x: (i) => (i % 2 === 0 ? -400 : 400), opacity: 0 }, // Alternate entrance direction
        {
          x: 0,
          opacity: 1,
          duration: 1.2, // Slower animation duration
          ease: 'expo.out',
          stagger: 0.2, // Slightly increased stagger delay
        }
      );

      gsap.to('.menu-container', {
        x: 0,
        duration: 1.2, // Slower animation duration
        ease: 'expo.out',
      });
    } else {
      gsap.to('.menu-container', {
        x: '-100%',
        duration: 1.2, // Slower animation duration
        ease: 'expo.in',
      });
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-screen flex justify-between items-center p-4 bg-transparent z-50 overflow-hidden">
      <div className="flex items-center">
        <img src={companyLogo} alt="Company Logo" className="w-10 h-5 mr-2" /> {/* Replace icon with image */}
        <h1 className="text-black text-2xl font-bold">Luxe Moto</h1>
      </div>
      <div className="text-black text-2xl cursor-pointer z-50" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes className="text-black" /> : <FaBars />}
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-white transform -translate-x-full z-40 menu-container overflow-hidden"
      >
        <div className="flex flex-col justify-center items-center h-full space-y-8">
          {moreList.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="text-black text-3xl md:text-7xl font-bold flex items-center transition-colors duration-300 hover:text-green-300 common-animation"
              ref={(el) => (commonRef.current[index] = el)}
            >
              <span className="text-gray-600 text-base md:text-xl mr-4 flex h-full items-start">{`0${index + 1}`}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
