import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi'; // Importing the filter icon
import { AiOutlineClose } from 'react-icons/ai'; // Importing the close icon
import RangeSlider from 'react-range-slider-input';
import { getNumberToCurrencyText } from '../utils/helperFunctions';
import '../assets/css/rangeSliderStyle.css'


const FilterSearch = () => {
  const [brands, setBrands] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCarType, setSelectedCarType] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [priceRange, setPriceRange] = useState([500000, 5000000]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Newest Listed'); // Default option

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSliderChange = (selectedRange) => {
    // console.log(selectedRange)
    setRange(selectedRange);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      {/* Filter Icon and Text */}
      <button
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        onClick={toggleModal}
      >
        <div className='border p-1 md:p-2 rounded-full'>
          <FiFilter className="text-xl md:text-2xl" />
        </div>
        <span className='hidden md:block'>REFINE YOUR SEARCH</span>
        <span className='block md:hidden'>Filter</span>
      </button>

      <div className="flex items-center justify-end space-x-4 b">


        <div className="relative input flex flex-col w-fit ">
          <label
            htmlFor="password"
            className="font-semibold relative top-2 ml-[7px] w-fit bg-white px-1 text-gray-600 text-xs md:text-sm"
          >
            ORDER
          </label>
          <div>
            <input
              type="text"
              id="order-input"
              className="peer h-12 w-32 md:w-48 border-2 border-gray-300 text-gray-900 pl-2 focus:ring-0 cursor-pointer text-xs md:text-base focus:outline-none"
              value={selectedOption}
              readOnly
              onClick={toggleDropdown}
            />
          </div>
          {isOpen && (
            <div
              className="absolute z-10 top-[100%] w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="order-input"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                {['Lowest Price', 'Highest Price', 'Oldest Year', 'Newest Year', 'Lowest Mileage', 'Highest Mileage', 'Newest Listed'].map((option, index) => (
                  <a
                    href="#"
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    {option}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-none shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filter Options</h2>
              <button onClick={toggleModal}>
                <AiOutlineClose className="text-xl" />
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  className="w-full border border-gray-300 rounded-none flex flex-col gap-2 p-2 bg-white shadow-xl origin-top focus:outline-none focus:ring-0 focus:border-1"
                >
                  <option>Brand 1</option>
                  <option>Brand 2</option>
                  <option>Brand 3</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body
                </label>
                <select
                  className="w-full border border-gray-300 rounded-none flex flex-col gap-2 p-2 bg-white shadow-xl origin-top focus:outline-none focus:ring-0 focus:border-1"
                >
                  <option>Body 1</option>
                  <option>Body 2</option>
                  <option>Body 3</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel
                </label>
                <select
                  className="w-full border border-gray-300 rounded-none flex flex-col gap-2 p-2 bg-white shadow-xl origin-top focus:outline-none focus:ring-0 focus:border-1"
                >
                  <option>Fuel 1</option>
                  <option>Fuel 2</option>
                  <option>Fuel 3</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PRICE RANGE
                </label>
                <div className="range-slider-div w-full border border-gray-300 rounded-none flex flex-col gap-2 py-4 px-2 bg-white shadow-xl origin-top focus:outline-none focus:ring-0 focus:border-1">
                  <RangeSlider
                    min={50000}
                    max={20000000}
                    value={priceRange}
                    step={[20000, 20000]}
                    className=" border border-gray-200 range-slider-component"
                    id="range-slider-component"
                    onInput={handleSliderChange}
                  />
                  <div style={{ fontSize: '.8em' }} className="flex justify-between pt-3 ">
                    <span>{getNumberToCurrencyText(priceRange[0])}</span>
                    <span>{getNumberToCurrencyText(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
              <button className="smky-btn3 relative hover:text-white py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-green-200 after:rounded-t-none after:w-full after:bottom-0 after:left-0 text-gray-600">
                Apply Filter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSearch;
