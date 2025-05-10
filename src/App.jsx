import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import toast, { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import GuestRoute from "./components/GuestRoute/GuestRoute"
import UserProvider from "./context/userContext"
import CartProvider from "./context/cartContext"
import CartProduct from "./pages/CartProduct/CartProduct"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import Checkout from "./pages/Checkout/checkout"
import Orders from "./pages/Orders/Orders"
import Product from "./pages/Product/Product"
import Category from "./pages/Category/Category"
import CategoryDetails from "./pages/CategoryDetails/CategoryDetails"
import Brands from "./components/Brands/Brands"
import BrandDetails from "./pages/BrandsDetails/BrandDetails"
import Online from "./components/Online/Online"
import Offline from "./components/offline/Offline"
import wifislash from '../src/assets/images/wifi-slash.png';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
function App() {
const router = createBrowserRouter(
  [
    {path:"/", 
      element:(<ProtectedRoute>
        <Layout/>
      </ProtectedRoute>),
      children:[
        { index:true, element:<Home/>},
        {path:'cart',element:<CartProduct/>},
        {path:'product/:id',element:<ProductDetails/>},
        {path:'checkout',element:<Checkout/>},
        {path:'alloreders',element:<Orders/>},
        {path:'products',element:<Product/>},
        {path:'categories',element:<Category/>},
        {path:'categories/:id',element:<CategoryDetails/>},
        {path:'brands',element:<Brands/>},
        {path:'brands/:id',element:<BrandDetails/>},
      ]
    },
    {
      path:'/',
      element:(<GuestRoute>
        <Layout></Layout>
      </GuestRoute>),
      children:[
        {path:'login',element:<Login/>},
        {path:'signup',element:<SignUp/>},
      ]
    }
  ]
) 
  let myClient= new QueryClient();
  return (
    <>
  
    <QueryClientProvider client={myClient}>
    <Online>
      <UserProvider>
        <CartProvider>
        <RouterProvider router={router} />
        </CartProvider>
        <Toaster />
      </UserProvider>
      </Online>
    <Offline>
      <div className="container flex flex-col justify-center items-center my-8">
      <div className="text-black w-full p-5 h-full  flex flex-col justify-center items-center border border-red-600 rounded-md shadow-md">
        <img className="w-1/4" src={wifislash} alt="" />
        <p className="my-3 font-bold text-slate-600">No internet connection found.
        Please check your connection or try again</p>
      </div>
      </div>
     
    </Offline>
    </QueryClientProvider>
    </>
  )
}

export default App
