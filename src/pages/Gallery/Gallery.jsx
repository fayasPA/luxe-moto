import React, { useEffect, useState } from 'react'
import { BASE_IMAGE_URL, GET_STAR_DELIVERIES, GET_YOUTUBE_LINKS } from '../../utils/urls';
// import { Oval } from 'react-loader-spinner'; // Import the loader component
import Oval from '../../components/Loaders/SimpleLoader';
import { ScrollTrigger } from "gsap/all";
import { gsap } from 'gsap/gsap-core';
import show0 from "/images/luxe_moto_logo.png";
import show1 from "/images/luxe_moto_logo.png";
import show2 from "/images/luxe_moto_logo.png";
import show3 from "/images/luxe_moto_logo.png";
import show4 from "/images/luxe_moto_logo.png";
import show5 from "/images/luxe_moto_logo.png";
import show6 from "/images/luxe_moto_logo.png";
import show7 from "/images/luxe_moto_logo.png";
import show8 from "/images/luxe_moto_logo.png";
import { axiosAPI } from '../../utils/axiosAPI';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetters, getNumberToCurrencyText } from '../../utils/helperFunctions';
import { IoSpeedometerOutline } from 'react-icons/io5';

gsap.registerPlugin(ScrollTrigger);


const products = [
  {
    id: 1,
    brand: 'Earthen Bottle',
    href: '#',
    price: '$48',
    sampleImage: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    brand: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    sampleImage: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    brand: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    sampleImage: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    brand: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    sampleImage: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]

const Gallery = () => {
  const axiosInstance = axiosAPI();
  const [activeTab, setActiveTab] = useState('customer_images');
  const [data, setData] = useState();
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [totalImgDataCount, setTotalImgDataCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [imgCurrentPage, setImgCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const images = [
    show0, show1, show2, show3, show4, show5, show6, show7, show8
  ];

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    console.log(imgData)
  }, [isChecked])

  useEffect(() => {
    get_youtube_data();
    get_star_deliveries();
  }, [])

  async function get_star_deliveries() {
    try {
      // const response = await axiosInstance.get(`${GET_STAR_DELIVERIES}`);
      if (response.status === 200 && response.data.CustomerImages) {
        setImgData(response.data.CustomerImages);
        setTotalImgDataCount(response.data.TotalCount);
      }
    } catch (error) {
      setImgData(products);
      setTotalImgDataCount(3);
      console.log("---------API_ERROR", error);
    } finally {
      setImgLoading(false)
    }
  }

  useEffect(() => {
    if (imgCurrentPage > 1) {
      load_more_star_deliveries();
    }
  }, [imgCurrentPage])
  async function load_more_star_deliveries() {
    try {
      const response = await axiosInstance.get(`${GET_STAR_DELIVERIES}?page=${imgCurrentPage}`);
      if (response.status === 200 && response.data.images) {
        setImgData([...imgData, ...response.data.images]);
      }
    } catch (error) {
      console.log("---------BANNER_ERROR", error);
    } finally {
      setImgLoading(false)
    }
  }


  async function get_youtube_data() {
    try {
      const response = await axiosInstance.get(`${GET_YOUTUBE_LINKS}`);
      if (response.status === 200 && response.data.links) {
        // setData(response.data.links);
        // setTotalDataCount(response.data.totalCount);
      }
    } catch (error) {
      console.log("---------BANNER_ERROR", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentPage > 1) {
      load_more_youtube_data();
    }
  }, [currentPage])
  async function load_more_youtube_data() {
    try {
      const response = await axiosInstance.get(`${GET_YOUTUBE_LINKS}?page=${currentPage}`);
      if (response.status === 200 && response.data.links) {
        setData([...data, ...response.data.links]);
        setTotalDataCount(response.data.totalCount);
      }
    } catch (error) {
      console.log("---------BANNER_ERROR", error);
    } finally {
      setLoading(false)
    }
  }

  const showModal = (src) => {
    setModalSrc(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalSrc('');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(
      ".gallery-header",
      {
        y: -200,
        borderRadius: "0%",
        yoyo: false,
        rotation: 0,
        opacity: 0,
      },
      {
        y: 0,
        repeat: 0,
        delay: 0,
        yoyo: false,
        rotation: 0,
        borderRadius: "0%",
        duration: 0.7,
        ease: "none",
        stagger: 0.5,
        opacity: 1,
        scrollTrigger: {
          trigger: ".gallery-header",
          toggleActions: "play none none none ",
          once: true
        },
      }
    );
  }, [])


  return (
    <div className='h-full'>
      <section className="pt-28 h-full">
        <div className='w-full text-center'>
          <h2 className=" font-bold text-xl md:text-4xl text-black mb-8 max-xl:text-center">Our Showcase</h2>
        </div>


        <div className='flex justify-center '>
          <label
            htmlFor="car-type-filter"
            className="car-type-switch"
            aria-label="toggle car-type filter"
          >
            <input
              type="checkbox"
              id="car-type-filter"
              checked={isChecked}
              onChange={handleToggle}
            />
            <span>STAR DELIVERY</span>
            <span>VIDEOS</span>
          </label>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {imgData.map((img, index) => (
            <div
              key={img.id}
              className="mx-auto border-[1px] border-dashed border-black shadow-lg h-[25rem] w-full sm:max-w-xs group gap-2 rounded-none flex flex-col justify-end overflow-hidden bg-black cursor-pointer"
            >
              <img src={img.sampleImage} onClick={() => showModal(`${img.sampleImage}`)}
                className='h-full w-full bg-cover bg-center opacity-95 group-hover:opacity-90 transition-opacity duration-300' alt="" />
            </div>
          ))}


          {imgLoading ? (
            <div className='flex flex-row  justify-center items-center h-32 md:h-60'>
              <Oval
              />
            </div>
          ) :
            (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {imgData.map((img, index) => (
                <div key={index} className="w-full h-64 md:h-80 bg-cover group rounded-3xl bg-center overflow-hidden mx-auto cursor-pointer flex justify-center items-center">
                  <img
                    src={`${img.path}`}
                    alt={`customer_image${index}`}
                    onClick={() => showModal(`${img.path}`)}
                    className='h-full w-full object-cover'
                  />
                </div>
              ))}
              {modalOpen && (
                <div className="fixed top-0 left-0 z-80 w-screen h-screen bg-black/70 flex justify-center items-center">
                  <button
                    className="fixed z-90 bottom-6 right-8 text-white text-5xl font-bold"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                  <img
                    id="modal-img"
                    className="max-w-[80%] max-h-[80%] object-cover rounded-3xl"
                    src={modalSrc}
                    alt="Modal Content"
                  />
                </div>
              )}
            </div>
            )}

        </div>
        {imgData.length < totalImgDataCount && (
          <div className="flex flex-row w-full py-5 px-10">
            <button onClick={() => setImgCurrentPage(imgCurrentPage + 1)} className="w-full bg-white hover:bg-gray-700 text-gray-800 hover:text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              View More
            </button>
          </div>
        )
        }



      </section>
    </div>

  )
}

export default Gallery