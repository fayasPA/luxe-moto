import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi'; // Importing the filter icon
import { AiOutlineClose } from 'react-icons/ai'; // Importing the close icon

const FilterSearch = () => {
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

      <div className="flex items-center space-x-4 ">
        {/* <button className="text-gray-600 hover:text-gray-800">COMPARE</button> */}

        <div className="relative inline-block text-left w-56">
          <div>
            <label
              htmlFor="order-input"
              className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-xs md:text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
            >
              ORDER
            </label>
            <input
              type="text"
              id="order-input"
              className="peer h-12 w-32 md:w-48 border-2 border-gray-300 text-gray-900 pl-2 focus:ring-0 focus:border-gray-800 cursor-pointer text-xs md:text-base"
              value={selectedOption}
              readOnly
              onClick={toggleDropdown}
            />
          </div>

          {isOpen && (
            <div
              className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filter Options</h2>
              <button onClick={toggleModal}>
                <AiOutlineClose className="text-xl" />
              </button>
            </div>
            <form>



              <div className="flex w-72 flex-col items-end gap-6">
                {/* Medium Input */}

              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="input-md"
                  className="peer h-10 w-full border-2 border-gray-300 text-gray-900 placeholder-transparent focus:ring-0 focus:border-transparent focus:border-gray-800"
                  placeholder="Input Medium"
                />
                <label
                  htmlFor="input-md"
                  className="absolute left-2 -top-3.5 bg-white px-1 text-gray-600 text-sm transition-all duration-200 ease-in-out peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm"
                >
                  Input Medium
                </label>
                {/* Border to be shown when input is focused */}
                {/* <div className="absolute inset-0 border border-transparent  peer-focus:ring-0 transition-all duration-200 ease-in-out pointer-events-none" /> */}
              </div>

              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Term
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter search term"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Category 1</option>
                  <option>Category 2</option>
                  <option>Category 3</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Apply Filters
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSearch;
