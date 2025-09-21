import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders, updateOrder } from "../../features/Product/OrderSlice.js";
import AOS from "aos";
import "aos/dist/aos.css";
import  Loader from "../Loader.jsx";

const AdminOrders = () => {
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state.OrderSlice);

    useEffect(() => {
        dispatch(GetAllOrders());
        AOS.init({ duration: 600, easing: "ease-out-quart" });
    }, [dispatch]);

    const handleStatusChange = (id, newStatus) => {
        dispatch(updateOrder({ id, updates: { status: newStatus } }));
    };

    return (
        <div className="container mx-auto p-6">
            <div
                className="bg-white rounded-2xl p-6"
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <h1
                    className="text-2xl font-bold mb-6 text-gray-800"
                    data-aos="fade-right"
                    data-aos-delay="200"
                >
                    Recent Orders
                </h1>

                {isLoading &&  <Loader />}
                {error && <p className="text-red-500">{error}</p>}

                <div
                    className="overflow-x-auto max-h-[700px] overflow-y-auto"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr className="text-gray-600 text-left">
                            <th className="py-3 px-4 font-medium">Order</th>
                            <th className="py-3 px-4 font-medium">Products</th>
                            <th className="py-3 px-4 font-medium">Total</th>
                            <th className="py-3 px-4 font-medium">Date</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={order.id}
                                className="hover:bg-gray-50 transition-colors"
                                data-aos="fade-up"
                                data-aos-delay={400 + index * 100} // stagger effect
                            >
                                <td className="py-3 px-4 font-semibold text-gray-800">
                                    #{order.id}
                                </td>
                                <td className="py-3 px-4 text-gray-700">
                                    {order.items?.length || 0} items
                                </td>
                                <td className="py-3 px-4 text-gray-700">
                                    ${order.total.toFixed(2)}
                                </td>
                                <td className="py-3 px-4 text-gray-500">{order.date}</td>
                                <td className="py-3 px-4">
                                    <select
                                        value={order.status || "Pending"}
                                        onChange={(e) =>
                                            handleStatusChange(order.id, e.target.value)
                                        }
                                        className="bg-gray-100 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}

                        {orders.length === 0 && !isLoading && (
                            <tr data-aos="fade-up" data-aos-delay="500">
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
