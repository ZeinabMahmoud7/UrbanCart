import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import Card from '../../components/Card/Card'
import axios from 'axios'
import SliderHome from '../../components/SliderHome/SliderHome'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
  const [products,setProductes]=useState(null);
 async function getProductes(){
    const option={
      url:'https://ecommerce.routemisr.com/api/v1/products',
      method:'GET',
    }
    return axios.request(option);
  
  }

 
  let {data,isLoading}=useQuery({
    queryKey:["product"],
    queryFn:getProductes,
    staleTime:5000,
    refetchOnMount:true,
    retry:3
  })

  if(isLoading)
    return <Loading/>

  return (
    <>
    <Helmet>
      <title>Home Page</title>
    </Helmet>
    <SliderHome/>
    <CategorySlider/>
     <div className='py-8 grid gap-4 sm:gap-4 sm:grid-cols-2  md:grid-cols-3  xl:grid-cols-4 '>
      {data.data.data.map(prod=><Card key={prod.id} productinfo={prod} />)}
        </div>
      
    </>

     
     
   
  )
}

export default Home
