import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders, updateOrder } from "./features/Product/OrderSlice.js";

const AdminProducts = () => {
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state.OrderSlice);

    useEffect(() => {
        dispatch(GetAllOrders());
    }, [dispatch]);

    const handleStatusChange = (id, newStatus) => {
        const filter=orders.find((item)=>item.id === id)
        dispatch(updateOrder({ id, updates: { ...filter , status: newStatus } }));
    };

    return (
        <div className="container mx-auto">
            <div className="bg-white p-2">
                <h1 className="text-xl font-bold mb-4">Recent Orders</h1>

                {isLoading && <p>Loading orders...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* Max height with scroll */}
                <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
                    <table className="w-full border border-gray-200 rounded-xl text-sm">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                        <tr>
                            <th className="py-3 px-4 text-left">Order ID</th>
                            <th className="py-3 px-4 text-left">Products</th>
                            <th className="py-3 px-4 text-left">Total</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="py-3 px-4 font-medium text-gray-800">
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
                                        className="border rounded px-2 py-1 text-sm"
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
                            <tr>
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

export default AdminProducts;
