import React, { useContext, useEffect } from 'react'
import { cartContext } from '../../context/cartContext'
import Loading from '../../components/Loading/Loading';
import CartItem from '../../components/CartItem/CartItem';
import { Link, NavLink } from 'react-router-dom';

const CartProduct = () => {
    let {getCartProduct,cartInfo,deleteCart}=useContext(cartContext);
    useEffect(()=>{getCartProduct()},[])
  return (
    <>
     {!cartInfo?<Loading/>:<section>
        <div className='flex m-4 md:m-0  md:mt-8 items-center gap-x-5'>
        <i class="fa-brands fa-opencart text-2xl"></i>
        <h2 className=' text-slate-800 font-bold text-lg relative  before:absolute before:w-1 before:h-full before:bg-black
        before:-left-2
    '>Your Shopping Cart</h2>
        </div>
       
        {cartInfo.numOfCartItems==0?<h2 className='m-4 md:m-0   md:my-10 flex flex-col items-center gap-y-4 rounded-md p-5 bg-slate-200'>Oops! Your Cart iS Empty. Start Shopping now by clicking the button below and fond something You Love!
             <NavLink to='/' className="btn bg-primary-700 w-fit text-white hover:bg-primary-800">BACK TO HOME</NavLink>
           </h2>:
        <>
        <div className='m-4 md:m-0   py-10 space-y-3'> 
            {cartInfo.data.products.map((cart)=>  <CartItem key={cart._id} cartinfo={cart}/>)}
        </div>
        <div className='text-center m-4 md:m-0  flex justify-between items-center md:mb-10'>
        <div className='font-semibold flex justify-start items-center  gap-5'>
        <i class="fa-solid fa-sack-dollar text-lg text-primary-800"></i> 
        <p>Your Total Price Cart</p>
        <span className='font-bold text-primary-800'>{cartInfo.data.totalCartPrice}</span>
        </div>
        <button
        onClick={()=>{
          deleteCart();
        }}
         className='ms-2 md:ms-0 btn bg-red-600 text-white font-semibold text-center  hover:bg-red-700'><i class="fa-solid fa-trash text-white"></i> Delete Cart</button>
        </div>
        <div className='mx-3'>
        <Link to='/checkout' className=' mb-5 md:m-0   inline-block text-center btn  md:my-9  bg-primary-600 hover:bg-primary-700 text-white w-full'>Next Step (Payment)</Link>
       
        </div>
        </>
        
          
        }
        </section>}
    </>
  )
}

export default CartProduct
