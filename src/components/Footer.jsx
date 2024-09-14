import React, { useEffect } from "react";
import {
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import whiteLogo from '/images/logo-white.png'
import { ImFacebook2 } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {

  return (
    <footer className="w-full h-full bg-18392B text-borderColor pt-5 md:pt-10 footer-container">
      <div className="flex flex-col items-center w-fit mx-auto footer-content">
        <img src={whiteLogo} className="w-7 md:w-10 h-5 md:h-7 logo " alt=" Logo" />
        <span className="w-full font-semibold text-white font-babylon text-xs md:text-sm">Luxe Moto</span>
      </div>

      <div className="w-full px-5 py-6 flex flex-col items-center">
        <div className="max-w-7xl w-full footer-content grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base text-center md:text-left border-y-[0.1px] border-[#ffffff59] py-5 md:py-7 justify-center font-light">

          <div className="text-left">
            <h3 className="font-medium mb-3 ">VEHICLES</h3>
            <ul className="">
              <li className="text-[.6rem] md:text-xs md:p-2">Range</li>
              <li className="text-[.6rem] md:text-xs md:p-2">Configure your Car</li>
              <li className="text-[.6rem] md:text-xs md:p-2">Pre-owned</li>
              <li className="text-[.6rem] md:text-xs md:p-2">Recall information</li>
              <li className="text-[.6rem] md:text-xs md:p-2">Tech Info</li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="font-medium mb-3">COLLECTIONS</h3>
            <ul>
              <li className="text-[.6rem] md:text-xs md:p-2">Luxury Cars</li>
              <li className="text-[.6rem] md:text-xs md:p-2">Mini Cars</li>
              <li className="text-[.6rem] md:text-xs md:p-2">luxury bikes</li>
              <li className="text-[.6rem] md:text-xs md:p-2">mini bikes</li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="font-medium mb-3">ABOUT US</h3>
            <ul>
              <li className="text-[.6rem] md:text-xs md:p-2">Sustainability</li>
              <li className="text-[.6rem] md:text-xs md:p-2">Instagram</li>
              <li className="text-[.6rem] md:text-xs md:p-2">Join us</li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center mt-5 space-x-4 footer text-white">
          <a className="flex justify-center items-center" href="https://wa.me/917907962116" target='blank'>
            <FaWhatsapp size={"1.5rem"} className=" cursor-pointer footer" />
          </a>
          <a className="flex justify-center items-center" href="https://www.facebook.com/people/Luxe-Moto/61556341210047/" target='blank'>
            <ImFacebook2 size={"1.5rem"} className=" cursor-pointer footer" />
          </a>
          {/* <FaTwitter size={"1.5rem"} className=" cursor-pointer footer" /> */}
          <a className="flex justify-center items-center" href="https://www.youtube.com/channel/UCG2c97djf6d2yq8ONRlYXGQ/videos" target='blank'>
            <IoLogoYoutube size={"1.5rem"} className=" cursor-pointer footer" />
          </a>
          <a className="flex justify-center items-center" href="https://www.instagram.com/luxe_moto_/" target='blank'>
            <FaInstagram size={"1.5rem"} className=" cursor-pointer footer" />
          </a>
        </div>

        <div className="container flex flex-col pt-10 items-center px-4 md:px-8 font-josefin">
          <div className="w-full flex flex-col items-center text-[.6rem] md:text-[.7rem]">
            <div className="flex items-center space-x-2 text-center">
              <p className="scale-110 font-medium">
                &copy; 2024 &nbsp;
                <span className="">LUXE MOTO</span>
                &nbsp; All Rights Reserved.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 ">
              <p className="text-[.5rem] md:text-[.6rem] scale-90 md:scale-95 text-center font-medium">
                Designed & Developed by
                <a href="https://wa.me/919496715606" className="text-blue ml-1" target="_blank" rel="noopener noreferrer">
                  <strong className="font-normal text-green-300">Fayas</strong>
                </a> &
                <a href="https://wa.me/919037146943" className="text-blue ml-1" target="_blank" rel="noopener noreferrer">
                  <strong className="font-normal text-green-300">Almas</strong>
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
