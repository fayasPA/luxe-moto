import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../assets/css/BannerCarousel.css';
import { Pagination, Navigation } from 'swiper/modules';
import { bannerVideo } from '../constants/constants';
import { getNumberToCurrencyText } from '../utils/helperFunctions';
import { FaChevronRight } from 'react-icons/fa';
import gsap from 'gsap';
import { BASE_IMAGE_URL, GET_BANNER_VEHICLES } from '../utils/urls';
import { axiosAPI } from '../utils/axiosAPI';
import { NavLink } from 'react-router-dom';

const BannerCarousel = () => {
  const axiosInstance = axiosAPI();
  const videoRef = useRef(null);
  const swiperRef = useRef(null);
  const slideTimeoutRef = useRef(null);
  const comp = useRef(null);
  const [bannerData, setBannerData] = useState([]);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false); // Track if the video is ready

  useEffect(() => {
    get_banner_data();
  }, []);

  async function get_banner_data() {
    try {
      const response = await axiosInstance.get(GET_BANNER_VEHICLES);
      if (response.status === 200 && response.data.carDetails) {
        setBannerData(response.data.carDetails);
      }
    } catch (error) {
      console.log("---------BANNER_ERROR", error);
    }
  }

  useLayoutEffect(() => {
    if (bannerData.length > 0) {
      let ctx = gsap.context(() => {
        const t1 = gsap.timeline().pause();
        t1.from(".content-text", {
          opacity: 0,
          y: "+=50",
          // stagger: 0.2,
          duration: 1.5,
        });

        swiperRef.current?.on('slideChangeTransitionStart', function () {
          const activeIndex = swiperRef.current.activeIndex;
          if (activeIndex !== 0) {
            t1.restart();
          }
        });
      }, comp);

      return () => ctx.revert();
    }
  }, [bannerData]);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      if (video) {
        setIsVideoReady(true);
        video.currentTime = 19; // Start from 19 seconds
        video.play();
        const remainingTime = video.duration - 19;
        setVideoDuration(remainingTime);
      }
    };

    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        if (video) {
          video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
        clearTimeout(slideTimeoutRef.current);
      };
    }
  }, []);

  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.activeIndex;

    if (activeIndex === 0 || swiper.realIndex === 0) {
      if (videoRef.current && isVideoReady) {
        videoRef.current.currentTime = 19; // Ensure video starts from 19 seconds
        videoRef.current.play();

        // Clear previous timeout and set new one based on video duration
        clearTimeout(slideTimeoutRef.current);
        slideTimeoutRef.current = setTimeout(() => {
          swiperRef.current?.slideNext();
        }, videoDuration * 1000); // Convert to milliseconds
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }

      // Clear any previous timeout
      clearTimeout(slideTimeoutRef.current);

      // Set the timeout to show non-video slides for 3 seconds
      slideTimeoutRef.current = setTimeout(() => {
        swiperRef.current?.slideNext();
      }, 3000); // 3 seconds for non-video slides
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnded = () => {
      if (swiperRef.current) {
        swiperRef.current.slideNext(); // Move to the next slide when the video ends
      }
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnded);

      return () => {
        if (video) {
          video.removeEventListener('ended', handleVideoEnded);
        }
        clearTimeout(slideTimeoutRef.current);
      };
    }
  }, []);


  return (
    <div className='w-full h-[80vh] md:h-screen relative' ref={comp}>
      <Swiper
        style={{
          '--swiper-navigation-color': "black",
          '--swiper-navigation-size': ".8rem",
        }}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={`w-full h-full`}
        onSlideChange={handleSlideChange}
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

        {bannerData.map((banner, i) => (
          <SwiperSlide key={i}>
            <div className='h-full w-full flex relative'>
              <div className='w-1/2 h-full bg-18392B'></div>
              <div className='flex flex-1 h-full bg-white'>
                <div className='w-[20%] md:w-[12%] h-full shadow-xl shadow-black bg-green-body/30' style={{ boxShadow: '10px 0 5px -5px rgba(0, 0, 0, 0.2)' }}>
                </div>
                <div className='w-[20%] md:w-[12%] h-full shadow-xl shadow-black bg-green-body/20' style={{ boxShadow: '10px 0 10px -5px rgba(0, 0, 0, 0.3)' }}>
                </div>
              </div>
              <div className='absolute h-full w-full md:flex'>
                <div className='h-1/2 md:h-full w-full md:w-1/2 flex justify-end items-center'>
                  <img
                    className="pt-24 md:pt-0 h-fit w-full object-contain"
                    src={`${BASE_IMAGE_URL}${banner.bannerImage}`} alt={banner.model}
                  />
                </div>
                <div className='text-black h-1/2 sm:h-auto md:h-full w-full md:w-1/2'>
                  <div className="h-full flex items-center justify-end sm:justify-center md:items-center pt-10 sm:pt-0 md:pt-0">
                    <div className="pr-5 sm:pr-5 md:pr-0">
                      <h2 className="text-sm md:text-2xl lg:text-4xl font-bold mb-2 content-text">{banner.brand}</h2>
                      <div className="flex items-end mb-4">
                        <span className="text-md sm:text-lg md:text-3xl font-semibold font-josefin text-red-500 mr-2 content-text">
                          {getNumberToCurrencyText(banner.price)}
                        </span>
                      </div>
                      <div className='content-text w-full'>
                        <NavLink to={`/vehicles/${banner.id}`}
                          className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r bg-green-900 relative hover:bg-gradient-to-r  text-white transition-all ease-out duration-300"
                        >
                          <span
                            className="absolute right-0 w-24 sm:w-32 md:w-44 h-full top-0 transition-all duration-1000 transform translate-x-8 sm:translate-x-12 bg-white opacity-20 -skew-x-12 group-hover:-translate-x-36 ease pointer-events-none"
                          ></span>
                          <span className="relative text-xs sm:text-base md:text-xl font-normal">Know More</span>
                          <FaChevronRight className='flex self-center' />
                        </NavLink>
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
