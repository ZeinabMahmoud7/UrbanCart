import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import Card from '../../components/Card/Card'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const Product = () => {
    const [products,setProductes]=useState(null);
    async function getProductes(){
       const option={
         url:'https://ecommerce.routemisr.com/api/v1/products',
         method:'GET',
       }
       let {data}=await   axios.request(option);
       console.log(data.data);
       setProductes(data.data);
     }
     useEffect(()=>{
       getProductes();
     },[])
    
     return (
       <>
       
       <Helmet>
        <title>Products Page</title>
        </Helmet>
        {!products?<Loading/>:<div className='py-8 grid gap-4 sm:gap-4 sm:grid-cols-2  md:grid-cols-3  xl:grid-cols-4 '>
         {products.map(prod=><Card key={prod.id} productinfo={prod} />)}
           </div>
         }
       </>
   
        
        
      
     )
   
}

export default Product