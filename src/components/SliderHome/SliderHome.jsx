import React from 'react'
import slidImage3 from '../../assets/images/slider-image-3.jpeg';
import slidImage2 from '../../assets/images/slider-image-2.jpeg';
import slidImage1 from '../../assets/images/slider-image-1.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
const SliderHome = () => {
  return (
    <>
      <div className='grid grid-cols-2  lg:grid-cols-12 my-5'>
      <div className='col-span-8'>
       <Swiper slidesPerView={1} loop={true} className='h-full w-full'>
        <SwiperSlide >
        <img className='w-full h-full object-cover' src={slidImage3} alt="image slider 1" />
        </SwiperSlide>
        <SwiperSlide >
        <img className='w-full h-full object-cover' src={slidImage3} alt="image slider 1" />
        </SwiperSlide>
       </Swiper>
      </div>
      <div className='col-span-4'>
      <img  className='w-full ' src={slidImage2} alt="image slider 2" />
      <img   className='w-full ' src={slidImage1} alt="image slider 3" />
      </div>
      </div>
    </>
  )
}

export default SliderHome
