import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CategorySlider = () => {
  const [category, setCategory] = useState(null);

  // Function to fetch categories
  async function getCategory() {
    const options = {
      url: 'https://ecommerce.routemisr.com/api/v1/categories',
      method: 'GET',
    };
    let { data } = await axios.request(options);
    setCategory(data.data);
  }

  // Fetch data when component mounts
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className='py-8'>
      <h3 className='font-bold text-slate-800 py-10'>Shop Popular Categories</h3>
      {!category ? (
        <Loading />
      ) : (
        <Swiper
        slidesPerView={3}  
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 6, 
          },
        }}
      >
          {category.map((cat) => (
            <SwiperSlide key={cat._id}>
              <img src={cat.image} className='w-64 h-64 object-cover' alt="Category" />
              <h2 className='text-slate-700 font-semibold my-2'>{cat.name}</h2>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CategorySlider;
