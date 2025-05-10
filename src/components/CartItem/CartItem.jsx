import React, { useContext } from 'react';
import { cartContext } from '../../context/cartContext';
import { NavLink } from 'react-router-dom';

const CartItem = ({cartinfo}) => {
    const{product,count,price}=cartinfo;
    const{imageCover,title,category,id}=product;
    let {removeSpecificItem,updateItem}=useContext(cartContext);
  return (
    <>
   
      <div className="flex justify-center items-center gap-2 ">
        <div className="bg-slate-100 text-center  space-y-5 rounded-lg  md:flex md:justify-between md:items-center p-2 grow h-full">
          <img
            className=" m-auto md:m-0 h-24  w-24 object-cover  rounded-full"
            src={imageCover}
            alt={title}
          />
          <h2 className="text-slate-800 font-semibold ">
            <NavLink to={`/product/${id}`}> {title}</NavLink>
           
            </h2>
          <h4 className="text-slate-500 ">{category.name}</h4>
          <div
           className="  flex justify-center md:justify-normal gap-4 items-center">
            <span>{count}</span>
            <div className="space-y-1">
              <div  onClick={()=>{
            updateItem({prodID:id,count:count+1})
          }}
               className="pluse bg-slate-700 w-5 h-5 flex justify-center items-center rounded-full">
                <i className="fa-solid fa-plus text-sm text-white"></i>
              </div>
              <div  onClick={()=>{
            updateItem({prodID:id,count:count-1})
          }} className="minus bg-slate-700 w-5 h-5 flex justify-center items-center rounded-full">
                <i className="fa-solid fa-minus text-sm text-white"></i>
              </div>
            </div>
          </div>
          <div className="price">{price} EGP</div>
        </div>
   
        <button onClick={()=>{
            removeSpecificItem({prodID:id});
        }}
         className="delete bg-slate-100 rounded-lg h-16 flex items-center p-1 justify-center">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </>
  );
};

export default CartItem;
