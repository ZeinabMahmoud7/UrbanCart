import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading';
import { NavLink } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import noproduct from '../../assets/images/no-prod.png';
const BrandDetails = () => {
      const { id } = useParams();
        const { addProductToCart } = useContext(cartContext); 
      const [brands,setbrands]=useState(null);
      async function getSpecificBrand() {
       try{
           const options={
           
               url:`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
           };
            let {data}=await axios.request(options);
            console.log("😂😂",data);
            setbrands(data.data);
          
       }catch{
   
       }
   }

   useEffect(()=>{
    getSpecificBrand();
   },[])
  return (
     <>{!brands ? ( <Loading /> ) : brands.length === 0 ? (
        <div className='container flex justify-center items-center'>
           <img className='w-4/12' src={noproduct} alt='no-product-found'/>
        </div>
     ) : (<section className='m-8 grid grid-cols-2 md:grid-cols-2  gap-8 lg:grid-cols-4'>
        {brands.map((brand)=>
       <div className="m-4 md:m-0 card group/card  rounded-md overflow-hidden shadow-md  ">
       <div className='layer relative'>
       <img  src={brand.imageCover} alt="image cover" />
       <div className='absolute w-full h-full flex justify-center items-center space-x-2 bg-slate-500 left-0 top-0 bg-opacity-0 opacity-0 group-hover/card:opacity-100 group-hover/card:bg-opacity-40 hover:transition-all duration-300'>
          
       <div className='flex cursor-pointer w-6 h-6 justify-center items-center  bg-red-700 rounded-full'>
         <i class="fa-solid fa-heart text-white"></i>
         </div>
         <div className='flex cursor-pointer w-6 h-6 justify-center items-center bg-red-700 rounded-full'
         onClick={()=>
           addProductToCart({productId:brand.id})
         }>
         <div className='flex w-6 h-6 justify-center items-center bg-red-700 rounded-full' >
         <i class="fa-solid fa-cart-shopping text-white"></i>
         </div>
         </div>
         <NavLink to={`/product/${brand.id}`} className='flex cursor-pointer w-6 h-6 justify-center items-center bg-red-700 rounded-full'>
         <i class="fa-solid fa-eye  text-white"></i>
         </NavLink>
          
         
       </div>
       </div>
       <div className="card-body p-3 space-y-4">
       <header>
           <h2 className='font-extrabold text-slate-700 line-clamp-1'>{brand.title}</h2>
           <p className='text-red-800 font-semibold'>{brand.category.name}</p>
       </header>
       <p className='text-sm text-slate-400 line-clamp-2'>{brand.description}</p>
       <div className='flex justify-between items-center text-sm'>
           <span>{brand.price} EGP</span>
           <span><i class="fa-solid fa-star text-yellow-500"></i> {brand.ratingsAverage}</span>
       </div>
       </div>
      

       </div>  
      )}
      </section>)}
      
     </>
  )
}

export default BrandDetails