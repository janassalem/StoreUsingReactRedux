import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllOrders } from "../features/Product/OrderSlice.js";
import Loading from "../assets/Coming Soon Loading GIF by Exxeta.gif";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "motion/react";

const PopUp = ({ order }) => {
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state.OrderSlice);

    useEffect(() => {
        AOS.init({ once: false });
        dispatch(GetAllOrders());
    }, [dispatch]);

    if (error) {
        return (
            <div
                className="flex justify-center items-center py-20 text-xl"
                style={{ color: "var(--error)" }}
            >
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

    if (!orders.length) {
        return (
            <div
                className="flex justify-center items-center py-20 text-xl"
                style={{ color: "var(--muted)" }}
            >
                No past orders available.
            </div>
        );
    }

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
            >
                <div
                    className="shadow-md rounded-xl p-6 w-full"
                    style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
                >
                    <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                    <ul className="space-y-4">
                        {[order].map((order) => (
                            <li
                                key={order.id}
                                className="rounded-lg p-4 flex flex-col gap-2"
                                style={{
                                    backgroundColor: "var(--bg)",
                                    border: "1px solid var(--muted)",
                                }}
                                data-aos="fade-up"
                            >
                                <p>
                                    <span className="font-semibold">Order ID:</span> {order.id}
                                </p>
                                <p>
                                    <span className="font-semibold">Total:</span> ${order.totalAmount || order.total}
                                </p>
                                <p>
                                    <span className="font-semibold">Date:</span> {order.orderDate?.slice(0,10) || order.date}
                                </p>

                                <div className="mt-4">
                                    <h4 className="font-semibold">Items:</h4>
                                    <div className="space-y-2">
                                        {order.items?.map((item) =>
                                            item ? (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-4 p-2 rounded-md"
                                                    style={{ backgroundColor: "var(--bg)" }}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-16 h-16 object-contain rounded-md"
                                                    />
                                                    <div>
                                                        <p style={{ color: "var(--text)" }} className="font-medium">{item.title}</p>
                                                        <p style={{ color: "var(--muted)" }} className="text-sm">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p
                                                    key={item.id}
                                                    className="text-sm"
                                                    style={{ color: "var(--error)" }}
                                                >
                                                    Product not found for ID: {item.id}
                                                </p>
                                            )
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

export default PopUp;
