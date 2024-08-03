import React, { useRef, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../assets/css/swiper.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { bannerVideo, hightPlainsSlides } from '../constants/constants';

const BannerCarousel = () => {
  const videoRef = useRef(null);
  const swiperRef = useRef(null);
  const slideTimeoutRef = useRef(null);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  const handleSlideChange = (swiper) => {
    if (swiper.activeIndex === 0 || swiper.realIndex === 0) {
      videoRef.current.currentTime = 0; // Reset the video to the start
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
    <div className='w-full h-full'>
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
        className={`w-full h-full z-0`}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
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
         <SwiperSlide key={i}>
         <div className="h-full w-full relative mx-auto bg-white bg-opacity-20 bg-cover bg-center overflow-hidden">
           <img
             className="absolute h-full w-full object-cover"
             src={slide.image}
             alt={`Slide ${i + 1}`}
           />
           <div className="absolute bottom-0  text-white lg:w-1/2">
             <div className="h-full flex flex-col items-start justify-center md:ml-36 p-2 md:p-10 lg:p-12">
               <p className=" font-light">{slide.variant}</p>
               <h2 className="text-xl md:text-4xl font-bold">{slide.text}</h2>
               <a
                 href={slide.linkUrl}
                 className="mt-2 md:mt-6 inline-block rounded-xl border-2 px-10 py-3 font-semibold text-xs md:text-2xl border-green-300 hover:bg-white hover:text-blue-600"
               >
                 Read Now
               </a>
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
