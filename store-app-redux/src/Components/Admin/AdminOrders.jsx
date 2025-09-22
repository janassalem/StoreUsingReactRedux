import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders, updateOrder } from "../../features/Product/OrderSlice.js";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../Loader.jsx";

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
        <div className="container mx-auto p-6" style={{ color: "var(--text)" }}>
            <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--muted)", borderWidth: "1px" }}
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <h1
                    className="text-2xl font-bold mb-6"
                    style={{ color: "var(--text)" }}
                    data-aos="fade-right"
                    data-aos-delay="200"
                >
                    Recent Orders
                </h1>

                {isLoading && <Loader />}
                {error && <p style={{ color: "var(--error)" }}>{error}</p>}

                <div
                    className="overflow-x-auto max-h-[700px] overflow-y-auto"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <table className="w-full text-sm">
                        <thead
                            className="sticky top-0 z-10"
                            style={{ backgroundColor: "var(--bg)" }}
                        >
                        <tr style={{ color: "var(--muted)", textAlign: "left" }}>
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
                                className="transition-colors"
                                style={{ backgroundColor: "var(--bg)" }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--muted, #f3f4f6)"}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--bg)"}
                                data-aos="fade-up"
                                data-aos-delay={400 + index * 100}
                            >
                                <td style={{ color: "var(--text)" }} className="py-3 px-4 font-semibold">
                                    #{order.id}
                                </td>
                                <td style={{ color: "var(--muted)" }} className="py-3 px-4">
                                    {order.items?.length || 0} items
                                </td>
                                <td style={{ color: "var(--muted)" }} className="py-3 px-4">
                                    ${order.total.toFixed(2)}
                                </td>
                                <td style={{ color: "var(--muted)" }} className="py-3 px-4">
                                    {order.date}
                                </td>
                                <td className="py-3 px-4">
                                    <select
                                        value={order.status || "Pending"}
                                        onChange={(e) =>
                                            handleStatusChange(order.id, e.target.value)
                                        }
                                        className="rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2"
                                        style={{ backgroundColor: "var(--muted, #f3f4f6)", color: "var(--text)", borderColor: "var(--accent)" }}
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
                                <td colSpan="5" style={{ color: "var(--muted)" }} className="text-center py-6">
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
