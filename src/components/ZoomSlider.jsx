import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Importing Swiper's CSS
import 'swiper/css/effect-cards'; // Importing Swiper's effect cards CSS
import './style.css'; // Importing custom styles
import { EffectCards } from 'swiper/modules'; // Importing Swiper's cards effect module
import gsap from 'gsap'; // Importing GSAP for animations
import image1 from '/videos/del1.jpg';
import image2 from '/videos/del2.jpeg';
import image3 from '/videos/del3.jpeg';
import ScrollTrigger from 'gsap/ScrollTrigger'; // Importing ScrollTrigger plugin for scroll-based animations

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function ZoomSlider() {
  const swiperRef = useRef(null); // Creating a ref to access the Swiper component

  useEffect(() => {
    const swiperEl = swiperRef.current; // Accessing the Swiper component

    // GSAP animation: Zooms in and out the Swiper component on scroll
    gsap.fromTo(
      swiperEl,
      {
        // Initial scale (zoomed out)
        scale: 0.6,
      },
      {
        // Target scale (zoomed in)
        scale: 1,
        ease: 'power3.inOut', // Smoother easing function
        duration: 1.5, // Duration for smoother transition
        scrollTrigger: {
          trigger: swiperEl, // Element to trigger the animation
          start: 'top 120%', // Start animation when the Swiper is 80% from the top of the viewport
          end: 'center top', // End animation when the bottom of Swiper is at the top of the viewport
          scrub: 1, // Smooth animation on scroll with more consistent scrubbing
          // Uncomment below line to visualize the ScrollTrigger markers
          // markers: true, 
        },
      }
    );
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      {/* Swiper component with card effect */}
      <Swiper
        ref={swiperRef} // Attach ref to the Swiper component
        effect={'cards'} // Use the cards effect for Swiper slides
        grabCursor={true} // Show grab cursor on hover
        modules={[EffectCards]} // Load the cards effect module
        className="mySwiper" // Custom class for styling
      >
        {/* Swiper slides */}
        <SwiperSlide>
          <div className='w-full h-full overflow-hidden bg-red'>
          <img src={image1} alt="" className='object-cover h-full w-full' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='w-full h-full overflow-hidden bg-red'>
          <img src={image2} alt="" className='object-cover h-full w-full' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='w-full h-full overflow-hidden bg-red'>
          <img src={image3} alt="" className='object-cover h-full w-full' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='w-full h-full overflow-hidden bg-red'>
          <img src={image1} alt="" className='object-cover h-full w-full' />
          </div>
        </SwiperSlide>
        {/* <SwiperSlide><img src={image1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={image2} alt="" /></SwiperSlide>
        <SwiperSlide><img src={image3} alt="" /></SwiperSlide>
        <SwiperSlide><img src={image1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={image2} alt="" /></SwiperSlide>
        <SwiperSlide><img src={image3} alt="" /></SwiperSlide>
        <SwiperSlide><img src={image1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={image2} alt="" /></SwiperSlide> */}


      </Swiper>
    </div>
  );
}
