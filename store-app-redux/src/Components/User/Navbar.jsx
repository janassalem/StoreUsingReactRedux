import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { IoSettingsSharp, IoPersonSharp, IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from "./SearchBar.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineLogout } from "react-icons/md";
import { logout } from '../../features/Auth/authSlice.js';
import { CgProfile } from "react-icons/cg";
import "aos/dist/aos.css";

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = React.useState(false);
    const nav = useNavigate();
    const { cartItems } = useSelector((state) => state.CartState);
    const cartItemCount = cartItems.length;

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        localStorage.removeItem("token");
        nav("/"); // 👈 redirect to homepage instead of /profile
    };

    const handleLinkClick = () => setMobileMenuOpen(false);


    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md rounded-lg flex items-center justify-between p-4 md:px-10"
             data-aos="fade-down"
             data-aos-anchor-placement="top-center">
            {/* Brand Logo */}
            <div className="flex-shrink-0">
                <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
                    <div className="text-2xl font-bold text-gray-800">SHOP.CO</div>
                </Link>
            </div>

            {/* Main Links */}
            <div className="hidden md:flex flex-1 justify-center space-x-8">
                <Link to="/all-products" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>Shop</Link>
                <Link to="/on-sale" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>On Sale</Link>
                <Link to="/new-arrivals" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>New Arrivals</Link>
                <Link to="/brands" className="text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>Brands</Link>
            </div>

            {/* Search + Icons */}
            <div className="hidden md:flex items-center space-x-4 gap-4">
                <SearchBar />

                {/* Cart */}
                <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors duration-200 focus:outline-none">
                    <FaShoppingCart size={24} />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                    {token? (
                        <>
                            <button
                                onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                                className="text-gray-600 hover:text-indigo-600 focus:outline-none"
                            >
                                <IoPersonSharp size={24} />
                            </button>
                            {isProfileMenuOpen  && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                                    {token ? (
                                        <>
                                            <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:text-indigo-600" onClick={() => setProfileMenuOpen(false)}>
                                                <div className="flex flex-row gap-4">
                                                    <CgProfile  size={24} />
                                                    <span>
                                               My profile
                                           </span>
                                                </div>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-gray-800 hover:text-indigo-600"
                                            >
                                                <div className="flex flex-row gap-4">
                                                    <MdOutlineLogout size={24} />
                                                    <span>
                                                logout
                                           </span>
                                                </div>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:text-indigo-600" onClick={() => setProfileMenuOpen(false)}>

                                            </Link>

                                        </>
                                    )}
                                </div>
                            )}
                        </>
                    )
                    :
                        (
                            <>
                                <Link to="/profile"
                                      onClick={handleLinkClick}

                                    className="text-gray-600 hover:text-indigo-600 focus:outline-none"
                                >
                                    <IoPersonSharp size={24} />
                                </Link>
                            </>


                        )}


                    {/*{isProfileMenuOpen  && (*/}
                    {/*    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">*/}
                    {/*        {token ? (*/}
                    {/*            <>*/}
                    {/*                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:text-indigo-600" onClick={() => setProfileMenuOpen(false)}>*/}
                    {/*                    <div className="flex flex-row gap-4">*/}
                    {/*                        <CgProfile  size={24} />*/}
                    {/*                        <span>*/}
                    {/*                           My profile*/}
                    {/*                       </span>*/}
                    {/*                    </div>*/}
                    {/*                </Link>*/}
                    {/*                <button*/}
                    {/*                    onClick={handleLogout}*/}
                    {/*                    className="w-full text-left px-4 py-2 text-gray-800 hover:text-indigo-600"*/}
                    {/*                >*/}
                    {/*                    <div className="flex flex-row gap-4">*/}
                    {/*                        <MdOutlineLogout size={24} />*/}
                    {/*                        <span>*/}
                    {/*                            logout*/}
                    {/*                       </span>*/}
                    {/*                    </div>*/}
                    {/*                </button>*/}
                    {/*            </>*/}
                    {/*        ) : (*/}
                    {/*            <>*/}
                    {/*                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:text-indigo-600" onClick={() => setProfileMenuOpen(false)}>*/}
                    {/*                   */}
                    {/*                </Link>*/}
                    {/*               */}
                    {/*            </>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-600 hover:text-indigo-600 focus:outline-none"
                >
                    {isMobileMenuOpen ? <IoMdClose size={24} /> : <IoMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden rounded-b-lg">
                    <div className="flex flex-col p-4 space-y-4">
                        <div className="flex flex-row items-center justify-center gap-10 mb-0 ">
                            <Link to="/cart" className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg relative" onClick={handleLinkClick}>
                                <FaShoppingCart size={20} />
                                {cartItemCount > 0 && (
                                    <span className="absolute left-5 -top-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/profile" className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>
                                <IoPersonSharp size={20} />
                            </Link>
                            <Link to="/settings" className="flex items-center space-x-2 text-gray-800 hover:bg-gray-100 p-2 rounded-lg" onClick={handleLinkClick}>
                                <IoSettingsSharp size={20} />
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
