import React, { useRef, useEffect, useLayoutEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../assets/css/BannerCarousel.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { bannerVideo, hightPlainsSlides } from '../constants/constants';
import bgRemove from '/videos/bg_remove.png'
import { getNumberToCurrencyText } from '../utils/helperFunctions';
import { FaChevronRight } from 'react-icons/fa';
import gsap from 'gsap';

const BannerCarousel = () => {
  const videoRef = useRef(null);
  const swiperRef = useRef(null);
  const slideTimeoutRef = useRef(null);
  const comp = useRef(null)

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Initially create a timeline but pause it
      const t1 = gsap.timeline().pause();
      t1.from(".content-text", {
        opacity: 0,
        y: "+=30",
        stagger: 0.2,
        duration: 1,
      });
         swiperRef.current?.on('slideChangeTransitionStart', function () {
        const activeIndex = swiperRef.current.activeIndex;
        console.log("activeIndex", activeIndex)
        // Adjust the index as per the specific slide you want the animation for
        if (activeIndex != 0) { // Change '0' to the index of the slide you want to animate
          t1.restart(); // Restart the animation
        }
      })
    }, comp)

    return () => ctx.revert()
  }, [])

  const handleSlideChange = (swiper) => {
    if (swiper.activeIndex === 0 || swiper.realIndex === 0) {
      videoRef.current.currentTime = 19; // Reset the video to the start
      videoRef.current.play(); // Play the video
    } else {
      videoRef.current.pause();
      clearTimeout(slideTimeoutRef.current); // Clear any existing timeout
    }
  };

  const handleVideoEnded = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // Move to the next slide when the video ends
    }
  };

  const handleSlideChangeTransitionEnd = () => {
    if (swiperRef.current && swiperRef.current.activeIndex !== 0) {
      // Set a timeout to show non-video slides for 4 seconds
      slideTimeoutRef.current = setTimeout(() => {
        swiperRef.current.slideNext();
      }, 4000);
    }
  };

  useEffect(() => {
    // Attach event listener for video ended
    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleVideoEnded);
    }

    return () => {
      // Clean up event listener on unmount
      if (video) {
        video.removeEventListener('ended', handleVideoEnded);
      }
      clearTimeout(slideTimeoutRef.current);
    };
  }, []);

  return (
    <div className='w-full h-screen' ref={comp}>
      <Swiper
        style={{
          '--swiper-navigation-color': "black",
          '--swiper-navigation-size': ".8rem",
        }}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={pagination}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={`w-full h-full`}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide>
          <div className='w-full h-full overflow-hidden'>
            <video
              ref={videoRef}
              id="carousel-video"
              playsInline={true}
              className="w-full h-full object-cover"
              preload="auto"
              muted
            >
              <source src={bannerVideo} type="video/mp4" />
            </video>
          </div>
        </SwiperSlide>

        {hightPlainsSlides.map((slide, i) => (
          <SwiperSlide key={i} >
            <div className='h-full w-full flex relative'>
              <div className='w-1/3 h-full bg-green'></div>
              <div className='flex-1 h-full bg-black'></div>
              <div className='absolute h-full w-full md:flex'>
                <div className='h-1/2 md:h-full w-full md:w-1/2 flex justify-end items-center'>
                  <img
                    className="h-fit w-[45rem] object-contain overflow-hidden"
                    src={bgRemove}
                    alt={`Slide 1`}
                  />
                </div>
                <div className='text-white h-1/2 md:h-full w-full md:w-1/2'>
                  <div className="h-full flex items-start md:items-center justify-end md:justify-center pt-10 md:pt-0">
                    <div className="pr-10 md:pr-0">
                      <h2 className="text-xl md:text-4xl font-bold mb-2 content-text">Mercedes Benz</h2>
                      <div className="flex items-end mb-4">
                        <span className="text-lg md:text-3xl font-semibold text-red-500 mr-2 content-text">{getNumberToCurrencyText(7500000)}</span>
                      </div>


                      <div className='content-text w-full '>
                        <button
                          className="flex gap-2 px-6 py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r from-gray-700 to-black relative hover:bg-gradient-to-r hover:from-green hover:to-green-300 text-white transition-all ease-out duration-300"
                        >
                          <span
                            className="absolute right-0 w-32 md:w-44 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"
                          ></span>
                          <span className="relative text-base md:text-xl font-semibold">Know More</span>
                          <FaChevronRight className='flex self-center' />
                        </button>


                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  );
}

export default BannerCarousel;
