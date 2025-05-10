import { createContext, useContext, useState } from "react";
import { userContext } from "./userContext";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext=createContext(null);
export default  function CartProvider({children}){
    let {token}=useContext(userContext)
    const [cartInfo,SetcartInfo]=useState(null);
    async function addProductToCart({productId}){
        const toastId= toast.loading("added...");
        try{
            const options={
                url:'https://ecommerce.routemisr.com/api/v1/cart',
                method:'POST',
                headers:{
                    token,
                },
               data:{
                productId,
               }
               }
               const {data}=await axios.request(options);
               getCartProduct();
               if(data.status=='success'){
                toast.success(data.message);
               }
        }catch(error){
            toast.error("error");
         console.log(error);
        }finally{
            toast.dismiss(toastId); 
        }
         
         }
      
         async function getCartProduct(){
            try{
             const option={
                url:'https://ecommerce.routemisr.com/api/v1/cart',
                method:'GET',
                headers:{
                    token,
                }
             }
             let {data}=await axios.request(option);
             console.log(data);
             SetcartInfo(data);
            }catch(error){
            console.log(error);
            }finally{

            }
         }
         async function removeSpecificItem({prodID}){
        let toastId=   toast.loading("Deleting...");
            try{
             const option={
                url:`https://ecommerce.routemisr.com/api/v1/cart/${prodID}`,
                method:'DELETE',
                headers:{
                    token,
                }
             }
             let {data}=await axios.request(option);
             if(data.status=='success'){
                toast.success("Product has been Deleted");
               }
             console.log(data);
             SetcartInfo(data);
            }catch(error){
            console.log(error);
            }finally{
               toast.dismiss(toastId);
            }
         }
         async function deleteCart() {
            const options={
                url:'https://ecommerce.routemisr.com/api/v1/cart',
                method:'DELETE',
                headers:{
                    token,
                }
            }
            let {data}=await axios.request(options);
            if(data.message=='success'){
                SetcartInfo({
                    numOfCartItems:0
                });
            }
            console.log(data);
         }
         async function updateItem({prodID,count}) {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/cart/${prodID}`,
                method:'PUT',
                headers:{
                    token,
                },
                data:{
                    count,
                }
            }
            let {data}=await axios.request(options);
            console.log(data);
            if(data.status=='success'){
                SetcartInfo(data);
            }
         }
    return <cartContext.Provider value={{addProductToCart,getCartProduct,cartInfo,removeSpecificItem,deleteCart,updateItem}}>
        {children}
    </cartContext.Provider>
}