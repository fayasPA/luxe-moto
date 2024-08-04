import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './style.css';
import { EffectCards } from 'swiper/modules';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ZoomSlider() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperEl = swiperRef.current;

    gsap.fromTo(swiperEl, 
      {
        width: 'calc(80vw - 400px)', // Initial width minus the margin on both sides
        height: 'calc(100vh - 400px)', // Initial height minus the margin on both sides
        margin: '200px',
        padding: '0',
      },
      {
        width: '100vw',
        height: '100vh',
        margin: '0',
        padding: '0',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: swiperEl,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          markers: true,
          onEnter: () => {
            gsap.to(swiperEl, {
              width: '100vw',
              height: '100vh',
              margin: '0',
              padding: '0',
              ease: 'power1.inOut',
            });
          },
          onLeave: () => {
            gsap.to(swiperEl, {
              width: 'calc(80vw - 400px)',
              height: 'calc(100vh - 400px)',
              margin: '200px',
              padding: '0',
              ease: 'power1.inOut',
            });
          },
          onEnterBack: () => {
            gsap.to(swiperEl, {
              width: '100vw',
              height: '100vh',
              margin: '0',
              padding: '0',
              ease: 'power1.inOut',
            });
          },
          onLeaveBack: () => {
            gsap.to(swiperEl, {
              width: 'calc(80vw - 400px)',
              height: 'calc(100vh - 400px)',
              margin: '200px',
              padding: '0',
              ease: 'power1.inOut',
            });
          },
        },
      }
    );
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <Swiper
        ref={swiperRef}
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
}
