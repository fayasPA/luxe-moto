import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaBuilding, FaUsers, FaSmile, FaThumbsUp } from "react-icons/fa";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const comp = useRef(null)

  const statsRef = useRef([]);

  useLayoutEffect(() => {
    window.scrollTo(0,0)
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline()
      t1.from(".page-header", {
        opacity: 0,
        duration: 1,
      })
        .from([".content-text"], {
          opacity: 0,
          y: "+=30",
          stagger: 0.3,
        })
      // .from(statsRef.current, {
      //   xPercent: "-100",
      //   duration: 1.3,
      //   delay: 0.3,
      //   ease: 'circ.out',
      //   stagger: 0.2
      // })
      // .to([".content-text"], {
      //   opacity: 0,
      //   y: "-=30",
      //   delay: 0.3,
      //   stagger: 0.5,
      // })
      // .to("#intro-slider", {
      //   xPercent: "-100",
      //   duration: 1.3,
      // })
    }, comp)

    return () => ctx.revert()
  }, [])

  const timelineData = [
    {
      year: '2009',
      title: 'ARRIVAL OF THE WAVEMAKER',
      description: 'Came into being in the year 2009 in the heart of South Delhi.',
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
    <div className='pt-28' ref={comp}>
      <div className='w-full flex justify-center items-center h-[20%]'>
        <div className='w-fit'>
          <h2 className="text-2xl md:text-3xl font-extrabold page-header">ABOUT US</h2>
        </div>
      </div>

      <div className="timeline p-8 ">
        <h2 className="text-xl md:text-2xl font-bold mb-5 md:mb-8 content-text">Luxe Moto, a pre-owned luxury car dealer deals with many brands</h2>
        <p className="text-base md:text-lg text-gray-600 mb-4 content-text">Luxe Moto started in 2009 as a benchmark model for the Pre-Used, or how we prefer to see it as, Pre-Loved Car Brand. The mission was simple, direct and drove effect - delivering a new dimension of luxury while standardising & raising platforms for the used car market in India.</p>
        <p className="text-base md:text-lg text-gray-600  content-text">Since our inception our primary aim has been our passion for delivering excellence which became our mission. YOU (our patrons) are the driving force behind our company and making sure you get the best is what we thrive on.</p>
      </div>
      <div className="timeline p-8">
        <h2 className="text-2xl font-bold mb-5 md:mb-8 content-text">MISSION</h2>
        <p className="text-base md:text-lg text-gray-600 mb-5 md:mb-8 content-text">Luxe Moto started in 2009 as a benchmark model for the Pre-Used, or how we prefer to see it as, Pre-Loved Car Brand. The mission was simple, direct and drove effect - delivering a new dimension of luxury while standardising & raising platforms for the used car market in India.</p>
      </div>
      <div className="timeline p-8">
        <div className="text-black py-10 px-5 md:px-20">
          <div className="content-text max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center text-white">
            <div ref={(el) => (statsRef.current[0] = el)} className="text-black flex flex-col items-center space-y-2">
              <FaBuilding className="text-4xl text-green-200" />
              <h3 className="text-lg font-medium">COMPANY FOUNDED</h3>
              <p className="text-2xl font-bold">2022</p>
            </div>
            <div ref={(el) => (statsRef.current[1] = el)} className="text-black flex flex-col items-center space-y-2">
              <FaUsers className="text-4xl text-green-200" />
              <h3 className="text-lg font-medium">EMPLOYEES</h3>
              <p className="text-2xl font-bold">10+</p>
            </div>
            <div ref={(el) => (statsRef.current[2] = el)} className="text-black flex flex-col items-center space-y-2">
              <FaSmile className="text-4xl text-green-200" />
              <h3 className="text-lg font-medium">HAPPY CUSTOMERS</h3>
              <p className="text-2xl font-bold">1K+</p>
            </div>
            <div ref={(el) => (statsRef.current[3] = el)} className="text-black flex flex-col items-center space-y-2">
              <FaThumbsUp className="text-4xl text-green-200" />
              <h3 className="text-lg font-medium">SATISFACTION RATE</h3>
              <p className="text-2xl font-bold">99.99%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;