import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineCancel, MdLogout } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaShopify } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ModeSwitch from "../ModeSwitch.jsx";

const AdminNavBar = () => {
    const [isSideBarOpen, setSideBarOpen] = React.useState(false);
    const nav = useNavigate();

    const navItems = [
        { name: "Dashboard", icon: IoHomeSharp, path: "/admin/dashboard" },
        { name: "Products", icon: AiFillProduct, path: "/admin/product" },
        { name: "Orders", icon: FaShippingFast, path: "/admin/orders" },
        { name: "Home Page", icon: FaShopify, path: "/" },
    ];

    const toggleSidebar = () => {
        setSideBarOpen(!isSideBarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        nav("/log-in");
    };

    return (
        <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }} className="flex min-h-screen">
            {/* Sidebar */}
            <AnimatePresence>
                {isSideBarOpen && (
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
                        className="fixed top-0 left-0 h-screen z-40 w-64 shadow-lg"
                    >
                        <div className="p-6 flex flex-col h-full">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-8">
                                <motion.h1
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    style={{ color: "var(--text)" }}
                                    className="text-2xl font-bold"
                                >
                                    Admin Panel
                                </motion.h1>
                                <motion.button
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleSidebar}
                                    style={{ color: "var(--text)" }}
                                >
                                    <MdOutlineCancel className="h-6 w-6" />
                                </motion.button>
                            </div>

                            {/* Navigation Items */}
                            <nav className="flex flex-col space-y-2 flex-grow">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                                    isActive
                                                        ? "bg-gray-200 font-semibold"
                                                        : "hover:bg-gray-100"
                                                }`
                                            }
                                            onClick={() => setSideBarOpen(false)}
                                            style={{ color: "var(--text)" }}
                                        >
                                            <item.icon className="h-6 w-6" />
                                            <span className="text-lg">{item.name}</span>
                                        </NavLink>
                                    </motion.div>

                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ModeSwitch />
                                </motion.div>

                            </nav>

                            {/* Logout */}
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "var(--error)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                style={{ backgroundColor: "var(--error)", color: "var(--accent-text)" }}
                                className="flex items-center space-x-3 p-3 rounded-lg mt-auto"
                            >
                                <MdLogout className="h-6 w-6" />
                                <span className="text-lg">Logout</span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div
                className={`flex-1 transition-all duration-300 ${
                    isSideBarOpen ? "ml-0 md:ml-64" : "ml-0"
                } p-4 md:p-8`}
            >
                {!isSideBarOpen && (
                    <motion.button
                        onClick={toggleSidebar}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ color: "var(--text)" }}
                        className="mb-4"
                    >
                        <IoMdMenu className="h-8 w-8" />
                    </motion.button>
                )}

                {/* Render child routes */}
                <div className="h-full">
                    <div className="min-h-[70vh]">
                        <React.Suspense fallback={<p style={{ color: "var(--text)" }}>Loading...</p>}>
                            {/* Child route content */}
                        </React.Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNavBar;
