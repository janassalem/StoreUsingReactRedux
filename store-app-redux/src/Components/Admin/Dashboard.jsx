import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import { FaUsers, FaDollarSign, FaChartLine, FaUserPlus } from "react-icons/fa";
import { GetAllOrders } from "../../features/Product/OrderSlice.js";
import { GetAllProducts } from "../../features/Product/productSlice.js";
import { motion } from "framer-motion";
import Loader from "../Loader.jsx"

const Dashboard = () => {
    const dispatch = useDispatch();

    const { orders, isLoading: ordersLoading, error: ordersError } = useSelector(
        (state) => state.OrderSlice
    );
    const { products, isLoading: productsLoading } = useSelector(
        (state) => state.ProductState
    );
    const { subtotal, discount } = useSelector((state) => state.CartState);

    useEffect(() => {
        dispatch(GetAllOrders());
        dispatch(GetAllProducts());
    }, [dispatch]);

    const salesData = orders.reduce((acc, order) => {
        const date = new Date(order.createdAt || Date.now());
        const month = date.toLocaleString("default", { month: "short" });
        const existing = acc.find((d) => d.month === month);
        if (existing) {
            existing.sales += order.total || 0;
        } else {
            acc.push({ month, sales: order.total || 0 });
        }
        return acc;
    }, []);

    const activeUsers = [
        { name: "Mon", users: Math.floor(Math.random() * 300) },
        { name: "Tue", users: Math.floor(Math.random() * 300) },
        { name: "Wed", users: Math.floor(Math.random() * 300) },
        { name: "Thu", users: Math.floor(Math.random() * 300) },
        { name: "Fri", users: Math.floor(Math.random() * 300) },
        { name: "Sat", users: Math.floor(Math.random() * 300) },
        { name: "Sun", users: Math.floor(Math.random() * 300) },
    ];

    const stats = [
        {
            title: "Cart Subtotal",
            value: `$${subtotal}`,
            change: "+5%",
            icon: <FaDollarSign />,
        },
        {
            title: "Products",
            value: products.length,
            change: "+12%",
            icon: <FaUsers />,
        },
        {
            title: "Orders",
            value: orders.length,
            change: "+8%",
            icon: <FaChartLine />,
        },
        {
            title: "Discount",
            value: `$${discount}`,
            change: "-2%",
            icon: <FaUserPlus />,
        },
    ];

    if (ordersLoading || productsLoading) return <Loader />;
    if (ordersError) return <p style={{ color: "var(--error)" }}>Error: {ordersError}</p>;

    return (
        <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }} className="min-h-screen p-8">
            <h1 className="text-3xl font-extrabold mb-8">Dashboard Overview</h1>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((item, i) => (
                    <div
                        key={i}
                        style={{ backgroundColor: "var(--bg)", borderColor: "var(--muted)" }}
                        className="rounded-2xl p-6 shadow-md border flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <div>
                            <p style={{ color: "var(--muted)" }} className="text-sm">{item.title}</p>
                            <h2 style={{ color: "var(--text)" }} className="text-2xl font-bold">{item.value}</h2>
                            <p
                                style={{ color: item.change.startsWith("+") ? "var(--success)" : "var(--error)" }}
                                className="text-sm"
                            >
                                {item.change}
                            </p>
                        </div>
                        <div style={{ color: "var(--muted)" }} className="text-3xl">{item.icon}</div>
                    </div>
                ))}
            </div>

            {/* Sales + Active Users */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <motion.div
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--muted)" }}
                    className="p-6 rounded-2xl shadow-md border"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h3 style={{ color: "var(--text)" }} className="text-lg font-bold mb-4">Sales Overview</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={salesData}>
                            <XAxis dataKey="month" stroke="var(--text)" />
                            <YAxis stroke="var(--text)" />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="var(--accent)"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--muted)" }}
                    className="p-6 rounded-2xl shadow-md border"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <h3 style={{ color: "var(--text)" }} className="text-lg font-bold mb-4">Active Users</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={activeUsers}>
                            <XAxis dataKey="name" stroke="var(--text)" />
                            <YAxis stroke="var(--text)" />
                            <Tooltip />
                            <Bar dataKey="users" fill="var(--accent)" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
