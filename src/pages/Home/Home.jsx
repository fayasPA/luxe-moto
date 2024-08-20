import React from 'react'
import BannerCarousel from '../../components/BannerCarousel'
import ZoomSlider from './../../components/ZoomSlider';
import InfoVideo from '../../components/InfoVideo';
import SliderAndVideo from '../../components/SliderAndVideo';
const Home = () => {
  return (
    <section className='h-screen w-full'>
      <BannerCarousel />
      <div><InfoVideo/></div>

{/*       <ZoomSlider /> */}
        <SliderAndVideo/>

    </section>
  )
}

export default Home