import React from 'react'
import { FaChevronRight } from "react-icons/fa";

const InfoVideoHeader = () => {
    return (
        <div className='w-full md:flex justify-center px-20 md:px-60 py-10 md:py-28'>
            <div className='w-full md:w-1/2 flex items-center text-center text-3xl md:text-6xl pb-3 md:pb-0'>
                <p className=''>
                    An extraordinary model range
                </p>
            </div>
            <div className='w-full md:w-1/2 flex justify-center items-center'>
                <button
                    className="flex gap-2 px-6 py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r from-gray-700 to-black relative hover:bg-gradient-to-r hover:from-green hover:to-green-300 text-white transition-all ease-out duration-300"
                >
                    <span
                        className="absolute right-0 w-32 md:w-44 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"
                    ></span>
                    <span className="relative text-base md:text-xl font-semibold">Discover Vehicles</span>
                    <FaChevronRight className='flex self-center' />
                </button>


            </div>
        </div>
    )
}

export default InfoVideoHeader