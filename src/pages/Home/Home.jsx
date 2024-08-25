import React from 'react'
import BannerCarousel from '../../components/BannerCarousel'
import ZoomSlider from '../../components/LatestDelivery/DeliverSwiperSlider';
import InfoVideo from '../../components/InfoVideo';
import ImageShowcase from '../../components/ImageShowcase';
import InfoVideoHeader from '../../components/InfoVideoHeader';
import LatestDeliveries from '../../components/LatestDelivery/LatestDeliveries';
const Home = () => {
  return (
    <section className=' w-full'>
      <BannerCarousel />
      <InfoVideoHeader />
      <InfoVideo />
      <LatestDeliveries />
      <ImageShowcase />
    </section>
  )
}

export default Home