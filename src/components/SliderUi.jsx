import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SliderUi.css'; // Ensure this file contains your CSS
import image1 from '/videos/del1.jpg';
import image2 from '/videos/del2.jpeg';
import image3 from '/videos/del3.jpeg';

gsap.registerPlugin(ScrollTrigger);

const SliderUi = () => {

  useEffect(() => {
    const palette = document.querySelector('.palette');

    // gsap.fromTo(palette, 
    //   { scale: .8 }, 
    //   {
    //     scale: 2.0,
    //     duration: 1.5,
    //     scrollTrigger: {
    //       trigger: palette,
    //       start: 'top 120%', // Start animation when the Swiper is 80% from the top of the viewport
    //       end: 'bottom top', // End animation when the bottom of Swiper is at the top of the viewport
    //       scrub: 1,        // Smooth scrubbing
    //     }
    //   }
    // );
  }, []);

  return (
    <div className="bg-green h-[100vh] w-full flex items-center justify-center ">
      <div className="palette">
        <div className="color overflow-hidden border-2 border-white" id="color1">
          <img src={image1} alt=""  className=' border-zinc' />
        </div>
        <div className="color overflow-hidden border-2 border-white" id="color2">
        <img src={image2} alt="" className=' border-zinc' />

        </div>
        <div className="color overflow-hidden border-2 border-white" id="color3">
        <img src={image3} alt=""  className=' border-zinc' />

        </div>
        <div className="color overflow-hidden border-2 border-white" id="color4">
        <img src={image1} alt=""  className=' border-zinc'/>

        </div>
        <div id="color-code">
          <div id="color-code-bg"></div>
          <div id="color-code-text"></div>
        </div>
      </div>
    </div>
  );
};

export default SliderUi;
