import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import { NavLink } from 'react-router-dom'; // تأكد من استيراد NavLink
import noproduct from '../../assets/images/no-prod.png';
import 'swiper/css';

const CategoryDetails = () => {
  const { addProductToCart } = useContext(cartContext);
  const [relatedProd, setRelatedProduct] = useState(null);
  const { id } = useParams();

  async function getRelatedProduct() {
    try {
      const option = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}` 
      };
      let { data } = await axios.request(option);
      setRelatedProduct(data.data);
      console.log(data.data);
      console.log(data.data[0].imageCover);
 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRelatedProduct(); 
  }, []); 

  return (
    <>
    
      {!relatedProd ? ( <Loading /> ): relatedProd.length==0?(<img src={noproduct} alt='no-product-found'/>):
      
       (
        <section className='py-8 grid gap-4 grid-cols-12 md:grid-cols-2 lg:grid-cols-4'>
        
        {relatedProd.map((prod)=> <div key={prod._id} className="m-4 md:m-0 card group/card rounded-md overflow-hidden shadow-md">
            <div className='layer relative'>
              <img src={prod.imageCover} alt="image cover" />
              <div className='absolute w-full h-full flex justify-center items-center space-x-2 bg-slate-500 left-0 top-0 bg-opacity-0 opacity-0 group-hover/card:opacity-100 group-hover/card:bg-opacity-40 hover:transition-all duration-300'>
                <div className='flex cursor-pointer w-6 h-6 justify-center items-center bg-primary-700 rounded-full'>
                  <i className="fa-solid fa-heart text-white"></i>
                </div>
                <div
                  className='flex cursor-pointer w-6 h-6 justify-center items-center bg-primary-700 rounded-full'
                  onClick={() => addProductToCart({ productId: prod._id })}
                >
                  <div className='flex w-6 h-6 justify-center items-center bg-primary-700 rounded-full'>
                    <i className="fa-solid fa-cart-shopping text-white"></i>
                  </div>
                </div>
                <NavLink to={`/product/${prod._id}`} className='flex cursor-pointer w-6 h-6 justify-center items-center bg-primary-700 rounded-full'>
                  <i className="fa-solid fa-eye text-white"></i>
                </NavLink>
              </div>
            </div>
            <div className="card-body p-3 space-y-4">
              <header>
                <h2 className='font-extrabold text-slate-700 line-clamp-1'>{prod.title}</h2>
                <p className='text-primary-800 font-semibold'>{prod.category.name}</p>
              </header>
              <p className='text-sm text-slate-400 line-clamp-2'>{prod.description}</p>
              <div className='flex justify-between items-center text-sm'>
                <span>{prod.price} EGP</span>
                <span>{prod.ratingsAverage}<i className="fa-solid fa-star text-yellow-500"></i> </span>
              </div>
            </div>
          </div>)}
    </section>
      )}
    </>
  );
};

export default CategoryDetails;
