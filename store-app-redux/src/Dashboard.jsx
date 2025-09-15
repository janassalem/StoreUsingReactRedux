import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { FaUsers, FaDollarSign, FaChartLine, FaUserPlus } from "react-icons/fa";
import { GetAllOrders } from "./features/Product/OrderSlice.js";
import { GetAllProducts } from "./features/Product/productSlice.js";
import AdminNavBar   from "./AdminNavBar.jsx";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { orders, isLoading: ordersLoading, error: ordersError } = useSelector((state) => state.OrderSlice);
    const { products, isLoading: productsLoading } = useSelector((state) => state.ProductState);
    const { cartItems, subtotal, discount, total } = useSelector((state) => state.CartState);
    const { user } = useSelector((state) => state.AuthSlice);

    useEffect(() => {
        dispatch(GetAllOrders());
        dispatch(GetAllProducts());
    }, [dispatch]);

    // Derive sales data from orders (group by month)
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

    // Example active users
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
        { title: "Cart Subtotal", value: `$${subtotal}`, change: "+5%", icon: <FaDollarSign /> },
        { title: "Products", value: products.length, change: "+12%", icon: <FaUsers /> },
        { title: "Orders", value: orders.length, change: "+8%", icon: <FaChartLine /> },
        { title: "Discount", value: `$${discount}`, change: "-2%", icon: <FaUserPlus /> },
    ];
    // Sort orders by createdAt (newest first)
    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    if (ordersLoading || productsLoading) return <p>Loading dashboard...</p>;
    if (ordersError) return <p className="text-red-500">Error: {ordersError}</p>;

    return (
        <div className="min-h-screen bg-white text-black p-8">

            <h1 className="text-3xl font-extrabold mb-8">Dashboard Overview</h1>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">{item.title}</p>
                            <h2 className="text-2xl font-bold">{item.value}</h2>
                            <p className={`text-sm ${item.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                                {item.change}
                            </p>
                        </div>
                        <div className="text-3xl text-gray-700">{item.icon}</div>
                    </div>
                ))}
            </div>

            {/* Sales + Active Users */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Sales Overview</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={salesData}>
                            <XAxis  dataKey="month" stroke="#000" />
                            <YAxis stroke="#000" />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="#1d4ed8" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Active Users</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={activeUsers}>
                            <XAxis dataKey="name" stroke="#000" />
                            <YAxis stroke="#000" />
                            <Tooltip />
                            <Bar dataKey="users" fill="#1d4ed8" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>




        </div>
    );
};

export default Dashboard;
