import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {object,ref,string} from 'yup'
const SignUp = () => {
 const [emailErrorExit,setErrorEmail]=useState();
 const navgite=useNavigate();
  const passwordRegexs=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex=/^(02)?01[0125][0-9]{8}$/;
  const validationSchema=object({
    name:string().required("Name Is Required").min(3,"Name must be at least 3 characters").max(25,"Name can not be more than 25 characters"),
    email:string().required("Email Is Required").email("Email is Invalid"),
    password:string().required("Password Is Required").matches(passwordRegexs,"Password at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword:string().required("Confirm Password Is Required").oneOf([ref("password")],"Password and rePassword should be the same"),
    phone:string().required("Phone Is Required").matches(phoneRegex,"Sorry, We Accept Egyption Phone Numbers Only"),
  })
 async function SendDataToRegister(values){
const loadingId=  toast.loading("Waiting...");
  try{
    const options={
      url:'https://ecommerce.routemisr.com/api/v1/auth/signup',
      method:'POST',
      data:values
    }
  let {data}= await axios.request(options);
  if(data.message=='success'){
    toast.success("User Created Successfully");
    setTimeout(()=>{
     navgite("/login");
    },2000)
  }
  }catch(error){
    toast.error(error.response.data.message)
    setErrorEmail(error.response.data.message);
  }finally{
    toast.dismiss(loadingId);
  }
   
  }
  const formik=useFormik({
    initialValues:{
      "name": "",
      "email":"",
      "password":"",
      "rePassword":"",
      "phone":""
  },
  validationSchema,
  onSubmit:SendDataToRegister,
  })
  return (
    <>
    <div className='py-10'>
    <h1 className='flex items-center mb-3  gap-x-2 text-slate-700 text-xl'><i className="fa-solid fa-user"></i>  Register Now : </h1>
     <form action="" className='space-y-5 ' onSubmit={formik.handleSubmit}>
      <div className="name">
        <input type="text" name='name' className='w-full form-control p-2' placeholder='Type your name' 
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        {formik.errors.name&&formik.touched&&(<p className='mt-1 text-red-600 text-sm'>*{formik.errors.name}</p>)}
      </div>
      
      <div className="email">
        <input type="email" name='email' className='w-full form-control p-2' placeholder='Type your email' 
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
         {formik.errors.email&&formik.touched&&(<p className='mt-1 text-red-600 text-sm'>*{formik.errors.email}</p>)}
          {emailErrorExit&&(<p className='mt-1 text-red-600 text-sm'>*{emailErrorExit}</p>)}
      </div>
      <div className="password">
        <input type="password" name='password' className='w-full form-control p-2' placeholder='Type your password' 
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
         {formik.errors.password&&formik.touched&&(<p className='mt-1 text-red-600 text-sm'>*{formik.errors.password}</p>)}
      </div>
      <div className="rePassword">
        <input type="password" name='rePassword' className='w-full form-control p-2' placeholder='Confirm Password' 
        value={formik.values.rePassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
         {formik.errors.rePassword&&formik.touched&&(<p className='mt-1 text-red-600 text-sm'>*{formik.errors.rePassword}</p>)}
      </div>
      <div className="phone">
        <input type="tel" name='phone' className='w-full form-control p-2' placeholder='Phone Number' 
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
         {formik.errors.phone&&formik.touched&&(<p className='mt-1 text-red-600 text-sm'>*{formik.errors.phone}</p>)}
      </div>
      <button type='submit' className='btn w-full bg-primary-700 hover:bg-primary-800 text-white'>Sign Up</button>
     </form>
    </div>
  
    </>
  )
}

export default SignUp
