import { useState } from "react";
import { FaExpand, FaTh, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FreeMode, Navigation } from 'swiper/modules';
import { BASE_IMAGE_URL } from "../../utils/urls";
import '../../assets/css/VehicleDetailsCarousal.css';

const Modal = ({ isOpen, onClose, images }) => {
    const [isGridView, setIsGridView] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0); // State to manage the active slide

    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        if (e.target && e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    const handleImageClick = (index) => {
        setActiveSlide(index); // Set the active slide index
        setIsGridView(false);  // Switch to expand view
    };

    return (
        <div
            className='modal-overlay fixed top-0 left-0 w-full h-screen bg-black/50 flex justify-center items-center backdrop-blur-md'
            onClick={handleClickOutside}
        >
            <div className="relative bg-white/50 p-5 w-[90vw] max-w-7xl h-[75vh] rounded-lg overflow-hidden overflow-y-auto">
                {/* Close Button */}
                <div className="flex w-full justify-between items-center px-2 pb-5 h-[10%]">
                    <button
                        className='text-borderColor2 text-sm flex justify-content-center align-items-center gap-1'
                        onClick={onClose}
                    >
                        <span>
                            <FaTimes className="mt-[2px]" />
                        </span>
                        <span>Close</span>
                    </button>
                    <div className="flex gap-3">
                        <button
                            className={`text-sm ${isGridView ? 'text-green-body' : 'text-borderColor2'}`}
                            onClick={() => setIsGridView(true)}
                        >
                            <FaTh size={24} />
                        </button>
                        <button
                            className={`text-sm ${isGridView ? 'text-borderColor2' : 'text-green-body'}`}
                            onClick={() => setIsGridView(false)}
                        >
                            <FaExpand size={24} />
                        </button>
                    </div>
                </div>

                {/* Conditional Rendering Based on View */}
                {isGridView ? (
                    <div className='grid grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-3 '>
                        {images.map((image, index) => (
                            <div key={index} className='overflow-hidden rounded-lg'>
                                <img
                                    src={`${BASE_IMAGE_URL}${image.path}`}
                                    alt={`Image ${index}`}
                                    className='w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300'
                                    onClick={() => handleImageClick(index)} // Set active slide on image click
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[90%]">
                        {/* Main Swiper */}
                        <Swiper
                            style={{
                                '--swiper-navigation-color': '#000',
                                '--swiper-pagination-color': '#000',
                                '--swiper-navigation-size': ".8rem",
                            }}
                            spaceBetween={10}
                            navigation={true}
                            modules={[FreeMode, Navigation]}
                            className="mySwiper2 h-full w-full"
                            initialSlide={activeSlide} // Set initial slide
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
