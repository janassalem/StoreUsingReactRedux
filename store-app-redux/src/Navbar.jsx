import React from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from "./SearchBar.jsx";

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };


    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md rounded-lg flex items-center justify-between p-4 md:px-10">

            {/* Brand Logo and Home Link */}
            <div className="flex-shrink-0">
                <a href="#" className="flex items-center space-x-2" onClick={handleLinkClick}>
                    <div className="text-2xl font-bold text-gray-800">SHOP.CO</div>
                </a>
            </div>

            {/* Main Navigation Links (hidden on mobile, visible on desktop) */}
            <div className="hidden md:flex flex-1 justify-center space-x-8">
                <a href="#" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>Shop</a>
                <a href="#" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>On Sale</a>
                <a href="#" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>New Arrivals</a>
                <a href="#" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>Brands</a>
            </div>

            {/* Search and User Icons (hidden on mobile, visible on desktop) */}

            <div className="hidden md:flex items-center space-x-4 gap-4">
                <div>
                    <SearchBar />
                </div>

                {/*<button className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 focus:outline-none">*/}
                {/*    <IoSettingsSharp />*/}
                {/*</button>*/}

                <button className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 focus:outline-none">
                    <FaShoppingCart />
                </button>
                <button className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 focus:outline-none">
                    <IoPersonSharp />
                </button>
            </div>

            {/* Hamburger Menu Button (visible on mobile, hidden on desktop) */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-600 hover:text-indigo-600 focus:outline-none"
                >
                    {isMobileMenuOpen ? <IoMdClose /> : <IoMenu />}
                </button>
            </div>

            {/* Mobile Menu (conditionally rendered) */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden rounded-b-lg">
                    <div className="flex flex-col p-4 space-y-4">
                        <a href="#" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>Shop</a>
                        <a href="#" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>On Sale</a>
                        <a href="#" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>New Arrivals</a>
                        <a href="#" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>Brands</a>

                        <hr className="my-2" />
                        <button className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg focus:outline-none">
                            <IoSettingsSharp />
                            <span>Settings</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg focus:outline-none">
                            <IoNotifications />
                            <span>Notifications</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg focus:outline-none">
                            <IoPersonSharp />
                            <span>Profile</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
