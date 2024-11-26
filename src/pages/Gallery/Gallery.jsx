import React, { useEffect, useState } from 'react'
import { BASE_IMAGE_URL, GET_STAR_DELIVERIES, GET_YOUTUBE_LINKS } from '../../utils/urls';
import Oval from '../../components/Loaders/SimpleLoader';
import { ScrollTrigger } from "gsap/all";
import { gsap } from 'gsap/gsap-core';
import { axiosAPI } from '../../utils/axiosAPI';
import YoutubePlayer from './YoutubePlayer';
import cardBg from '/images/cardBg.jpg'
import { TbChevronsDown } from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const axiosInstance = axiosAPI();
  const [activeTab, setActiveTab] = useState('customer_images');
  const [data, setData] = useState([]);
  const [imgData, setImgData] = useState([]);
  const [deliveryloading, setDeliveryLoading] = useState(true);
  const [youtubeLoading, setYoutubeLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [totalImgDataCount, setTotalImgDataCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [imgCurrentPage, setImgCurrentPage] = useState(1);
  const [imgModalOpen, setImgModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setDeliveryLoading(true)
    setYoutubeLoading(true)
    get_youtube_data();
    get_star_deliveries();
  }, [])

  async function get_star_deliveries() {
    try {
      const response = await axiosInstance.get(`${GET_STAR_DELIVERIES}`);
      if (response.status === 200 && response.data.customer_images) {
        setImgData(response.data.customer_images);
        setTotalImgDataCount(response.data.total_count);
      }
    } catch (error) {
      console.log("---------API_ERROR", error);
    } finally {
      setDeliveryLoading(false)
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
      console.log('fayas', response.data.customer_images)
      if (response.status === 200 && response.data.customer_images) {
        setImgData([...imgData, ...response.data.customer_images]);
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
      if (response.status === 200 && response.data.youtubelinks) {
        setData(response.data.youtubelinks);
        setTotalDataCount(response.data.total_count);
      }
    } catch (error) {
      console.log("---------BANNER_ERROR", error);
    } finally {
      setYoutubeLoading(false)
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
      if (response.status === 200 && response.data.youtubelinks) {
        setData([...data, ...response.data.youtubelinks]);
        setTotalDataCount(response.data.totalCount);
      }
    } catch (error) {
      console.log("---------BANNER_ERROR", error);
    } finally {
      setYoutubeLoading(false)
    }
  }

  const showImgModal = (src) => {
    setModalSrc(src);
    setImgModalOpen(true);
  };

  const closeImgModal = () => {
    setImgModalOpen(false);
    setModalSrc('');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  return (
    <div className='h-full pt-20 md:pt-28'>
      <section style={{
        backgroundImage: `url(${cardBg})`,
      }} className=" h-full mx-auto max-w-2xl  lg:max-w-7xl border border-black shadow-2xl shadow-black overflow-hidden rounded-xl">

        <div className='px-5 md:px-12 pt-5 pb-20 backdrop-blur-xl bg-[#12472f69]'>
          <div className='w-full text-start'>
            <h2 className="text-xs md:text-sm lg:text-base  max-xl:text-start">OUR SHOWCASE</h2>
          </div>


          <div className="w-full flex mb-6 justify-center mt-6  text-[.8rem] md:text-base lg:text-lg">
            <div className="w-fit flex gap-5">

              {/* Step 1 - STAR DELIVERY */}
              <div
                className={`step ${!isChecked ? 'active' : 'inactive text-borderColor'} cursor-pointer transition-all duration-300 ease-in-out`}
                onClick={handleToggle}
              >
                STAR DELIVERY
              </div>
              <div className="border-[1px] border-borderColor transition-all duration-500 ease-in-out"></div>

              {/* Step 2 - VIDEOS */}
              <div
                className={`step ${isChecked ? 'active' : 'inactive text-borderColor'} cursor-pointer transition-all duration-300 ease-in-out`}
                onClick={handleToggle}
              >
                VIDEOS
              </div>
            </div>
          </div>

          {/* delivery section */}
          {!isChecked && (
            <>
              {deliveryloading ? (
                <div className="flex justify-center items-center h-32 md:h-60 w-full">
                  <Oval />
                </div>
              ) : (
                imgData.length > 0 ?
                  <>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-4">
                      {imgData.map((img) => (
                        <div key={img.id} className="cursor-pointer h-[40vh] sm:h-[50vh] md:h-96 w-full rounded-lg overflow-hidden shadow-xl shadow-[#00000079]">
                          <div className="h-full w-full">
                            <img
                              className="w-full h-full object-cover"
                              src={`${BASE_IMAGE_URL}/${img.path}`}
                              onClick={() => showImgModal(`${BASE_IMAGE_URL}/${img.path}`)}
                              alt={img.path}
                            />
                          </div>
                        </div>
                      ))}

                    </div>

                    {imgData.length < totalImgDataCount && (
                    <div className='mt-5 flex flex-col items-start md:items-center gap-3 cursor-pointer'
                      onClick={() => setImgCurrentPage(imgCurrentPage + 1)}
                    >
                      {/* price */}
                      <p
                        className="px-4 py-2 md:px-6 md:py-3 overflow-hidden group bg-gradient-to-r bg-white hover:bg-black hover:text-white uppercase text-green-body rounded shadow-lg shadow-black flex w-full justify-center"
                      >
                        <span className="text-lg md:text-xl lg:text-2xl font-extrabold font-josefin">View more</span>
                      </p>
                      {/* tailwind button */}
                    </div>
                    )}
                  </> :
                  <>
                    <div className='w-full h-[50vh] flex justify-center items-center text-base md:text-xl lg:text-2xl'>No data found.</div>
                  </>
              )}
            </>

          )}




          {/* youtube section */}
          {isChecked && (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {youtubeLoading ? ( // Show loader while loading is true
                  <div className='flex  justify-center items-center h-32 md:h-60 w-full'>
                    <Oval
                    />
                  </div>
                ) :
                  (data.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {data.map((youtube, index) => (
                      <div key={index} className="h-64 md:h-80 bg-cover group rounded-3xl bg-center overflow-hidden mx-auto cursor-pointer flex justify-center items-center">
                        <YoutubePlayer url={youtube.video_links} />
                      </div>
                    ))}
                  </div> :
                    <>
                      <div className='w-full h-[50vh] flex justify-center items-center text-base md:text-xl lg:text-2xl'>No data found.</div>
                    </>
                  )}

              </div>

              {data.length < totalDataCount && (
                <div className='mt-5 flex flex-col items-start md:items-center gap-3 cursor-pointer'
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  {/* price */}
                  <p
                    className="px-4 py-2 md:px-6 md:py-3 overflow-hidden group bg-gradient-to-r bg-white hover:bg-black hover:text-white uppercase text-green-body rounded shadow-lg shadow-black flex w-full justify-center"
                  >
                    <span className="text-lg md:text-xl lg:text-2xl font-extrabold font-josefin">View more</span>
                  </p>
                  {/* tailwind button */}
                </div>
              )
              }
            </>
          )}

        </div>


      </section>

      {imgModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 h-[100vh] flex justify-center items-center">
          <button
            className="absolute top-4 right-4 text-white text-5xl font-bold"
            onClick={closeImgModal}
          >
            ×
          </button>
          <img
            id="modal-img"
            className="w-full max-w-[90%] max-h-[90%] sm:max-w-[70%] sm:max-h-[70%] md:max-w-[60%] md:max-h-[60%] lg:max-w-[50%] lg:max-h-[50%] object-cover rounded-3xl"
            src={modalSrc}
            alt="Modal Content"
          />
        </div>
      )}
    </div>

  )
}

export default Gallery