import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import AOS from "aos";
import {GetAllOrders} from "./features/Product/OrderSlice.js";
import {logout} from "./features/Auth/authSlice.js";
import Loading from "./assets/Coming Soon Loading GIF by Exxeta.gif";
import NotUser from "./NotUser.jsx";
import PfpBackgroundImageW from "./assets/PfpBackgroundImageWidth.jpeg";
import PfpBackgroundImage from "./assets/PfpBackgroundImage.jpeg";
import {IoLogOut} from "react-icons/io5";
import PopUp from "./PopUp.jsx";




const Dashboard = () => {

    const dispatch = useDispatch();
    const nav = useNavigate();
    const [user, setUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { orders, isLoading, error } = useSelector((state) => state.OrderSlice);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser[0]);
        }
        AOS.init({ once: true });
        dispatch(GetAllOrders());
    }, [dispatch]);

    // useEffect(() => {
    //     if (user.name=="admin") {
    //         setUserOrders(orders.filter((order) => order.userID === user.id));
    //     }
    // }, [orders, user]);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        nav("../");
    };

    if (user?.name !== "admin") return <NotUser />;
    if (error) return <div className="flex justify-center items-center py-20 text-xl text-red-600">Error: {error}</div>;
    if (isLoading)
        return (
            <div className="flex justify-center items-center py-20 text-xl text-gray-700">
                <img src={Loading} alt="Loading..." className="w-32 h-32" />
            </div>
        );
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
                <div>
                    <div className="px-6 py-6 text-indigo-600 font-bold text-xl">Admin Dashboard</div>
                    <nav className="px-4 space-y-2">
                        <button className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 transition">
                            <IoHomeOutline className="mr-3 text-indigo-600" /> Dashboard
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 transition">
                            <IoListOutline className="mr-3 text-indigo-600" /> Orders
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 transition">
                            <IoPersonOutline className="mr-3 text-indigo-600" /> Profile
                        </button>
                    </nav>
                </div>
                <div className="px-4 py-6">
                    <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                        <IoLogOut className="mr-3" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 px-8 py-8">
                {/* Profile Header */}
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

                {/* Profile & Orders */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Info */}
                    <div className="bg-white shadow-md rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4 text-indigo-600">My Profile</h2>
                        <p><span className="font-semibold">Name:</span> {user.name}</p>
                        <p><span className="font-semibold">Email:</span> {user.email}</p>
                        <p><span className="font-semibold">Phone:</span> {user.phone}</p>
                        <p><span className="font-semibold">Address:</span> {user.address}</p>
                    </div>

                    {/* Orders Table */}
                    <div className="bg-white shadow-md rounded-xl p-6 lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-4 text-indigo-600">My Orders</h2>
                        {userOrders.length === 0 ? (
                            <p className="text-gray-500">No past orders available.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left border-collapse">
                                    <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 text-sm font-semibold text-gray-700">Order ID</th>
                                        <th className="px-4 py-2 text-sm font-semibold text-gray-700">Total</th>
                                        <th className="px-4 py-2 text-sm font-semibold text-gray-700">Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            onClick={() => setSelectedOrder(order)}
                                            className="cursor-pointer hover:bg-indigo-50 transition"
                                        >
                                            <td className="px-4 py-2">{order.id}</td>
                                            <td className="px-4 py-2">${order.totalAmount || order.total}</td>
                                            <td className="px-4 py-2">{order.orderDate?.slice(0, 10) || order.date}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {selectedOrder && <PopUp order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
            </main>
        </div>
)
};

export default Dashboard