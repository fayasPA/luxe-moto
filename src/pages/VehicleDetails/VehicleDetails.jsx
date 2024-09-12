import React, { useState, useEffect } from 'react';
import { axiosAPI } from '../../utils/axiosAPI';
import { useParams } from 'react-router-dom';
import { BASE_IMAGE_URL, GET_VEHICLE_DETAILS } from '../../utils/urls';
import { capitalizeFirstLetters, getNumberToCurrencyText } from '../../utils/helperFunctions';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '../../assets/css/VehicleDetailsCarousal.css'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Modal from './Modal';
import sampleBg from '/images/logo-white.png'
import { TbPhoneCall } from 'react-icons/tb';
import useLocomotiveScroll from '../../utils/useLocomotiveScrollToTop';

const VehicleDetails = () => {
  const scrollRef = useLocomotiveScroll();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [bgImage, setBgImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const axiosInstance = axiosAPI();
  const { carId } = useParams();
  const phoneNumber = "+917907962116"

  useEffect(() => {
    get_vehicle_details();
  }, []);

  async function get_vehicle_details() {
    try {
      const response = await axiosInstance.get(`${GET_VEHICLE_DETAILS}/${carId}`);
      if (response.status === 200) {
        setData(response.data.vehicle);
        if (response.data.vehicle.images.length > 0) {
          setImages(response.data.vehicle.images);
          setSelectedImage(`${BASE_IMAGE_URL}${response.data.vehicle.images[0].path}`)
          setBgImage(`${BASE_IMAGE_URL}${response.data.vehicle.images[0].path}`)

        }
      }
    } catch (error) {
      console.log("---------BANNER_ERROR", error);
    }
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='relative h-full md:p-24 pt-32 md:pt-32' ref={scrollRef}>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center blur-lg opacity-20'

      ></div>

      {/* Overlay Content */}
      <div className='relative h-full'>
        {/* images */}
        <div className='h-[75vh] w-full hidden lg:flex gap-1 overflow-hidden '>
          <div className='w-5/6 flex gap-1'>
            <div className='w-1/2 overflow-hidden rounded-t-lg flex justify-center items-center'>
              <img
                src={images[0] && `${BASE_IMAGE_URL}${images[0].path}`}
                alt="Main Car"
                className={`${images[0] ? 'h-full w-full' : 'blur-sm h-20'} object-cover  transition-all duration-1000`}
              />
            </div>
            <div className='w-1/2 overflow-hidden rounded-t-lg flex justify-center items-center'>
              <img
                src={images[1] ? `${BASE_IMAGE_URL}${images[1].path}` : `${sampleBg}`}
                alt="Main Car"
                className={`${images[1] ? 'h-full w-full' : 'blur-sm h-20'} object-cover  transition-all duration-1000`}
              />
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <div className='h-1/3 overflow-hidden rounded-lg flex justify-center items-center'>
              <img
                src={images[2] ? `${BASE_IMAGE_URL}${images[2].path}` : `${sampleBg}`}
                alt="Main Car"
                className={`${images[2] ? 'h-full w-full' : 'blur-sm h-20'} object-cover  transition-all duration-1000`}
              />
            </div>
            <div className='h-1/3 overflow-hidden rounded-lg flex justify-center items-center'>
              <img
                src={images[3] ? `${BASE_IMAGE_URL}${images[3].path}` : `${sampleBg}`}
                alt="Main Car"
                className={`${images[3] ? 'h-full w-full' : 'blur-sm h-20'} object-cover  transition-all duration-1000`}
              />
            </div>
            <div className='h-1/3 overflow-hidden rounded-lg flex justify-center items-center'>
              <img
                src={images[4] ? `${BASE_IMAGE_URL}${images[4].path}` : `${sampleBg}`}
                alt="Main Car"
                className={`${images[4] ? 'h-full w-full' : 'blur-sm h-20'} object-cover  transition-all duration-1000`}
              />
            </div>
            <div className='w-full bg-white text-black flex justify-center font-light rounded-t-lg cursor-pointer' onClick={handleOpenModal}>
              <button
                className='text-xl'
              >
                MORE
              </button>
            </div>
          </div>
        </div>


        {/* mobile images */}
        <div className='h-[75vh] w-full block lg:hidden gap-1'>
          {/* Main Swiper */}
          <Swiper
            style={{
              '--swiper-navigation-color': '#000',
              '--swiper-pagination-color': '#000',
              '--swiper-navigation-size': ".8rem",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 h-[80%]"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className='h-full w-full object-cover'
                  src={image.path && `${BASE_IMAGE_URL}${image.path}`}
                  alt={`Slide ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbs Swiper */}
          <Swiper
            onSwiper={setThumbsSwiper}
            navigation={true}
            spaceBetween={10}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiperThumbs h-[20%]"
            style={{
              '--swiper-navigation-size': ".6rem",
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className='h-full w-52 object-cover'
                  src={image.path && `${BASE_IMAGE_URL}${image.path}`}
                  alt={`Thumbnail ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* mobile images */}




        {/* Overview */}
        <div className='bg-green-body/40 bg-opacity-30 backdrop-brightness-90 text-white rounded-b-2xl shadow-2xl shadow-black overflow-hidden'
          style={{
            backgroundImage: `url(${bgImage})`,
          }}>
          <div className="py-8 px-4 sm:px-6 lg:px-8 w-full mx-auto flex flex-col justify-center items-stretch backdrop-blur-2xl bg-green-body/90">
            <div className='w-full flex flex-col md:flex-row justify-between items-start md:items-center'>
              <div className='mb-4 md:mb-0'>
                {/* car details */}
                <p className='font-bold text-xl md:text-2xl'>{data.brand?.name}</p>
                <p className='font-bold text-3xl md:text-5xl'>{data.model}</p>
              </div>
              <div className='flex flex-col items-start md:items-center gap-3'>
                {/* price */}
                <p
                  className="px-4 py-2 md:px-6 md:py-3 overflow-hidden group bg-gradient-to-r bg-white hover:bg-gradient-to-r text-green-body rounded shadow-lg shadow-black"
                >
                  <span className="text-sm md:text-xl font-extrabold font-josefin">{data.price ? getNumberToCurrencyText(data.price): 'N/A'}</span>
                </p>
                {/* tailwind button */}
              </div>
            </div>
            <div className='w-full md:w-1/2 border-[1px] md:border-[2px] border-borderColor/10 rounded-ee-2xl mt-3 mb-4'></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8 pb-8">
              <div className="space-y-1">
                <h3 className="text-xs md:text-lg font-semibold text-borderColor2/60 tracking-widest">Condition</h3>
                <p className="text-sm md:text-xl font-medium">Used</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs md:text-lg font-semibold text-borderColor2/60 tracking-widest">Year of Manufacture</h3>
                <p className="text-sm md:text-xl font-semibold font-josefin">{data.year}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs md:text-lg font-semibold text-borderColor2/60 tracking-widest">Engine Size</h3>
                <p className="text-sm md:text-xl font-semibold font-josefin">{data.kms} KM</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs md:text-lg font-semibold text-borderColor2/60 tracking-widest">Color</h3>
                <p className="text-sm md:text-xl font-medium">{data.color}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs md:text-lg font-semibold text-borderColor2/60 tracking-widest">Engine Type</h3>
                <p className="text-sm md:text-xl font-medium">{capitalizeFirstLetters(data.fuel_type) ?? 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs md:text-lg font-semibold text-borderColor2/60 tracking-widest">Ownership</h3>
                <p className="text-sm md:text-xl font-semibold font-josefin">{data.ownership}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs md:text-lg font-semibold text-borderColor2/60 tracking-widest">Insurance Date</h3>
                <p className="text-sm md:text-xl font-semibold font-josefin">{data.insurance_dating ?? 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs md:text-lg font-semibold text-borderColor2/60 tracking-widest">Transmission</h3>
                <p className="text-sm md:text-xl font-semibold font-josefin">{data.transmission}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs md:text-lg font-semibold text-borderColor2/60 tracking-widest">Status</h3>
                <p className="text-sm md:text-xl font-semibold">{capitalizeFirstLetters(data.status)}</p>
              </div>
            </div>



            <a
              href={`tel:${phoneNumber}`} id="call-button"
              className="flex justify-center items-center gap-2 px-6 py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r bg-green-900 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300"
            >
              <span
                className="absolute right-0 w-32 md:w-[45%] h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 -skew-x-12 group-hover:-translate-x-36 ease pointer-events-none"
              ></span>
              <span className="relative text-sm md:text-base lg:text-lg font-normal">Book an Appointment</span>
              <TbPhoneCall className='flex self-center' />
            </a>

          </div>
        </div>


        {/* lg image modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} images={images} />
      </div>
    </div>

  );
};

export default VehicleDetails;
