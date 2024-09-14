import React, { useEffect, useLayoutEffect } from 'react'
import BannerCarousel from '../../components/BannerCarousel'
import InfoVideo from '../../components/InfoVideo';
import ImageShowcase from '../../components/ImageShowcase';
import InfoVideoHeader from '../../components/InfoVideoHeader';
import LatestDeliveries from '../../components/LatestDelivery/LatestDeliveries';

const Home = () => {
  return (
    <section className='h-full w-full text-white'>
      <BannerCarousel />
      <InfoVideoHeader />
      <InfoVideo />
      <LatestDeliveries />
      <ImageShowcase />
    </section>
  )
}

export default Home