import React, { useEffect, useLayoutEffect } from 'react'
import BannerCarousel from '../../components/BannerCarousel'
import InfoVideo from '../../components/InfoVideo';
import ImageShowcase from '../../components/ImageShowcase';
import InfoVideoHeader from '../../components/InfoVideoHeader';
import LatestDeliveries from '../../components/LatestDelivery/LatestDeliveries';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Home = () => {
  // useLayoutEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   // Target all elements with the class 'animate-container'
  //   gsap.utils.toArray('.header-animate-container').forEach((container) => {
  //     const text = container.querySelector('h2'); // Select the <p> tag within this container
  //     if (text) {
  //       gsap.fromTo(
  //         text,
  //         {
  //           y: 150,      // Start 50px below its natural position
  //           opacity: 0, // Start fully transparent
  //         },
  //         {
  //           y: 0,       // End at its natural position
  //           opacity: 1, // End fully visible
  //           // duration: 1.5,
  //           ease: "power2.out",
  //           scrollTrigger: {
  //             trigger: container,
  //             start: "top 75%", // Start animation when the div reaches the center of the viewport
  //             end: "top 20%",
  //             toggleActions: "play none none none",
  //              
  //             scrub: true
  //           },
  //         }
  //       );
  //     }
  //   });
  // }, []);
  return (
    <section className=' w-full text-white'>
      <BannerCarousel />
      <InfoVideoHeader />
      <InfoVideo />
      <LatestDeliveries />
      <ImageShowcase />
    </section>
  )
}

export default Home