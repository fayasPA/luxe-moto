import React, { useState, useEffect } from 'react';
import Overview from './Overview';

const VehicleDetail = () => {
  const images = [
    '/videos/benz.jpg',
    '/videos/mini.jpeg',
    '/videos/benz.jpg',
    '/videos/mini.jpeg',
    '/videos/benz.jpg',
    '/videos/mini.jpeg',
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Check if the screen width is less than or equal to 768px (md breakpoint in Tailwind)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check on component mount
    window.addEventListener('resize', handleResize); // Add resize listener

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up listener on unmount
    };
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (isMobile) {
    return (
        <div>
      <div className="w-full h-screen flex items-center justify-center bg-cover bg-center relative ">
        {/* Overlay for blurring the background */}
        <div className="absolute inset-0  bg-black bg-opacity-50 backdrop-blur-sm"></div>

        <div className="w-full h-[85%] relative z-1 pt-10">
          <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
            <img
              src={images[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="h-full w-full object-fit rounded-lg"
            />
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
            >
              &lt;
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
            >
              &gt;
            </button>
          </div>
        </div>
        </div>
                         {/* overview */}

                         <div class="border border-gray-300 p-4  rounded-lg bg-gray-50 max-w-xs mx-auto">
                 <h3 class="text-center text-gray-800 text-xl font-semibold pt-2 mb-4">Vehicle Details</h3>
                 <ul class="space-y-2 text-gray-700">
                   <li><strong class="font-medium">Condition:</strong> Used</li>
                   <li><strong class="font-medium">Year of Manufacture:</strong> 2015</li>
                   <li><strong class="font-medium">Engine Size:</strong> 3.0L V6</li>
                   <li><strong class="font-medium">Color:</strong> Black</li>
                   <li><strong class="font-medium">Engine Type:</strong> Diesel</li>
                   <li><strong class="font-medium">Ownership:</strong> 2</li>
                   <li><strong class="font-medium">Insurance Date:</strong> 12-06-2025</li>
                   <li><strong class="font-medium">Transmission:</strong> Automatic</li>
                   <li><strong class="font-medium">Status:</strong> Available</li>
                 </ul>
               </div>
      </div>

    );
  }

  return (
    <div>
      {/* Background section with a blurred image */}
      <div
        className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${images[0]})`,
        }}
      >
        {/* Overlay for blurring the background */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

        <div className="w-[75%] h-[80%] flex gap-1 relative z-10 pt-16 ">
          {/* First Section: Large Main Image */}
          <div className="w-[50%] h-full flex items-center justify-center overflow-hidden">
            <img
              src={images[0]}
              alt="Main Car"
              className="h-full w-full object-cover rounded-sm hover:scale-110 transition-all duration-1000"
            />
          </div>

          {/* Second Section: Two Smaller Images */}
          <div className="w-[35%] h-full flex flex-col items-center justify-center gap-1 rounded-sm">
            <div className="h-1/2 w-full rounded-sm overflow-hidden">
              <img
                src={images[1]}
                alt="Car Side View"
                className="h-full w-full object-cover rounded-sm hover:scale-110 transition-all  duration-1000"
              />
            </div>
            <div className="h-1/2 w-full rounded-sm overflow-hidden">
              <img
                src={images[2]}
                alt="Car Rear View"
                className="h-full w-full object-cover rounded-sm hover:scale-110 transition-all  duration-1000"
              />
            </div>
          </div>

          {/* Third Section: Three Even Smaller Images */}
          <div className="w-[15%] h-full flex flex-col gap-1">
            <div className="h-[27%] w-full rounded-sm overflow-hidden bg-green flex items-center justify-center">
              <img
                src='/images/logo-white.png'
                alt="Car Interior"
                className="h-8 w-8 object-cover rounded-sm hover:scale-110 transition-all  duration-1000"
              />
            </div>

            <div className="h-[28%] w-full rounded-sm overflow-hidden">
              <img
                src={images[4]}
                alt="Car Dashboard"
                className="h-full w-full object-cover rounded-sm hover:scale-110 transition-all duration-1000"
              />
            </div>

            <div className="h-[29%] w-full rounded-sm overflow-hidden">
              <img
                src={images[5]}
                alt="Car Seats"
                className="h-full w-full object-cover rounded-sm hover:scale-110 transition-all duration-1000"
              />
            </div>
            <div className="h-[15%] w-full bg-slate-500 rounded-sm flex items-center justify-center cursor-pointer hover:bg-slate-600 hover:rounded-xl">
              <p className="text-white text-lg p-2">View More +</p>
            </div>
          </div>
        </div>
        {/* name and price  */}
        <div className='z-10 w-full flex justify-between pt-2 px-10'>
            <div>
                {/* car details */}
            <p className='text-white-100 text-3xl'>Mercedez benz </p> 
            <p className='text-slate-400'>2022, 2 , 211mi Graypaul Birmingham</p>
            </div>
            <div className='flex items-center gap-3'> 
                {/* price */}
                <p className='text-white-100 text-3xl'>£155,000</p>
                {/* tailwind button */}
                <button
                    className="px-6 py-3.5 md:px-10 md:py-4 overflow-hidden group bg-gradient-to-r from-gray-700 to-black relative hover:bg-gradient-to-r hover:from-green hover:to-green-300 text-white transition-all ease-out duration-300"
                >
                    <span
                        className="absolute right-0 w-32 md:w-44 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"
                    ></span>
                    <span className="relative text-base md:text-xl font-semibold">Enquire</span>
                </button>
            </div>

       


        </div>
      </div>


           {/* overview */}
           {/*                    <li><strong class="font-medium">Condition:</strong> Used</li>
                   <li><strong class="font-medium">Year of Manufacture:</strong> 2015</li>
                   <li><strong class="font-medium">Engine Size:</strong> 3.0L V6</li>
                   <li><strong class="font-medium">Color:</strong> Black</li>
                   <li><strong class="font-medium">Engine Type:</strong> Diesel</li>
                   <li><strong class="font-medium">Ownership:</strong> 2</li>
                   <li><strong class="font-medium">Insurance Date:</strong> 12-06-2025</li>
                   <li><strong class="font-medium">Transmission:</strong> Automatic</li>
                   <li><strong class="font-medium">Status:</strong> Available</li> */}


          <Overview/>


    </div>
  );
};

export default VehicleDetail;
