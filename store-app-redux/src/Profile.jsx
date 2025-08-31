import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders } from "./features/Product/OrderSlice.js";
import Loading from "./assets/Coming Soon Loading GIF by Exxeta.gif";
import AOS from "aos";
import "aos/dist/aos.css";
import PfpBackgroundImage from "./assets/PfpBackgroundImage.jpeg";
import PfpBackgroundImageW from  "./assets/PfpBackgroundImageWidth.jpeg";

const Profile = () => {
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state.OrderSlice);

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
        <div className="flex max-w-6xl mx-auto  py-10 gap-8">
            {/* Left Side Image */}
            {/*<div className="hidden lg:flex flex-col ">*/}
            {/*    <img*/}
            {/*        src={PfpBackgroundImage}*/}
            {/*        alt="Profile Side"*/}
            {/*        className="w-90 h-150 "*/}
            {/*    />*/}
            {/*</div>*/}

            {/* Main Content */}
            <div className="flex-1">
                {/* Top Background Image */}
                <div className="relative w-full h-48 mb-20">
                    <img
                        src={PfpBackgroundImageW}
                        alt="Profile Background"
                        className="w-full h-full object-cover rounded-xl shadow "
                    />
                    <img src={PfpBackgroundImage} className="absolute -bottom-12 left-6 w-24 h-24 rounded-full  border-4 border-white shadow-lg " />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Info */}
                    <div className="bg-white shadow-md rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                        <p><span className="font-semibold">Name:</span> {userInfo.name}</p>
                        <p><span className="font-semibold">Email:</span> {userInfo.email}</p>
                        <p><span className="font-semibold">Phone:</span> {userInfo.phone}</p>
                        <p><span className="font-semibold">Address:</span> {userInfo.address}</p>
                    </div>

                    {/* Orders */}
                    <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
                        <ul className="space-y-4">
                            {orders.map((order, index) => (
                                <li
                                    key={index}
                                    className="border rounded-lg p-4 flex flex-col gap-2 bg-gray-50"
                                    data-aos="fade-up"
                                >
                                    <p><span className="font-semibold">Order ID:</span> {order.id || index + 1}</p>
                                    <p><span className="font-semibold">Items:</span>{" "}
                                        {order.items?.map((i) => i.name || i.id).join(", ")}
                                    </p>
                                    <p><span className="font-semibold">Total:</span> ${order.total}</p>
                                    <p><span className="font-semibold">Date:</span> {order.date || "N/A"}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
