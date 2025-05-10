import React, { useContext, useEffect } from 'react'
import freshCartLogo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import { cartContext } from '../../context/cartContext';
const NavBar = () => {
  let {token,logout}=useContext(userContext);
  let {getCartProduct,cartInfo}=useContext(cartContext)
  useEffect(()=>{
    getCartProduct();
  },[])
  return (
    <>
    
    <nav className="bg-slate-100 mb-5 shadow-md fixed right-0 left-0 top-0 z-50">
  <div className="container mx-auto flex flex-wrap justify-between items-center py-5 gap-7 px-4">
    

    <NavLink to="/">
    <div className='flex items-center'>
    <img src={freshCartLogo} className='w-20 rounded-full' alt="fresh cart logo" />
    <p className='text-red-800 text-sm font-extrabold'>UrbanCart</p>
    
    </div>
      
    </NavLink>

  
    <button
      className="block md:hidden text-xl"
      onClick={() => document.getElementById('menu-items').classList.toggle('hidden')}
    >
      <i className="fa-solid fa-bars"></i>
    </button>

  
    <div id="menu-items" className="hidden  md:flex md:space-x-6 flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0">
      {token && (
        <>
          <ul className="flex flex-col  md:flex-row gap-4">
            <li>
              <NavLink to="/" className={({ isActive }) =>
                `relative before:absolute before:w-0 before:left-0 before:-bottom-1 before:h-0.5 before:bg-red-600 before:hover:w-full before:transition-all before:duration-200 ${isActive ? "before:!w-full font-semibold" : ""}`
              }>Home</NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) =>
                `relative before:absolute before:w-0 before:left-0 before:-bottom-1 before:h-0.5 before:bg-red-600 before:hover:w-full before:transition-all before:duration-200 ${isActive ? "before:!w-full font-semibold" : ""}`
              }>Products</NavLink>
            </li>
            <li>
              <NavLink to="/categories" className={({ isActive }) =>
                `relative before:absolute before:w-0 before:left-0 before:-bottom-1 before:h-0.5 before:bg-red-600 before:hover:w-full before:transition-all before:duration-200 ${isActive ? "before:!w-full font-semibold" : ""}`
              }>Categories</NavLink>
            </li>
            <li>
              <NavLink to="/brands" className={({ isActive }) =>
                `relative before:absolute before:w-0 before:left-0 before:-bottom-1 before:h-0.5 before:bg-red-600 before:hover:w-full before:transition-all before:duration-200 ${isActive ? "before:!w-full font-semibold" : ""}`
              }>Brands</NavLink>
            </li>
            <li>
              <NavLink to="/alloreders" className={({ isActive }) =>
                `relative before:absolute before:w-0 before:left-0 before:-bottom-1 before:h-0.5 before:bg-red-600 before:hover:w-full before:transition-all before:duration-200 ${isActive ? "before:!w-full font-semibold" : ""}`
              }>Orders</NavLink>
            </li>
          </ul>

          
          <NavLink to="/cart" className="cart cursor-pointer relative md:ml-auto  md:mt-0">
            <i className="fa-solid fa-cart-shopping text-lg"></i>
            <div className="cart-counter  absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-primary-600 text-white h-5 w-5 rounded-full">
              {cartInfo == null ? (
                <i className="fa-solid fa-spinner fa-spin text-sm"></i>
              ) : (
                <span className="text-white text-sm">{cartInfo.numOfCartItems}</span>
              )}
            </div>
          </NavLink>
        </>
      )}

    
      <ul className="flex gap-2 mt-4 md:mt-0">
        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands text-pink-700 text-xl mr-2 hover:text-red-700 fa-instagram"></i></a></li>
        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands text-blue-700 text-xl mr-2 hover:text-red-700  fa-facebook"></i></a></li>
        <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands  text-xl mr-2 hover:text-red-700  fa-tiktok"></i></a></li>
        <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands text-red-500 text-xl mr-2 hover:text-red-700  fa-youtube"></i></a></li>
      </ul>

     
      <ul className="flex  gap-x-4 mt-4 md:mt-0">
        {!token ? (
          <>
            <li>
              <NavLink to="/signup" className={({ isActive }) =>
                `relative before:absolute before:w-0 before:left-0 before:-bottom-1 before:h-0.5 before:bg-red-600 before:hover:w-full before:transition-all before:duration-200 ${isActive ? "before:!w-full font-semibold" : ""}`
              }>Sign up</NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) =>
                `relative before:absolute before:w-0 before:left-0 before:-bottom-1 before:h-0.5 before:bg-red-600 before:hover:w-full before:transition-all before:duration-200 ${isActive ? "before:!w-full font-semibold" : ""}`
              }>Login</NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/logout" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket text-xl text-slate-700"></i>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>


        
      
    
    </>
  )
}

export default NavBar
