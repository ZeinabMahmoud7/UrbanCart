import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Brands = () => {
    const [brands,setbrands]=useState(null);
   async function getAllBrands() {
    try{
        const options={
            url:`https://ecommerce.routemisr.com/api/v1/brands`
        };
         let {data}=await axios.request(options);
         console.log(data);
         setbrands(data.data);
       
    }catch{

    }
}
useEffect(()=>{
    getAllBrands();
},[])
  return (
   <>
    <Helmet>
        <title>Brand Page</title>
        </Helmet>
       {!brands?<Loading/>:<section className='m-8 grid grid-cols-2 md:grid-cols-4  gap-8 lg:grid-cols-6'>
          {brands.map((brand)=>
          <NavLink to={`/brands/${brand._id}`}  key={brand._id}>
            <img className='rounded-full hover:transition-all hover:scale-125  border border-x-2 border-red-700  shadow-md' src={brand.image} alt={brand.name} />
          </NavLink>
        )}
        </section>}
   </>
  )
}

export default Brands