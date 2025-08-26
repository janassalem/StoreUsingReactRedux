import React from 'react';
import { Link } from 'react-router-dom';
import { IoSettingsSharp, IoNotifications, IoPersonSharp, IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from "./SearchBar.jsx";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);


    const { cartItems } = useSelector((state) => state.CartState);
    const cartItemCount =  cartItems.length;

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md rounded-lg flex items-center justify-between p-4 md:px-10">
            {/* Brand Logo and Home Link */}
            <div className="flex-shrink-0">
                <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
                    <div className="text-2xl font-bold text-gray-800">SHOP.CO</div>
                </Link>
            </div>

            {/* Main Navigation Links */}
            <div className="hidden md:flex flex-1 justify-center space-x-8">
                <Link to="/all-products" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>Shop</Link>
                <Link to="/on-sale" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>On Sale</Link>
                <Link to="/new-arrivals" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>New Arrivals</Link>
                <Link to="/brands" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>Brands</Link>
            </div>

            {/* Search and User Icons  */}
            <div className="hidden md:flex items-center space-x-4 gap-4">
                <div>
                    <SearchBar />
                </div>

                {/* Cart Icon Link with Item Count */}
                <Link to="/Cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors duration-200 focus:outline-none">
                    <FaShoppingCart size={24} />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </Link>

                {/* Profile Icon Link */}
                <Link to="/profile" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 focus:outline-none">
                    <IoPersonSharp size={24} />
                </Link>
            </div>

            {/* Hamburger Menu Button  */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-600 hover:text-indigo-600 focus:outline-none"
                >
                    {isMobileMenuOpen ? <IoMdClose size={24} /> : <IoMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu  */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden rounded-b-lg">
                    <div className="flex flex-col p-4 space-y-4">
                        <div className="flex flex-row items-center justify-center gap-10 mb-0 ">
                            <Link to="/cart" className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg focus:outline-none relative" onClick={handleLinkClick}>
                                <FaShoppingCart size={20} />
                                {/*<span>Cart</span>*/}
                                {cartItemCount > 0 && (
                                    <span className="absolute left-5 -top-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                                )}
                            </Link>
                            <Link to="/profile" className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg focus:outline-none" onClick={handleLinkClick}>
                                <IoPersonSharp size={20} />
                                {/*<span>Profile</span>*/}
                            </Link>
                            <Link to="/settings" className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg focus:outline-none" onClick={handleLinkClick}>
                                <IoSettingsSharp size={20} />
                                {/*<span>Settings</span>*/}
                            </Link>

                        </div>



                        <hr className="my-2" />

                        <Link to="/all-products" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>Shop</Link>
                        <Link to="/on-sale" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>On Sale</Link>
                        <Link to="/new-arrivals" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>New Arrivals</Link>
                        <Link to="/brands" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>Brands</Link>

                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;