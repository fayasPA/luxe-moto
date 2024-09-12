import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import '../../assets/css/delivery-swiper.css'; // Importing custom styles
import { EffectCards } from 'swiper/modules';
import baseImg from '/images/logo-white.png'
import gsap from 'gsap'; // Importing GSAP for animations
import ScrollTrigger from 'gsap/ScrollTrigger'; // Importing ScrollTrigger plugin for scroll-based animations
import { axiosAPI } from '../../utils/axiosAPI';
import { BASE_IMAGE_URL, GET_LATEST_DELIVERY } from '../../utils/urls';

gsap.registerPlugin(ScrollTrigger);

export default function DeliverSwiperSlider() {
  const axiosInstance = axiosAPI();
  const swiperRef = useRef(null); // Creating a ref to access the Swiper component
  const [imgData, setImgData] = useState([]);
  const [deliveryloading, setDeliveryLoading] = useState(true);

  useEffect(() => {
    setDeliveryLoading(true)
    get_latest_deliveries();
  }, [])

  async function get_latest_deliveries() {
    try {
      const response = await axiosInstance.get(`${GET_LATEST_DELIVERY}`);
      if (response.status === 200 && response.data.images) {
        setImgData(response.data.images);
      }
    } catch (error) {
      console.log("---------API_ERROR", error);
    } finally {
      setDeliveryLoading(false)
    }
  }

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
    <div className="relative h-full w-full">
  <Swiper
    ref={swiperRef}
    effect={"cards"}
    grabCursor={true}
    modules={[EffectCards]}
    className="zoomSlider w-full h-full px-10 py-5 lg:px-24 lg:py-10"
  >
    {deliveryloading ? (
      [...Array(3)].map((_, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-full overflow-hidden rounded-3xl">
          <div className="animate-pulse w-full h-full overflow-hidden rounded-3xl bg-borderColor"></div>
          </div>
        </SwiperSlide>
      ))
    ) : imgData.length > 0 ? (
      imgData.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-full overflow-hidden rounded-3xl">
            <img
              src={`${BASE_IMAGE_URL}/${img.path}`}
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
        </SwiperSlide>
      ))
    ) : (
      <SwiperSlide className='blur-md border border-borderColor rounded-lg px-5'>
        <div className='h-40 md:h-96 w-screen overflow-hidden rounded-lg flex justify-center items-center'>
              <div className='h-full w-full flex justify-center items-center'>
              <img
                src={baseImg}
                alt="Main Car"
                className='h-8 md:h-10 w-10 md:w-12 object-contain'
              />
              </div>
            </div>
      </SwiperSlide>
    )}
  </Swiper>
</div>

  );
}
