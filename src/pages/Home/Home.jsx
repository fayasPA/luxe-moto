import React from 'react'
import BannerCarousel from '../../components/BannerCarousel'
import ZoomSlider from './../../components/ZoomSlider';
import InfoVideo from '../../components/InfoVideo';
import SliderAndVideo from '../../components/SliderAndVideo';
import ImageShowcase from '../../components/ImageShowcase';
import Footer from './../../components/Footer';
const Home = () => {
  return (
    <section className='h-screen w-full'>
      <BannerCarousel />
      <div><InfoVideo /></div>
      <SliderAndVideo />
      <ImageShowcase />
      <Footer/>

    </section>
  )
}

export default Home