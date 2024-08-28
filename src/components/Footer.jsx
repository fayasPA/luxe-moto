import React, { useEffect } from "react";
import { FaInstagram,
  FaWhatsapp,
  } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import whiteLogo from '/images/logo-white.png'
import blackLogo from '/images/blackLogo.png'
import { ImFacebook2 } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  useEffect(() => {
    gsap.fromTo(
      ".footer-content",
      {
        opacity: 0,
        y: 200,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-container",
          start: "top bottom",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <footer className="w-full h-full bg-18392B text-white pt-5 md:pt-10 footer-container">
      <div className="flex flex-col items-center w-fit mx-auto footer-content">
        <img src={whiteLogo} className="w-10 h-8 rounded-xl logo " alt=" Logo" />
        <span className="w-full font-semibold">Luxe Moto</span>
      </div>

      <div className="w-full px-5 py-6 flex flex-col items-center">
        <div className="max-w-7xl w-full footer-content grid grid-cols-2 md:grid-cols-4 gap-8 text-sm md:text-base text-center md:text-left border-y-[0.1px] border-[#ffffff59] py-5 md:py-7 justify-center font-light">


          <div className="">
            <h3 className="font-medium mb-4 ">SPORTS CARS</h3>
            <ul>
              <li className="text-xs p-2">Range</li>
              <li className="text-xs p-2">Configure your Ferrari</li>
              <li className="text-xs p-2">MyFerrari</li>
              <li className="text-xs p-2">Pre-owned</li>
              <li className="text-xs p-2">Dealers</li>
              <li className="text-xs p-2">Recall information</li>
              <li className="text-xs p-2">TechInfo</li>
            </ul>
          </div>

          <div className="">
            <h3 className="font-medium mb-4">COLLECTIONS</h3>
            <ul>
              <li className="text-xs p-2">Men</li>
              <li className="text-xs p-2">Women</li>
              <li className="text-xs p-2">Kids</li>
              <li className="text-xs p-2">Shoes</li>
              <li className="text-xs p-2">Eyewear</li>
              <li className="text-xs p-2">Collectibles</li>
              <li className="text-xs p-2">Scuderia Ferrari Selection</li>
            </ul>
          </div>

          <div className="">
            <h3 className="font-medium mb-4">EXPERIENCES</h3>
            <ul>
              <li className="text-xs p-2">Corse Clienti</li>
              <li className="text-xs p-2">Ferrari Esports Series</li>
              <li className="text-xs p-2">Ristorante Cavallino</li>
              <li className="text-xs p-2">Ferrari Museums</li>
              <li className="text-xs p-2">Ferrari World Abu Dhabi</li>
              <li className="text-xs p-2">Ferrari Land Barcelona</li>
            </ul>
          </div>

          <div className="">
            <h3 className="font-medium mb-4">ABOUT US</h3>
            <ul>
              <li className="text-xs p-2">Corporate</li>
              <li className="text-xs p-2">Sustainability</li>
              <li className="text-xs p-2">Media Centre</li>
              <li className="text-xs p-2">News</li>
              <li className="text-xs p-2">Magazine</li>
              <li className="text-xs p-2">History</li>
              <li className="text-xs p-2">Join us</li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center mt-5 space-x-4 footer">
          <a className="flex justify-center items-center" href="https://wa.me/919037696969" target='blank'>
            <FaWhatsapp size={"1.5rem"} className=" cursor-pointer footer" />
          </a>
          <a className="flex justify-center items-center" href="https://www.facebook.com/people/Amani-Motors/61555223155190/" target='blank'>
            <ImFacebook2 size={"1.5rem"} className=" cursor-pointer footer" />
          </a>
          {/* <FaTwitter size={"1.5rem"} className=" cursor-pointer footer" /> */}
          <a className="flex justify-center items-center" href="https://www.youtube.com/watch?v=D3kcFp9i_cE" target='blank'>
            <IoLogoYoutube size={"1.5rem"} className=" cursor-pointer footer" />
          </a>
          <a className="flex justify-center items-center" href="https://www.instagram.com/amani_motors/" target='blank'>
            <FaInstagram size={"1.5rem"} className=" cursor-pointer footer" />
          </a>
        </div>

        <div className="container flex flex-col pt-10 items-center ">
          <div className="text-xs md:text-sm w-full flex flex-col  items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="scale-110">&copy; 2024 Luxe Moto All Rights Reserved.</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <p className="text-sm scale-90 md:scale-95">
                Designed & Developed by
                <a href="https://wa.me/919496715606" className="text-blue ml-1" target="_blank" rel="noopener noreferrer">
                  <strong className="font-normal underline text-blue-400">Fayas</strong>
                </a> &
                <a href="https://wa.me/919037146943" className="text-blue ml-1" target="_blank" rel="noopener noreferrer">
                  <strong className="font-normal underline text-blue-400">Almas</strong>
                </a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
