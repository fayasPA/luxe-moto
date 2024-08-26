import React from 'react';
import DeliveryVideoComponent from './DeliveryVideoComponent';
import DeliverSwiperSlider from './DeliverSwiperSlider';


const LatestDeliveries = () => {

  return (
    <div className='w-full pb-10'>
      {/* Header */}
      <div className='w-full md:py-0'>
        <div className='font-medium max-w-fit ml-10 md:ml-20 text-3xl md:text-7xl'>
          <h2>Happy Customers</h2>
        </div>
      </div>

      {/* body */}
      <div className='w-full h-full md:flex'>
        {/* left */}
        <div className=' w-full md:w-1/2 h-[40rem] md:h-[50rem] px-5 overflow-hidden'>
          <div className='w-full h-full'>
            <DeliverSwiperSlider />
          </div>
        </div>

        {/* right */}
        <DeliveryVideoComponent />

      </div>
      <div className='font-medium py-5 text-center text-xs md:text-sm'>
        VIEW ALL DELIVERIES
      </div>

    </div>
  );
}

export default LatestDeliveries;
