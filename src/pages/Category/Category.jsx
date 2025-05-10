import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import 'swiper/css';
import { Helmet } from 'react-helmet';

const Category = () => {
    const [category, setCategory] = useState(null);
    
      // Function to fetch categories
      async function getCategory() {
        const options = {
          url: 'https://ecommerce.routemisr.com/api/v1/categories',
          method: 'GET',
        };
        let { data } = await axios.request(options);
        setCategory(data.data);
        console.log("😂",data.data);
      }
    
      // Fetch data when component mounts
      useEffect(() => {
        getCategory();
      }, []);
    
      return (
        <>
         <Helmet>
        <title>Categories Page</title>
        </Helmet>
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
                <SwiperSlide key={cat._id} >
                    <NavLink to={`/categories/${cat._id}`} >
                    <img src={cat.image} className='w-64 h-64 object-cover' alt="Category" />
                    <h2 className='text-slate-700 font-semibold my-2'>{cat.name}</h2>
                    </NavLink>
                  
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        </>
      
      );

}

export default Category