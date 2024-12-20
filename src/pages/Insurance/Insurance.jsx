import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/all";
import ins1 from "/images/ins1.jpeg";
import ins2 from "/images/ins2.png";
import ins3 from "/images/ins3.png";
import ins4 from "/images/ins4.png";
import ins5 from "/images/ins5.png";
import '../../assets/css/insurance.css'
import carousalImg1 from '/images/ins_carousal1.jpg';
import carousalImg2 from '/images/ins_carousal2.jpg';
import carousalImg3 from '/images/ins_carousal3.png';
gsap.registerPlugin(ScrollTrigger);

const Insurance = () => {
  const panelsRef = useRef([]);
  const tl = useRef(null);
  const images = [
    ins1, ins2, ins3, ins4, ins5
  ];
  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo(
      ".content-text",
      {
        y: 0,
        borderRadius: "0%",
        yoyo: false,
        rotation: 0,
        opacity: 0,
      },
      {
        y: 0,
        repeat: 0,
        delay: 1,
        yoyo: false,
        rotation: 0,
        borderRadius: "0%",
        duration: 1,
        ease: "none",
        stagger: 0.3,
        opacity: 1,
        scrollTrigger: {
          trigger: ".content-gsap-trigger",
          toggleActions: "play none none none ",
          once: true,
           
        },
      }
    );

    gsap.to(".about-section", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top center",
        end: "bottom center",
        scrub: true,
         
      },
      opacity: 1,
      y: 0,
      duration: 1
    });

  }, []);

  useEffect(() => {
    const panels = panelsRef.current;

    tl.current = gsap.timeline({ repeat: -1 });

    panels.forEach((panel, index) => {
      tl.current
        .to(panel, { display: 'block', autoAlpha: 1, duration: 2 })
        .to(panel, { display: 'none', autoAlpha: 0, duration: 1, delay: 3 });
    });

    return () => {
      if (tl.current) {
        tl.current.kill();
      }
    };
  }, []);


  return (
    <div className="h-auto about-section">


      <header
        className="pb-4 md:pb-8 insurance-header h-36 md:h-64 bg-green-body text-2xl font-bold flex flex-col justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: "url(/assets/images/insurance/insurance_header.jpg)"
        }}
      >
        <div className="h-full w-full bg-opacity-50 flex flex-col justify-end items-center ">
          <span className="text-xs md:text-base lg:text-xl text-borderColor">SOLUTIONS FOR EVERYTHING THAT YOUR CAR NEEDS</span>
        </div>
      </header>

      <div className="flex-1 bg-white h-full w-full px-5 py-10">

        <div className="text-sm md:text-base flex flex-col text-center text-black justify-start content-gsap-trigger">
          <p className="font-light ">BUYING CAR INSURANCE FROM</p>
          <p className="font-light  content-text">
            <strong className="text-green-body font-bold text-lg md:text-xl">LUXE MOTO</strong> IS SIMPLE
          </p>
        </div>


        <div className="text-black my-10 grid grid-cols-2 md:grid-cols-5 gap-4 h-auto md:h-32">
          {images.map((src, index) => (
            <div key={index} className="bg-cover h-20 md:h-full w-auto group rounded-xl bg-center mb-2 md:mb-0 overflow-hidden mx-auto">
              <img
                src={src}
                alt={`showroom_image${index}`}
                className='h-[100%] w-full md:w-auto'
              />
            </div>
          ))}
        </div>

        <div className="text-black flex justify-center pb-5">
          <div className="flex flex-col items-center justify-center p-6 rounded-lg ">
            <h2 className="text-xs md:text-sm font-semibold text-gray-500">LUXE MOTO</h2>
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">ADVANTAGE</h1>
            <div className="flex items-center rounded-full shadow-[#979494] shadow-md p-2 px-4 space-x-4">
              <span className="text-xs md:text-sm font-medium text-gray-800">SIMPLE</span>
              <span className="text-xs md:text-sm font-medium text-gray-800">●</span>
              <span className="text-xs md:text-sm font-medium text-gray-800 text-center">EASY CLAIM</span>
              <span className="text-xs md:text-sm font-medium text-gray-800">●</span>
              <span className="text-xs md:text-sm font-medium text-gray-800">AFFORDABLE</span>
            </div>
          </div>
        </div>

        <div className="carousel-container flex flex-col items-center">
          <div className="carousel-panel" ref={(el) => panelsRef.current[0] = el} style={{ display: 'none', opacity: 0 }}>
            <div className="flex justify-center items-center h-auto bg-gray-50">
              <div className="max-w-4xl p-6 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center md:flex-row">
                  <div className="w-full md:w-1/2 flex justify-center">
                    <img
                      src={carousalImg1}
                      alt="Easy Claim Settlements"
                      className="object-contain"
                    />
                  </div>
                  <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6 text-center md:text-left">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      EASY CLAIM SETTLEMENTS
                    </h2>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                      RAPID, HASSLE FREE CLAIMS
                    </h1>
                    <p className="text-gray-600 mb-4">
                      It's time-saving, you will find yourself in a comfortable zone towards your car insurance purchase without any commotion.
                    </p>
                    <ul className="text-gray-700">
                      <li className="mb-2">
                        <span className="font-bold">✔</span> 24/7 Customer Service Helpline from Insurer
                      </li>
                      <li className="mb-2">
                        <span className="font-bold">✔</span> Hassle free Inspection
                      </li>
                      <li className="mb-2">
                        <span className="font-bold">✔</span> Instant Claim Assistance and SMS updates
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-panel" ref={(el) => panelsRef.current[1] = el} style={{ display: 'none', opacity: 0 }}>
            <div className="flex justify-center items-center h-auto bg-gray-50">
              <div className="max-w-4xl p-6 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center md:flex-row">
                  <div className="w-full md:w-1/2 flex justify-center">
                    <img
                      src={carousalImg2}
                      alt="Easy Claim Settlements"
                      className="object-contain"
                    />
                  </div>
                  <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6 text-center md:text-left">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      AFFORDABLE
                    </h2>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                      BUY CHEAP, ADD VALUE
                    </h1>
                    <p className="text-gray-600 mb-4">
                      It's time-saving, you will find yourself in a comfortable zone towards your car insurance purchase without any commotion.
                    </p>
                    <ul className="text-gray-700">
                      <li className="mb-2">
                        <span className="font-bold">✔</span> Discount offers for long term buyers
                      </li>
                      <li className="mb-2">
                        <span className="font-bold">✔</span> Budget savers that adds value
                      </li>
                      <li className="mb-2">
                        <span className="font-bold">✔</span> Instant Claim Assistance and SMS updates
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-panel" ref={(el) => panelsRef.current[2] = el} style={{ display: 'none', opacity: 0 }}>
            <div className="flex justify-center items-center h-auto bg-gray-50">
              <div className="max-w-4xl p-6 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center md:flex-row">
                  <div className="w-full md:w-1/2 flex justify-center">
                    <img
                      src={carousalImg3}
                      alt="Easy Claim Settlements"
                      className="object-contain"
                    />
                  </div>
                  <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6 text-center md:text-left">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      SIMPLE
                    </h2>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                      FLEXIBLE WAYS TO GET INSURE
                    </h1>
                    <p className="text-gray-600 mb-4">
                      We give you the most adaptable ways to select one of the various options available to get your car insurance done.
                    </p>
                    <ul className="text-gray-700">
                      <li className="mb-2">
                        <span className="font-bold">✔</span> Multiple Insurance Options Available
                      </li>
                      <li className="mb-2">
                        <span className="font-bold">✔</span> Periodical Evaluation Options
                      </li>
                      <li className="mb-2">
                        <span className="font-bold">✔</span> Comprehensive Cover for better Insurance Coverage
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Insurance;
