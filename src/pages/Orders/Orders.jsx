import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../context/userContext';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet';


const Orders = () => {
    const [userOrder, setUserOrder] = useState(null);

    let { token } = useContext(userContext);

 
    let { id } = jwtDecode(token);

    console.log("User ID:", id);

    async function getUserOrder() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, 
                method: 'GET',
            };
            const { data } = await axios.request(options);
            setUserOrder(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserOrder();
    }, []);

    return (
        <>
        <Helmet>
        <title>Order Page</title>
        </Helmet>
            {userOrder ? (
                userOrder.map((order) => (
                    <section className="border border-2 rounded rounded-md p-3 my-3" key={order.id}>
                        <div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-slate-400 ">Order ID</h3>
                                    <p className="font-bold text-slate-700">#{order.id}</p>
                                </div>
                                <div>
                                    {order.isDelivered ? (
                                        <span className="inline-block m-1 bg-primary-600 text-white p-2 rounded-3xl">تم التوصيل</span>
                                    ) : (
                                        <span className="inline-block m-1 bg-blue-500 text-white p-2 rounded-3xl">قيد التوصيل</span>
                                    )}
                                    {order.isPaid ? (
                                        <span className="inline-block m-1 bg-primary-600 text-white p-2 rounded-3xl">تم الدفع</span>
                                    ) : (
                                        <span className="inline-block m-1 bg-red-500 text-white p-2 rounded-3xl">غير مدفوع</span>
                                    )}
                                </div>
                            </div>
                            <div className='grid grid-cols-1  mt-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4'>
                            {order.cartItems.map((prod) => (
                                <div key={prod._id} className="">
                                    <div className="border border-2 rounded rounded-md p-3">
                                        <img
                                            className="w-full object-cover rounded-md"
                                            src={prod.product.imageCover}
                                            alt=""
                                        />
                                        <Link
                                            to={`/product/${prod.product.id}`}
                                            className="text-slate-800 font-bold my-4 line-clamp-2"
                                        >
                                            {prod.product.title}
                                        </Link>
                                        <div className="flex justify-between items-center">
                                            <span className="flex justify-between items-center">
                                                <p className="underline underline-offset-1 font-bold">count: </p>
                                                {prod.count}
                                            </span>
                                            <span>{prod.price} L.E</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                         
                        </div>
                        <p className="my-4 text-slate-700 font-bold">
                            Your Total Order Price is <span className="text-primary-600">{order.totalOrderPrice}</span>L.E
                        </p>
                    </section>
                ))
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Orders;
