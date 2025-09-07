import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders } from "./features/Product/OrderSlice.js";
import Loading from "./assets/Coming Soon Loading GIF by Exxeta.gif";
import AOS from "aos";
import "aos/dist/aos.css";
import PfpBackgroundImage from "./assets/PfpBackgroundImage.jpeg";
import PfpBackgroundImageW from "./assets/PfpBackgroundImageWidth.jpeg";
import PopUp from "./PopUp.jsx";
import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { logout } from "./features/Auth/authSlice.js";
import NotUser from "./NotUser.jsx";

const Profile = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const { orders, isLoading, error } = useSelector((state) => state.OrderSlice);

    const [user, setUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // init
    useEffect(() => {
        AOS.init({ once: false });
        dispatch(GetAllOrders());

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser[0]) {
            setUser(storedUser[0]);
        }
    }, [dispatch]);

    // filter orders when user/ orders are ready
    useEffect(() => {
        if (user) {
            setUserOrders(orders.filter((order) => order.userID === user.id));
        }
    }, [orders, user]);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        nav("/");
    };

    if (error) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-red-600">
                Error: {error}
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <img src={Loading} alt="Loading..." className="w-32 h-32" />
            </div>
        );
    }

    if (!user) {
        return (
          <NotUser/>
        );
    }

    return (
        <div className="flex max-w-6xl mx-auto py-10 gap-8 ">
            <div className="flex-1">
                {/* Top Background */}
                <div className="relative w-full h-48 mb-20" data-aos="fade-down">
                    <img
                        src={PfpBackgroundImageW}
                        alt="Profile Background"
                        className="w-full h-full object-cover rounded-xl shadow"
                    />
                    <img
                        src={PfpBackgroundImage}
                        alt="Profile"
                        className="absolute -bottom-12 left-6 w-24 h-24 rounded-full border-4 border-white shadow-lg"
                    />
                </div>

                <div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    data-aos="fade-right"
                >
                    {/* User Info */}
                    <div className="bg-white shadow-md rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                        <p>
                            <span className="font-semibold">Name:</span> {user.name}
                        </p>
                        <p>
                            <span className="font-semibold">Email:</span> {user.email}
                        </p>
                        <p>
                            <span className="font-semibold">Phone:</span> {user.phone}
                        </p>
                        <p>
                            <span className="font-semibold">Address:</span> {user.address}
                        </p>
                        <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="mt-4 flex items-center justify-center gap-2 px-4 py-2
             text-white bg-red-500 hover:bg-red-600
             rounded-lg shadow-sm transition-all duration-200
             disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <IoLogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>

                    </div>

                    {/* Orders */}
                    <div className="bg-white shadow-md rounded-xl p-6 w-full">
                        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
                        {userOrders.length === 0 ? (
                            <p className="text-gray-500">No past orders available.</p>
                        ) : (
                            <ul className="space-y-4">
                                {userOrders.map((order) => (
                                    <li
                                        key={order.id}
                                        className="rounded-lg p-4 flex flex-col gap-2 bg-gray-50 cursor-pointer hover:bg-gray-100"
                                        onClick={() => setSelectedOrder(order)}
                                        data-aos="fade-up"
                                    >
                                        <p>
                                            <span className="font-semibold">Order ID:</span>{" "}
                                            {order.id}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Total:</span> $
                                            {order.totalAmount || order.total}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Date:</span>{" "}
                                            {order.orderDate?.slice(0, 10) || order.date}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* PopUp */}
                    {selectedOrder && (
                        <PopUp
                            order={selectedOrder}
                            onClose={() => setSelectedOrder(null)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
