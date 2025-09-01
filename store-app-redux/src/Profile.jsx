import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders } from "./features/Product/OrderSlice.js";
import Loading from "./assets/Coming Soon Loading GIF by Exxeta.gif";
import AOS from "aos";
import "aos/dist/aos.css";
import PfpBackgroundImage from "./assets/PfpBackgroundImage.jpeg";
import PfpBackgroundImageW from  "./assets/PfpBackgroundImageWidth.jpeg";
import PopUp from "./PopUp.jsx";
import { motion } from "motion/react"


const Profile = () => {
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state.OrderSlice);
    // const { products } = useSelector((state) => state.ProductState);
    const [selectedOrder, setSelectedOrder] = useState(null);
    useEffect(() => {
        AOS.init({ once: false });
        dispatch(GetAllOrders());
    }, [dispatch]);

    if (error) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-red-600">
                Error: {error}
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-gray-700">
                <img src={Loading} alt="Loading..." className="w-32 h-32" />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-gray-500">
                No past orders available.
            </div>
        );
    }

    // Mock user info
    const userInfo = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
        address: "123 Main Street, Springfield",
    };

    return (
        <div className="flex max-w-6xl mx-auto py-10 gap-8 ">
            {/* Main Content */}
            <div className="flex-1">
                {/* Top Background Image */}
                <div className="relative w-full h-48 mb-20"
                     data-aos="fade-down">
                    <img
                        src={PfpBackgroundImageW}
                        alt="Profile Background"
                        className="w-full h-full object-cover rounded-xl shadow "
                    />
                    <img src={PfpBackgroundImage} alt="Profile" className="absolute -bottom-12 left-6 w-24 h-24 rounded-full border-4 border-white shadow-lg " />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                     data-aos="fade-right">
                    {/* User Info */}
                    <div className="bg-white shadow-md rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                        <p><span className="font-semibold">Name:</span> {userInfo.name}</p>
                        <p><span className="font-semibold">Email:</span> {userInfo.email}</p>
                        <p><span className="font-semibold">Phone:</span> {userInfo.phone}</p>
                        <p><span className="font-semibold">Address:</span> {userInfo.address}</p>
                    </div>

                    {/* Orders */}
                    <div className=" bg-white shadow-md rounded-xl p-6 w-full">
                        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
                        <ul className="space-y-4">
                            {orders.map((order) => (
                                <li
                                    key={order.id}
                                    className="rounded-lg p-4 flex flex-col gap-2 bg-gray-50 cursor-pointer hover:bg-gray-100"
                                    onClick={() => setSelectedOrder(order)}
                                    data-aos="fade-up"
                                >
                                    <p><span className="font-semibold">Order ID:</span> {order.id}</p>
                                    <p><span className="font-semibold">Total:</span> ${order.totalAmount || order.total}</p>
                                    <p><span className="font-semibold">Date:</span> {order.orderDate?.slice(0,10) ||order.date}</p>


                                </li>
                            ))}
                        </ul>
                    </div>
                        {/*<PopUp*/}
                    {selectedOrder && (
                        <PopUp  order={selectedOrder} onClose={() => setSelectedOrder(null)}/>
                    )}


                </div>
            </div>
        </div>
    );
};

export default Profile;
