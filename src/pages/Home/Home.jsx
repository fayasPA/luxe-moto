import React from 'react'
import BannerCarousel from '../../components/BannerCarousel'
import ZoomSlider from './../../components/ZoomSlider';
import InfoVideo from '../../components/InfoVideo';
import SliderAndVideo from '../../components/SliderAndVideo';
import ImageShowcase from '../../components/ImageShowcase';
const Home = () => {
  return (
    <section className='h-screen w-full'>
      <BannerCarousel />
      <div><InfoVideo /></div>
      <SliderAndVideo />
      <ImageShowcase />

    </section>
  )
}

export default Home