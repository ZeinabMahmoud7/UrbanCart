import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import ImageGallery from "react-image-gallery";
import Card from '../../components/Card/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ProductDetails = () => {
  const [prodDetails, setProdDetails] = useState(null);
  const {addProductToCart}=useContext(cartContext);
  const [relatedProd,setRelatedProduct]=useState(null);
let {id}=useParams();
  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: 'GET',
      };
      let { data } = await axios.request(options);
      console.log("Fetched product data:", data.data);
      setProdDetails(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }
  async function getRelatedProduct(){
    try{
     const option={
        url:`https://ecommerce.routemisr.com/api/v1/products?category[in]=${prodDetails.category._id}`
     }
     let {data}=await axios.request(option);
     setRelatedProduct(data.data);
    }catch(error){
         console.log(error);
    }
 }

  useEffect(() => {
    getProductDetails();
  }, [id]);
  useEffect(() => {
    if(prodDetails==null) return;
    getRelatedProduct();
  }, [prodDetails]);

  return (
 <>
   {prodDetails ? (
   
   <>
    <section className="grid grid-cols-12 gap-10 py-8">
    <div className="col-span-4">
    <ImageGallery
        showFullscreenButton={false}
        showNav={false}
        showPlayButton={false}
     items={prodDetails.images.map((img)=>{
      return{
        original:img,
        thumbnail:img
      }
     })} />
    </div>
    <div className="col-span-8 space-y-4">
      <h2 className="text-gray-700 text-2xl capitalize font-extrabold">
        {prodDetails.title}
      </h2>
      <h3 className="text-primary-700 font-bold">
        {prodDetails.category.name}
      </h3>
      <p className="text-gray-400">
        {prodDetails.description }
      </p>
      <div className="flex justify-between items-center">
        <span>{prodDetails.price} L.E</span>
        <span>
          {prodDetails.ratingsAverage}
          <i className="fa-solid fa-star text-yellow-500"></i>
        </span>
      </div>
      <button onClick={()=>{
        addProductToCart({productId:id});
      }} className="btn bg-primary-700 text-white hover:bg-primary-800 w-full">
        ADD TO CART
      </button>
    </div>
  </section>
  <section className='py-8'>
   <h2 className='my-8 text-slate-700 font-bold text-lg'>Related Products</h2>
   {relatedProd?<Swiper slidesPerView={6} spaceBetween={15}>
     {relatedProd.map((product)=>
       <SwiperSlide key={product.id}>
          <Card productinfo={product} />
       </SwiperSlide>
     )}
   </Swiper>:<Loading/>}
  </section>
   
   </>
     ) : (
    <Loading/>)}
 </>
  );
};

export default ProductDetails;
