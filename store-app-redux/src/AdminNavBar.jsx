import React from "react";
import Dashboard from "./Dashboard.jsx";
import { IoHomeSharp } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import AdminProducts from "./AdminProducts.jsx";

const AdminNavBar = () => {
    const [isSideBarOpen, setSideBarOpen] = React.useState(false);
    const [activeComponent, setActiveComponent] = React.useState("Dashboard");

    const navItems = [
        { name: "Dashboard", icon: IoHomeSharp, component: Dashboard },
        { name: "Products", icon: AiFillProduct, component: AdminProducts },
    ];

    const toggleSideBar = () => setSideBarOpen(!isSideBarOpen);

    const handleNavClick = (ComponentName) => {
        setActiveComponent(ComponentName);
        setSideBarOpen(false);
    };

    const CurrentComponent =
        navItems.find((item) => item.name === activeComponent)?.component || Dashboard;

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
                        <h1 className="text-2xl font-bold">Menu</h1>
                        <button onClick={toggleSideBar}>
                            <MdOutlineCancel className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => handleNavClick(item.name)}
                                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors w-full text-left
                  ${activeComponent === item.name ? "bg-gray-200" : "hover:bg-gray-200"}`}
                            >
                                <item.icon className="h-6 w-6" />
                                <span className="text-lg">{item.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isSideBarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-20 z-30"
                    onClick={toggleSideBar}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                {/* Menu button (always visible) */}
                <div className="mb-4">
                    <button onClick={toggleSideBar}>
                        <IoMdMenu className="h-8 w-8" />
                    </button>
                </div>

                {/* Render the selected component */}
                <CurrentComponent />
            </div>
        </div>
    );
};

export default AdminNavBar;
