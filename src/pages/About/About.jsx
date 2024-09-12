import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaBuilding, FaUsers, FaSmile, FaThumbsUp } from "react-icons/fa";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MapComponent from '../../components/MapComponent';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const comp = useRef(null)

  const statsRef = useRef([]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline()
      t1.from([".content-text"], {
        opacity: 0,
        y: "+=30",
        stagger: 0.3,
      })
    }, comp)

    return () => ctx.revert()
  }, [])

  const timelineData = [
    {
      year: '2022',
      title: 'ARRIVAL OF THE WAVEMAKER',
      description: 'Came into being in the year 2022 in the heart of South Delhi.',
    },
    {
      year: '2010-11',
      title: 'EXTENDING SPREE',
      description: 'Spreading its roots and tentacles all over India.',
    },
    {
      year: '2012',
      title: 'NUMBERS GAME',
      description: 'Staunch increase in the number of patrons despite an evident slowdown in the Indian Economy...',
    },
    // Add more entries as needed
  ];

  return (
    <div className='pt-20 md:pt-28' ref={comp}>
      <div className='px-8 w-full flex justify-center items-center h-[20%]'>
        <div className='w-fit'>
          <h2 className="text-base md:text-lg lg:text-xl text-borderColor page-header">ABOUT US</h2>
        </div>
      </div>

      <div className="timeline p-8 text-borderColor">
        <p className="text-xs md:text-sm lg:text-base font-extralight mb-5 md:mb-8 content-text text-borderColor2/70">
          <span className='text-white'>LUXE MOTO</span>, a pre-owned luxury and mini car dealer deals with many brands.
        </p>
        <p className="text-xs md:text-sm lg:text-base mb-4 content-text">
          <span className="font-babylon text-borderColor2">LUXE MOTO</span>&nbsp; started in 2022 as a benchmark model for the Pre-Used, or how we prefer to see it as, Pre-Loved Car Brand. The mission was simple, direct and drove effect - delivering a new dimension of luxury while standardising & raising platforms for the used car market in India.
        </p>

        <p className="text-xs md:text-sm lg:text-base  content-text">Since our inception our primary aim has been our passion for delivering excellence which became our mission. YOU (our patrons) are the driving force behind our company and making sure you get the best is what we thrive on.</p>
      </div>
      <div className="timeline px-8">
        <h2 className="text-lg md:text-xl lg:text-2xl font-extralight content-text text-borderColor2">MISSION</h2>
        <p className="text-xs md:text-sm lg:text-base content-text text-borderColor"><span className="font-babylon text-borderColor2">LUXE MOTO</span>&nbsp; started in 2022 as a benchmark model for the Pre-Used, or how we prefer to see it as, Pre-Loved Car Brand. The mission was simple, direct and drove effect - delivering a new dimension of luxury while standardising & raising platforms for the used car market in India.</p>
      </div>
      <div className="timeline p-8">
        <div className="text-borderColor2 py-10 px-5 md:px-20">
          <div className="content-text max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            <div ref={(el) => (statsRef.current[0] = el)} className=" flex flex-col items-center space-y-2">
              <FaBuilding className="text-4xl " />
              <h3 className="text-xs md:text-sm lg:text-base font-extralight">COMPANY FOUNDED</h3>
              <p className="text-2xl text-white font-medium font-josefin">2022</p>
            </div>
            <div ref={(el) => (statsRef.current[1] = el)} className=" flex flex-col items-center space-y-2">
              <FaUsers className="text-4xl " />
              <h3 className="text-xs md:text-sm lg:text-base font-extralight">EMPLOYEES</h3>
              <p className="text-2xl text-white font-medium font-josefin">10+</p>
            </div>
            <div ref={(el) => (statsRef.current[2] = el)} className=" flex flex-col items-center space-y-2">
              <FaSmile className="text-4xl " />
              <h3 className="text-xs md:text-sm lg:text-base font-extralight">HAPPY CUSTOMERS</h3>
              <p className="text-2xl text-white font-medium font-josefin">1K+</p>
            </div>
            <div ref={(el) => (statsRef.current[3] = el)} className=" flex flex-col items-center space-y-2">
              <FaThumbsUp className="text-4xl " />
              <h3 className="text-xs md:text-sm lg:text-base font-extralight">SATISFACTION RATE</h3>
              <p className="text-2xl text-white font-medium font-josefin">99.99%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-text bg-white w-full h-96 py-5">
        <MapComponent />
      </div>
    </div>
  );
};

export default About;