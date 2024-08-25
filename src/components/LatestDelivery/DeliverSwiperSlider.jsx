import React, { useEffect, useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import '../../assets/css/delivery-swiper.css'; // Importing custom styles
import { EffectCards } from 'swiper/modules';
import image1 from '/videos/del1.jpg';
import image2 from '/videos/del2.jpeg';
import image3 from '/videos/del3.jpeg';
import gsap from 'gsap'; // Importing GSAP for animations
import ScrollTrigger from 'gsap/ScrollTrigger'; // Importing ScrollTrigger plugin for scroll-based animations

gsap.registerPlugin(ScrollTrigger);

export default function DeliverSwiperSlider() {
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
          start: 'top 95%', // Start animation when the Swiper is 80% from the top of the viewport
          end: 'center 50%', // End animation when the bottom of Swiper is at the top of the viewport
          scrub: 1, // Smooth animation on scroll with more consistent scrubbing
        },
      }
    );
  }, []);

  return (
    <div className='relative h-full w-full' >
      <Swiper
        ref={swiperRef} // Attach ref to the Swiper component
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="zoomSlider w-full h-full px-10 py-5 lg:px-24 lg:py-10"
      >
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
      </Swiper>
    </div>
  );
}
