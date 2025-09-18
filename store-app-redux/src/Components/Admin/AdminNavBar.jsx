import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineCancel, MdLogout } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

const AdminNavBar = () => {
    const [isSideBarOpen, setSideBarOpen] = React.useState(false);
    const nav = useNavigate();

    const navItems = [
        { name: "Dashboard", icon: IoHomeSharp, path: "/admin/dashboard" },
        { name: "Products", icon: AiFillProduct, path: "/admin/product" },
        { name: "Orders", icon: FaShippingFast, path: "/admin/orders" },
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
        <div className="bg-white text-gray-800 flex min-h-screen">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out
          ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}
          w-64 bg-white shadow-md`}
            >
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Admin</h1>
                        <button onClick={toggleSidebar}>
                            <MdOutlineCancel className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-2 flex-grow">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                        isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-200"
                                    }`
                                }
                                onClick={() => setSideBarOpen(false)}
                            >
                                <item.icon className="h-6 w-6" />
                                <span className="text-lg">{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-red-500 text-white hover:bg-red-600 mt-auto"
                    >
                        <MdLogout className="h-6 w-6" />
                        <span className="text-lg">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className=" p-4 md:p-8 ">
                {/* Menu button */}
                {!isSideBarOpen && (
                    <div className="mb-4">
                        <button onClick={toggleSidebar}>
                            <IoMdMenu className="h-8 w-8" />
                        </button>
                    </div>
                )}

                {/* Render child routes */}
                <div className="   h-full">
                    <div className="min-h-[70vh]">
                        {/* Child route content */}
                        <React.Suspense fallback={<p>Loading...</p>}>
                            {/* Will render whatever child route is active */}
                        </React.Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNavBar;
