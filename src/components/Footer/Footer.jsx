import React from 'react'
import amazonPayment from '../../assets/images/amazon-pay.png';
import americanPayment from '../../assets/images/American-Express-Color.png';
import masterCartPayment from '../../assets/images/mastercard.webp';
import paypalPayment from '../../assets/images/paypal.png';
import appStore from '../../assets/images/get-apple-store.png';
import googleStore from '../../assets/images/get-google-play.png';
const Footer = () => {
  return (
    <footer className='bg-slate-100 p-2 py-8'>
      <div className='container space-y-8'>
        <header>
        <h2 className='font-semibold text-center'>
          Get the FreshCart app
         </h2>
         <p className='text-slate-400 text-center'>We will send you a link, open it on your phone to download the app</p>
        </header>
         <div className='flex gap-x-3'>
          <input type="email" className='form-control grow' placeholder='Email ..' />
          <button className='btn bg-red-600 text-white  hover:bg-red-700'>Share App Link</button>
         </div>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-4 flex justify-between items-center border-y-2 py-4 border-slate-300 border-opacity-30'>
         <div className="Payment-partner flex gap-x-3 justify-center items-center">
          <h3 className='font-semibold text-center'>Payment Partners</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex gap-x-3 justify-center items-center'>
          <img className='w-20' src={amazonPayment} alt="amazone payment" />
          <img className='w-20' src={americanPayment} alt="american payment" />
          </div>
          <div className='flex gap-x-3 justify-center items-center'>
          <img className='w-16' src={masterCartPayment} alt="master cart payment" />
          <img className='w-20' src={paypalPayment} alt="paypal payment" />
          </div>
          </div>
         
         
         
         </div>
         <div className='download flex gap-x-2 justify-center items-center'>
            <h3> Get deliveries with FreshCart</h3>
            <img className='w-[90px]' src={appStore} alt="apple store" />
            <img className='w-24' src={googleStore} alt="google store" />
          </div>
         </div>
        
      </div>
    </footer>
  )
}

export default Footer
