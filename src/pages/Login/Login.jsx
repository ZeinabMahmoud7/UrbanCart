import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {object,ref,string} from 'yup'
import { userContext } from '../../context/userContext';
const Login = () => {
  let {setToken}=useContext(userContext);
 const [incorrectEmailORpasswordError,SetincorrectEmailORpasswordError]=useState();
 const navgite=useNavigate();
  const passwordRegexs=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema=object({
    email:string().required("Email Is Required").email("Email is Invalid"),
    password:string().required("Password Is Required").matches(passwordRegexs,"Password at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
  })
 async function SendDataToLogin(values){
const loadingId=  toast.loading("Waiting...");
  try{
    const options={
      url:'https://ecommerce.routemisr.com/api/v1/auth/signin',
      method:'POST',
      data:values
    }
  let {data}= await axios.request(options);
  if(data.message=='success'){
    localStorage.setItem("token",data.token)
    setToken(data.token);
    toast.success("User Logged in Successfully");
    setTimeout(()=>{
     navgite("/");
    },2000)
  }
  }catch(error){
    toast.error(error.response.data.message)
      SetincorrectEmailORpasswordError(error.response.data.message);
  }finally{
    toast.dismiss(loadingId);
  }
   
  }
  const formik=useFormik({
    initialValues:{
    
      "email":"",
      "password":"",
   
  },
  validationSchema,
  onSubmit:SendDataToLogin,
  })
  return (
    <>
    <div className='py-10'>
    <h1 className='flex items-center mb-3  gap-x-2 text-slate-700 text-xl'><i className="fa-solid fa-user"></i>  Login Now : </h1>
     <form action="" className='space-y-5 ' onSubmit={formik.handleSubmit}>
   
      
      <div className="email">
        <input type="email" name='email' className='w-full form-control p-2' placeholder='Type your email' 
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
         {formik.errors.email&&formik.touched&&(<p className='mt-1 text-red-600 text-sm'>*{formik.errors.email}</p>)}
         {incorrectEmailORpasswordError&&(<p className='mt-1 text-red-600 text-sm'>*{incorrectEmailORpasswordError}</p>)}
      </div>
      <div className="password">
        <input type="password" name='password' className='w-full form-control p-2' placeholder='Type your password' 
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
         {formik.errors.password&&formik.touched&&(<p className='mt-1 text-red-600 text-sm'>*{formik.errors.password}</p>)}
      </div>
     
      <button type='submit' className='btn w-full bg-primary-700 hover:bg-primary-800 text-white'>Login</button>
     </form>
    </div>
  
    </>
  )
}

export default Login
