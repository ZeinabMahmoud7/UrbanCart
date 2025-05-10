import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

const Layout = () => {
  return (
    <>
    <NavBar/>
    <div className='container pt-20 mt-20'>
    <Outlet></Outlet>
    </div>
  
    <Footer/>
    </>
  )
}

export default Layout
