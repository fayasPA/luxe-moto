import React, { useEffect } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <footer className="w-full bg-black text-white py-12 footer-container pl-24">
      <div className="w-full px-4">
        <div className="footer-content grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-center md:text-left">


          {/* Column 2 */}
          <div>
            <h3 className="font-semibold mb-4 ">SPORTS CARS</h3>
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

          {/* Column 3 */}
          <div>
            <h3 className="font-bold mb-4">COLLECTIONS</h3>
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

          {/* Column 4 */}
          <div>
            <h3 className="font-bold mb-4">EXPERIENCES</h3>
            <ul>
              <li className="text-xs p-2">Corse Clienti</li>
              <li className="text-xs p-2">Ferrari Esports Series</li>
              <li className="text-xs p-2">Ristorante Cavallino</li>
              <li className="text-xs p-2">Ferrari Museums</li>
              <li className="text-xs p-2">Ferrari World Abu Dhabi</li>
              <li className="text-xs p-2">Ferrari Land Barcelona</li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="font-bold mb-4">ABOUT US</h3>
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
        <div className="flex justify-center space-x-20 mt-8 pr-28">
          <a href="#" className="hover:text-sky-600">
            <FaFacebook className="w-6 h-6 ml-7" /> <span className="text-sm">FACEBOOK</span>
          </a>
          <a href="#" className="hover:text-pink-500 ">
            <FaInstagram className="w-6 h-6 ml-7" /> <span className="text-sm">INSTAGRAM</span>
          </a>
          <a href="#" className="hover:text-violet-700">
            <FaLinkedin className="w-6 h-6 ml-5" /> <span className="text-sm">LINKEDIN</span>
          </a>
          <a href="#" className="hover:text-red">
            <FaTiktok className="w-6 h-6 ml-3" /> <span className="text-sm">TIKTOK</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
