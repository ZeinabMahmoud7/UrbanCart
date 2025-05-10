import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext';
import { NavLink, useParams } from 'react-router-dom';

const Card = ({productinfo}) => {
  const { addProductToCart } = useContext(cartContext); 
 const {imageCover,title,description,category,price,ratingsAverage,id}=productinfo;
  let param=useParams();
  return (
    <>
     <div className="m-4 md:m-0 card group/card  rounded-md overflow-hidden shadow-md  ">
        <div className='layer relative'>
        <img  src={imageCover} alt="image cover" />
        <div className='absolute w-full h-full flex justify-center items-center space-x-2 bg-slate-500 left-0 top-0 bg-opacity-0 opacity-0 group-hover/card:opacity-100 group-hover/card:bg-opacity-40 hover:transition-all duration-300'>
           
        <div className='flex cursor-pointer w-6 h-6 justify-center items-center  bg-red-600 rounded-full'>
          <i class="fa-solid fa-heart text-white"></i>
          </div>
          <div className='flex cursor-pointer w-6 h-6 justify-center items-center bg-red-600 rounded-full'
          onClick={()=>
            addProductToCart({productId:id})
          }>
          <div className='flex w-6 h-6 justify-center items-center bg-red-600rounded-full' >
          <i class="fa-solid fa-cart-shopping text-white"></i>
          </div>
          </div>
          <NavLink to={`/product/${id}`} className='flex cursor-pointer w-6 h-6 justify-center items-center bg-red-600 rounded-full'>
          <i class="fa-solid fa-eye  text-white"></i>
          </NavLink>
           
          
        </div>
        </div>
        <div className="card-body p-3 space-y-4">
        <header>
            <h2 className='font-extrabold text-slate-700 line-clamp-1'>{title}</h2>
            <p className='text-red-700 font-semibold'>{category.name}</p>
        </header>
        <p className='text-sm text-slate-400 line-clamp-2'>{description}</p>
        <div className='flex justify-between items-center text-sm'>
            <span>{price} EGP</span>
            <span><i class="fa-solid fa-star text-yellow-500"></i> {ratingsAverage}</span>
        </div>
        </div>
       

        </div>  
    </>
  )
}

export default Card
