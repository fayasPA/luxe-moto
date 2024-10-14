// FloatingBtn.js
import React, { useEffect, useRef, useState } from 'react';
import { FiPhone, FiMail, FiX } from 'react-icons/fi';
import { TbPhonePlus } from "react-icons/tb";

import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import gsap from 'gsap';

const FloatingBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'power4.out'
      });
    } else {
      gsap.to(menuRef.current, {
        scale: 0,
        duration: 0.5,
        ease: 'power4.out'
      });
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-10 right-5 md:right-4 z-50 text-white">
      <div ref={menuRef} className={`opened-button-div flex flex-col items-center bg-green-body/50 shadow-lg rounded-full p-2 border border-borderColor`} style={{ transform: 'scale(0)' }}>
        <button type='button' name='phone-btn' className="mb-2 p-2 rounded-full hover:border hover:border-white" onClick={() => window.location.href = 'tel:+918590081819'}>
          <FiPhone className="text-xl" />
        </button>
        <button type='button' name='whatsapp-btn' className="mb-2 p-2 rounded-full hover:border hover:border-white" onClick={() => window.location.href = 'https://wa.me/918590081819'}>
          <FaWhatsapp className="text-xl" />
        </button>
        <button type='button' name='instagram-btn' className="mb-2 p-2 rounded-full hover:border hover:border-white" onClick={() => window.location.href = 'https://www.instagram.com/luxe_moto_/'}>
          <FaInstagram className="text-xl" />
        </button>
        <button type='button' name='mail-btn' className="mb-2 p-2 rounded-full hover:border hover:border-white" onClick={() => window.location.href = 'mailto:info.luxemoto@gmail.com'}>
          <FiMail className="text-xl" />
        </button>
      </div>
      <button
        type='button'
        ref={buttonRef}
        onClick={toggleMenu}
        className={`border hover:border-0 ${isOpen && 'border-0'} border-borderColor p-4 text-white rounded-full shadow-lg bg-green-body/50 hover:bg-green-body transition duration-300 ease-in-out`}
      >
        {isOpen ? <FiX className="text-xl md:text-3xl" /> : <TbPhonePlus className="text-xl md:text-3xl" />}
      </button>
    </div>
  );
};

export default FloatingBtn;

