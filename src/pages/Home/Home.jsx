import React from 'react'
import BannerCarousel from '../../components/BannerCarousel'
import ZoomSlider from './../../components/ZoomSlider';
import InfoVideo from '../../components/InfoVideo';
import SliderAndVideo from '../../components/LatestDeliveries';
import ImageShowcase from '../../components/ImageShowcase';
import InfoVideoHeader from '../../components/InfoVideoHeader';
const Home = () => {
  return (
    <section className='h-screen w-full'>
      <BannerCarousel />
      <InfoVideoHeader />
      <InfoVideo />

      <SliderAndVideo />
      <ImageShowcase />
    </section>
  )
}

export default Home