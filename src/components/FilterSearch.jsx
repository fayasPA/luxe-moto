import React, { useEffect, useRef, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import RangeSlider from 'react-range-slider-input';
import '../assets/css/rangeSliderStyle.css';
import { capitalizeWord, getNumberToCurrencyText } from '../utils/helperFunctions';
import { GET_FILTER_TYPES } from '../utils/urls';
import { axiosAPI } from '../utils/axiosAPI';
import { useNavigate } from 'react-router-dom';
import { GrPowerReset } from 'react-icons/gr';

const FilterSearch = ({ selectedBrand,
  setSelectedBrand,
  selectedCarType,
  setSelectedCarType,
  selectedFuelType,
  setSelectedFuelType,
  selectedPriceRange,
  setSelectedPriceRange, resetFilters,
  onApply,
  isModalOpen,
  toggleModal }) => {
  const navigate = useNavigate();
  const axiosInstance = axiosAPI();
  const [brands, setBrands] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  
  const modalRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal();  // Close modal when clicking outside of it
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);


  const handleSliderChange = (selectedRange) => {
    setPriceRange(selectedRange);
  };

  useEffect(() => {
    getFilterTypes();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  async function handleFilter() {
    toggleModal();
    await onApply();
  }
  

  async function getFilterTypes() {
    try {
      const response = await axiosInstance.get(GET_FILTER_TYPES);
      if (response.status === 200) {
        setBrands(response.data.brands);
        setVehicleTypes(response.data.car_types);
        setFuelTypes(response.data.fuel_types);
      }
    } catch (error) {
      console.error('Error fetching filter types:', error);
    }
  }


  return (
    <div className="text-black flex items-center justify-between gap-2">
      {/* Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-30 h-screen" style={{ zIndex: 10003 }} />
          <div
            className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto h-screen backdrop-blur-md"
            style={{ zIndex: 10004 }}
          >
            <div className="bg-white/70 text-black p-4 md:p-6 rounded-xl shadow-lg w-11/12 md:w-3/4 lg:w-1/2" ref={modalRef}>
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm md:text-base lg:text-xl font-semibold">FILTER OPTIONS</h2>
                <button onClick={toggleModal} className="text-lg md:text-xl">
                  <AiOutlineClose className="text-xl" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="text-xs md:text-sm">
                {/* Brand Filter */}
                <div className="mb-4">
                  <label className="block text-xs md:text-sm font-medium mb-2">BRAND</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-1 bg-white shadow-xl focus:outline-none focus:ring-0 focus:border-1"
                  >
                    <option value="" className="text-gray-500">Select</option>
                    {brands && brands.map((opt, index) => (
                      <option key={index} value={opt.id}>
                        {capitalizeWord(opt.name)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Body Filter */}
                <div className="mb-4">
                  <label className="block text-xs md:text-sm font-medium mb-2">BODY</label>
                  <select
                    value={selectedCarType}
                    onChange={(e) => setSelectedCarType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-1 bg-white shadow-xl focus:outline-none focus:ring-0 focus:border-1"
                  >
                    <option value="" className="text-gray-500">Select</option>
                    {vehicleTypes && vehicleTypes.map((opt, index) => (
                      <option key={index} value={opt}>
                        {capitalizeWord(opt)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fuel Filter */}
                <div className="mb-4">
                  <label className="block text-xs md:text-sm font-medium mb-2">FUEL</label>
                  <select
                    value={selectedFuelType}
                    onChange={(e) => setSelectedFuelType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-1 bg-white shadow-xl focus:outline-none focus:ring-0 focus:border-1"
                  >
                    <option value="">Select</option>
                    {fuelTypes && fuelTypes.map((opt, index) => (
                      <option key={index} value={opt}>
                        {capitalizeWord(opt)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-4">
                  <label className="block text-xs md:text-sm font-medium mb-2">PRICE RANGE</label>
                  <div className="range-slider-div flex flex-col w-full">
                    <RangeSlider
                      min={50000}
                      max={20000000}
                      value={selectedPriceRange}
                      step={[20000, 20000]}
                      onInput={(val) => setSelectedPriceRange(val)}
                      className="border border-gray-200 range-slider-component"
                      id="range-slider-component"
                    />
                    <div className="flex justify-between pt-3 font-bold font-roboto text-xs md:text-sm">
                      <span>{getNumberToCurrencyText(selectedPriceRange[0])}</span>
                      <span>{getNumberToCurrencyText(selectedPriceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="flex justify-between">
                  <button
                    className="px-2 py-0 md:px-4 md:py-2 bg-white rounded-md text-black font-semibold transition-all duration-700 hover:scale-105"
                    onClick={resetFilters}
                  >
                    <GrPowerReset size={18} />
                  </button>

                  <button
                    className="px-4 py-2 md:px-6 md:py-3 bg-green-body/90 rounded-md text-white font-semibold relative transition-all duration-700 hover:scale-105"
                    onClick={handleFilter}
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <button className="smaller-header-text flex items-center hover:text-gray-300" onClick={toggleModal}>
        <div className="text-white border p-1 md:p-2 rounded-full">
          <FiFilter className="text-xl md:text-2xl" />
        </div>
      </button>
    </div>
  );
};

export default FilterSearch;
