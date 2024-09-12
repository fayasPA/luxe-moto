import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import FilterSearch from '../../components/FilterSearch';
import { axiosAPI } from '../../utils/axiosAPI';
import { BASE_IMAGE_URL, GET_ALL_VEHICLES } from '../../utils/urls';
import { TbChevronsDown } from 'react-icons/tb';
import { capitalizeWord, getNumberToCurrencyText } from '../../utils/helperFunctions';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { PiCalendarLight, PiGasPumpLight } from 'react-icons/pi';
import cardBg from '/images/cardBg.jpg'
import { gsap } from 'gsap';
import useLocomotiveScroll from '../../utils/useLocomotiveScrollToTop';
import { IoMdCloseCircle } from 'react-icons/io';
import EnquiryModal from './Modal';

const UsedVehicles = () => {
  const scrollRef = useLocomotiveScroll();
  const axiosInstance = axiosAPI();
  const [datas, setDatas] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState("p");

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCarType, setSelectedCarType] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([500000, 5000000]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [newlyAddedDataCount, setNewlyAddedDataCount] = useState(0);
  // Toggle filter modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  // enquiry modal
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedEnqProduct, setSelectedEnqProduct] = useState(null);
  const openEnquiryModal = (product) => {
    setIsEnquiryModalOpen(true);
    setSelectedEnqProduct(product);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setSelectedEnqProduct(null);
  };

  // Handle value change for radio input
  const handleChange = (event) => {
    setSelectedBrand('');
    setSelectedCarType('');
    setSelectedFuelType('');
    setSelectedPriceRange([500000, 5000000]);
    setCurrentPage(1)
    setFiltersApplied(false)
    setSelectedValue(event.target.value);
  };

  // Get filter parameters
  const getFilterParams = () => ({
    brand_id: selectedBrand,
    car_type: selectedCarType,
    fuel_type: selectedFuelType,
    min_price: selectedPriceRange[0],
    max_price: selectedPriceRange[1],
  });

  // Fetch vehicles with or without filters
  const get_all_vehicles = async (params = null) => {
    setIsDataLoading(true);
    try {
      const response = await axiosInstance.get(`${GET_ALL_VEHICLES}/${selectedValue}`, { params });
      if (response.status === 200) {
        const cars = response.data.all_cars || [];
        setDatas(cars);
        setNewlyAddedDataCount(cars.length);
        setTotalDataCount(response.data.total_count || 0);
      } else {
        setDatas([]);
        setTotalDataCount(0);
      }
    } catch (error) {
      setDatas([]);
      console.error("Error fetching vehicles:", error);
    } finally {
      setIsDataLoading(false);
      window.scrollTo(0, 0);
    }
  };

  // Load more vehicles
  const load_more_vehicles = async () => {
    // setIsDataLoading(true);
    const params = filtersApplied ? getFilterParams() : null;
    try {
      const response = await axiosInstance.get(`${GET_ALL_VEHICLES}/${selectedValue}?page=${currentPage}`, { params });
      if (response.status === 200 && response.data.all_cars) {
        const newCars = response.data.all_cars;
        setTotalDataCount(response.data.total_count);
        setDatas((prevDatas) => {
          setNewlyAddedDataCount(newCars.length); // Store the count of newly added cars
          return [...prevDatas, ...newCars];
        });
      }
    } catch (error) {
      console.error("Error loading more vehicles:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  // Apply filters and fetch vehicles
  const applyFilters = () => {
    setFiltersApplied(true);
    setCurrentPage(1);
    const params = getFilterParams();
    get_all_vehicles(params);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedBrand('');
    setSelectedCarType('');
    setSelectedFuelType('');
    setSelectedPriceRange([500000, 5000000]); // Reset to default price range
    setFiltersApplied(false);
    toggleModal();
    get_all_vehicles(); // Fetch data without filters
  };

  // Handle initial data loading or when filters change
  useEffect(() => {
    get_all_vehicles(filtersApplied ? getFilterParams() : null);
  }, [selectedValue]);

  // Load more data when the page changes
  useEffect(() => {
    if (currentPage > 1) {
      load_more_vehicles();
    }
  }, [currentPage]);

  // Animation effect when data is loaded
  useEffect(() => {
    if (!isDataLoading && newlyAddedDataCount > 0) {
      const newVehicleCards = `.vehicle-card:nth-last-child(-n+${newlyAddedDataCount})`; // Target only the new vehicle cards
      gsap.fromTo(
        newVehicleCards,
        {
          y: "+=50", // Initial 'from' state
          opacity: 0,
        },
        {
          y: "0", // Target 'to' state
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
        }
      );
    }
  }, [datas, isDataLoading, newlyAddedDataCount]);


  return (
    <div className=" mt-20 md:mt-28" ref={scrollRef}>

      <div className="mx-auto max-w-3xl  lg:max-w-7xl border border-black shadow-2xl shadow-black rounded-xl overflow-hidden" style={{
        backgroundImage: `url(${cardBg})`,
      }}>
        <div className='px-5 md:px-12 pt-5 pb-20 backdrop-blur-xl bg-[#12472f69]'>

          <div className=''>
            <h2 className='text-sm sm:text-base md:text-xl lg:text-2xl font-extralight'>MAKE YOUR CHOICE</h2>
          </div>

          {/* premium mini btn */}
          <div className="flex justify-between py-5">
            <div className="flex space-x-4 rounded-xl select-none max-w-xs md:max-w-md w-fit">
              <label className="cursor-pointer flex gap-1 justify-center items-center font-light sm:text-xs text-sm md:text-base lg:text-lg text-white relative my-2">
                <input
                  type="radio"
                  name="radio-group"
                  value="p"
                  checked={selectedValue === "p"}
                  onChange={handleChange}
                  className="absolute opacity-0"
                />
                <span
                  className={`w-5 md:w-5 lg:w-6 h-5 md:h-5 lg:h-6 rounded-md md:rounded-md border-2 shadow-md transition-all duration-300 ease-in-out relative transform -translate-z-6 border-borderColor
                  }`}
                >
                  {selectedValue === "p" && (
                    <span className="absolute inset-[3px] md:inset-[2px] rounded-sm bg-white"></span>
                  )}
                </span>
                PREMIUM
              </label>

              <label className="cursor-pointer flex gap-1 justify-center items-center font-light text-sm md:text-base text-white relative my-2">
                <input
                  type="radio"
                  name="radio-group"
                  value="m"
                  checked={selectedValue === "m"}
                  onChange={handleChange}
                  className="absolute opacity-0"
                />
                <span
                  className={`w-5 md:w-5 lg:w-6 h-5 md:h-5 lg:h-6 rounded-md md:rounded-md border-2 shadow-md transition-all duration-300 ease-in-out relative transform -translate-z-6 border-borderColor
                  }`}
                >
                  {selectedValue === "m" && (
                    <span className="absolute inset-[3px] md:inset-[2px] rounded-sm bg-white"></span>
                  )}
                </span>
                MINI
              </label>
            </div>

            {/* filter */}
            <FilterSearch
              selectedBrand={selectedBrand}
              selectedCarType={selectedCarType}
              selectedFuelType={selectedFuelType}
              selectedPriceRange={selectedPriceRange}
              setSelectedBrand={setSelectedBrand}
              setSelectedCarType={setSelectedCarType}
              setSelectedFuelType={setSelectedFuelType}
              setSelectedPriceRange={setSelectedPriceRange}
              resetFilters={resetFilters}
              onApply={applyFilters}
              isModalOpen={isModalOpen}
              toggleModal={toggleModal}
            />
            {/* filter */}

          </div>
          {/* premium mini btn */}

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {isDataLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="w-full h-[30rem] rounded-lg overflow-hidden shadow-xl shadow-[#00000079] animate-pulse">
                  <div className="w-full h-1/2 bg-borderColor"></div>
                  <div className="w-full h-1/2 bg-[#092418]">
                    <div className="pb-4 p-4 h-full flex flex-col justify-between">

                      {/* First Section Skeleton */}
                      <div className="h-1/3 flex justify-between">
                        <div className="space-y-2">
                          <div className="w-20 h-4 bg-borderColor rounded-md"></div>
                          <div className="w-32 h-6 bg-borderColor rounded-md"></div>
                        </div>
                        <div className="w-10 h-4 bg-borderColor rounded-md"></div>
                      </div>

                      {/* Divider */}
                      <div className="border-b-[0.1px] mx-8 md:mx-3 lg:mx-2 border-[#ffffff25]"></div>

                      {/* Second Section Skeleton */}
                      <div className="h-1/3 mt-3 flex justify-between">
                        <div className="flex justify-between w-full">
                          <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className="w-6 h-6 bg-borderColor rounded-full"></div>
                            <div className="w-10 h-4 bg-borderColor rounded-md mt-2"></div>
                          </div>
                          <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className="w-6 h-6 bg-borderColor rounded-full"></div>
                            <div className="w-10 h-4 bg-borderColor rounded-md mt-2"></div>
                          </div>
                          <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className="w-6 h-6 bg-borderColor rounded-full"></div>
                            <div className="w-10 h-4 bg-borderColor rounded-md mt-2"></div>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-b-[0.1px] mx-8 md:mx-3 lg:mx-2 border-[#ffffff25]"></div>

                      {/* Third Section Skeleton */}
                      <div className="h-1/3 hidden lg:flex justify-center items-center">
                        <div className="bg-borderColor py-2 w-full rounded-md mt-5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (

              datas.map((product) => (
                <div key={product.id} className="bg-[#092418] vehicle-card w-full h-[35rem] rounded-lg overflow-hidden shadow-xl shadow-[#00000079]">
                  <div className='h-[86%]'>
                    <NavLink to={`/vehicles/${product.id}`}  >
                      <img
                        className="w-full h-[60%] object-cover"
                        src={`${BASE_IMAGE_URL}${product.image}`}
                        alt={product.image}
                      />
                      <div className='w-full h-auto '>
                        <div className="px-4 pt-4 pb-2 h-full flex flex-col justify-between">
                          {/* First Section: Brand, Model, and Color */}
                          <div className='h-1/3 flex justify-between text-xs md:text-sm lg:text-sm '>
                            <div>
                              <div className="font-normal">
                                <span>{capitalizeWord(product.brand)}</span>
                              </div>
                              <div className="text-sm md:text-base lg:text-lg font-extrabold mb-2">
                                {capitalizeWord(` ${product.model}`)}
                              </div>
                            </div>
                            <div className='flex gap-2'>
                              <div className="font-light">
                                {capitalizeWord(product.color)}
                              </div>
                            </div>
                          </div>
                          {/* Divider */}
                          <div className='border-b-[0.1px] border-spacing-10 mx-8 md:mx-3 lg:mx-2 border-[#ffffff25]'></div>
                          {/* Second Section: Year, KM, Fuel */}
                          <div className="h-1/3 mt-3 flex justify-between">
                            <div className="smaller-header-text flex flex-wrap justify-between w-full">
                              <div className="w-1/3 flex flex-col justify-center items-center">
                                <PiCalendarLight className='h-6 w-6 md:h-6 md:w-6 lg:h-5 lg:w-5 text-gray' />
                                <div className="text-base md:text-base lg:text-sm font-bold font-josefin">{product.year}</div>
                              </div>
                              <div className="w-1/3 flex flex-col justify-center items-center gap-1">
                                <PiGasPumpLight className='h-6 w-6 md:h-6 md:w-6 lg:h-5 lg:w-5 text-gray' />
                                <div className="text-xs sm:text-sm md:text-xs lg:text-xs font-bold ">
                                  {capitalizeWord(product.fuel_type)}
                                </div>
                              </div>
                              <div className="w-1/3 flex flex-col justify-center items-center">
                                <IoSpeedometerOutline className='h-6 w-6 md:h-6 md:w-6 lg:h-5 lg:w-5 text-gray' />
                                <div className="text-base md:text-base lg:text-sm font-bold font-josefin ">{product.kms}</div>
                              </div>
                            </div>
                          </div>
                          {/* Divider */}
                          <div className='mt-2 border-b-[0.1px] border-spacing-10 mx-8 md:mx-3 lg:mx-2 border-[#ffffff25]'></div>
                          {/* Third Section: Price */}
                          <div className="mt-2 flex justify-center items-center w-full">
                            <div className="bg-borderColor2  py-1 text-black rounded-md text-xl md:text-2xl lg:text-xl font-extrabold font-roboto w-full text-center">
                              {getNumberToCurrencyText(product.price)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavLink>

                  </div>

                  <div className='h-full w-full px-4 mt-1'>

                    <button
                      className="w-full rounded-md flex gap-2 px-6 py-3.5 md:px-5 md:py-4 overflow-hidden group bg-gradient-to-r bg-green-900 relative hover:bg-gradient-to-r text-white transition-all ease-out duration-300 "
                      onClick={() => openEnquiryModal(product)}
                    >
                      <span
                        className="absolute right-0 w-1/2 md:w-44 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-20 -skew-x-12 group-hover:-translate-x-36 ease pointer-events-none"
                      ></span>
                      <span className="relative text-xs md:text-sm font-extrabold">ENQUIRY</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {datas.length < totalDataCount && (
            <div className="flex flex-row w-full pt-10 text-borderColor2 items-center justify-center">
              <div onClick={() => setCurrentPage(currentPage + 1)} className="hover:text-white cursor-pointer flex w-fit text-3xl md:text-4xl lg:text-6xl flex-col items-center justify-center">
                <TbChevronsDown />
              </div>
            </div>
          )}
          {datas.length === 0 && (
            <div className='w-full h-[50vh] flex justify-center items-center text-base md:text-xl lg:text-2xl'>No data found.</div>
          )}

        </div>

        {/* Modal */}
        <EnquiryModal
        isEnquiryModalOpen={isEnquiryModalOpen}
        setIsEnquiryModalOpen={setIsEnquiryModalOpen}
        selectedEnqProduct={selectedEnqProduct}
      />



      </div>
    </div>
  );
};

export default UsedVehicles;
