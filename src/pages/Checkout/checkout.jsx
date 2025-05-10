import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { userContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const{cartInfo}=useContext(cartContext);
    const{token}=useContext(userContext);
    const[paymentMethod,setPayment]=useState(null);
 const navigate= useNavigate();
    async function createCashOrder(values) {
        let tostId = toast.loading("We Are Creating your Order ...")
        try{
          const options={
            url:`https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
            method:'POST',
            headers:{
                token,
            },
            data:values,
          }
          const {data}=await axios.request(options);
          console.log(data);
          if(data.status=="success"){
              toast.success("Your Order Has Been Created");
              setTimeout(() => {
                navigate("/alloreders");
              }, 3000);
             
          }
        }catch(error){
            console.log(error);
        }
        finally{
             toast.dismiss(tostId);
        }
    }
    async function createOnlinePayment(values) {
        
        try{
          const options={
            url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
            method:'POST',
            headers:{
                token,
            },
            data:values,
          }
          const {data}=await axios.request(options);
          console.log(data);
          if(data.status=="success"){
            toast.loading("We Are Redirecting to Stripe ...")
              setTimeout(() => {
                location.href=data.session.url;
              }, 3000);
             
          }
        }catch(error){
            console.log(error);
        }
        finally{
             toast.dismiss(tostId);
        }
    }
   
    const formik=useFormik({
        initialValues:{
            shippingAddress:{
                details: "",
                phone: "",
                city: ""
                }
        },
        onSubmit:(values)=>{
            if(paymentMethod=='cash'){
                createCashOrder(values);
            }
            else{
                createOnlinePayment(values);
            }
        },
    })
    console.log(formik.values);
    return (
        <>
        <div className='space-y-5'>
        <h2 className='text-xl text-slate-800 font-bold mt-3'>shipping Address</h2>
        
        <form className='py-6 space-y-5' action="" onSubmit={formik.handleSubmit}>
          <input className='form-control p-2 w-full' type="text" name="shippingAddress.city" placeholder='City' 
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
           />
          
            <input className='form-control p-2 w-full' type="tel" name="shippingAddress.phone" placeholder='Phone' 
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
           />
            <textarea className='form-control p-2 w-full' type="tel" name="shippingAddress.details" placeholder='Details' 
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
           ></textarea>
         <button onClick={()=>{
            setPayment("cash");
         }}  type='submit' className='btn bg-blue-500 hover:bg-blue-600 text-white'>Cash Order</button>
         <button onClick={()=>{
            setPayment("online");
         }} type='submit' className='btn ml-2 bg-primary-600 hover:bg-primary-700 text-white'>Online Payment</button>
        </form>
        </div>
        
        </>
    );
}
