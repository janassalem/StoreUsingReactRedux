import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoSettingsSharp, IoPersonSharp, IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from "./SearchBar.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineLogout } from "react-icons/md";
import { logout } from '../../features/Auth/authSlice.js';
import { clearCart } from '../../features/Product/CartSlice.js';
import { CgProfile } from "react-icons/cg";
import "aos/dist/aos.css";
import ModeSwitch from "../ModeSwitch.jsx";

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = React.useState(false);
    const nav = useNavigate();
    const { cartItems } = useSelector((state) => state.CartState);
    const cartItemCount = cartItems.length;

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        dispatch(clearCart());
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        nav("/log-in");
    };

    const handleLinkClick = () => setMobileMenuOpen(false);

    return (
        <nav
            className="fixed top-0 left-0 w-full z-50 shadow-md rounded-lg flex items-center justify-between p-4 md:px-10"
            style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
            data-aos="fade-down"
            data-aos-anchor-placement="top-center"
        >
            {/* Brand Logo */}
            <div className="flex-shrink-0">
                <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick} style={{ color: "var(--text)" }}>
                    <div className="text-2xl font-bold">SHOP.CO</div>
                </Link>
            </div>

            {/* Main Links */}
            <div className="hidden md:flex flex-1 justify-center space-x-8">
                {["/all-products", "/on-sale", "/new-arrivals", "/brands"].map((path, idx) => {
                    const label = path.split("-").join(" ").replace("/", "").replace("all products", "Shop");
                    return (
                        <Link
                            key={idx}
                            to={path}
                            onClick={handleLinkClick}
                            className="p-2 rounded-lg transition-colors duration-200"
                            style={{
                                color: "var(--text)",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--muted)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                            {label}
                        </Link>
                    )
                })}
            </div>

            {/* Search + Icons */}
            <div className="hidden md:flex items-center space-x-4 gap-4">
                <SearchBar />

                {/* Cart */}
                <Link
                    to="/cart"
                    className="relative transition-colors duration-200 focus:outline-none"
                    style={{ color: "var(--muted)" }}
                >
                    <FaShoppingCart size={24} className="hover:text-var(--accent)" />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </Link>

                {/* Profile/Admin Dropdown */}
                <div className="relative">
                    {token ? (
                        <>
                            <button
                                onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                                className="focus:outline-none"
                                style={{ color: "var(--muted)" }}
                            >
                                <IoPersonSharp size={24} className="hover:text-var(--accent)" />
                            </button>
                            {isProfileMenuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-44 border rounded-lg shadow-lg py-2 z-50"
                                    style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
                                >
                                    {role === "admin" ? (
                                        <Link
                                            to="/admin-dashboard"
                                            onClick={() => setProfileMenuOpen(false)}
                                            className="block px-4 py-2 rounded-lg hover:text-var(--accent)"
                                        >
                                            <div className="flex flex-row gap-4">
                                                <CgProfile size={24} />
                                                <span>Admin Dashboard</span>
                                            </div>
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/profile"
                                            onClick={() => setProfileMenuOpen(false)}
                                            className="block px-4 py-2 rounded-lg hover:text-var(--accent)"
                                        >
                                            <div className="flex flex-row gap-4">
                                                <CgProfile size={24} />
                                                <span>My Profile</span>
                                            </div>
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 rounded-lg hover:text-var(--accent)"
                                    >
                                        <div className="flex flex-row gap-4">
                                            <MdOutlineLogout size={24} />
                                            <span>Logout</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link
                            to="/log-in"
                            onClick={handleLinkClick}
                            style={{ color: "var(--muted)" }}
                        >
                            <IoPersonSharp size={24} className="hover:text-var(--accent)" />
                        </Link>
                    )}
                </div>

                <ModeSwitch />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    style={{ color: "var(--muted)" }}
                    className="focus:outline-none"
                >
                    {isMobileMenuOpen ? <IoMdClose size={24} /> : <IoMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className="absolute top-16 left-0 w-full shadow-md md:hidden rounded-b-lg flex flex-col p-4 space-y-4"
                    style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
                >
                    {["/cart", role === "admin" ? "/admin-dashboard" : "/profile", "/settings", "/all-products", "/on-sale", "/new-arrivals", "/brands"].map((path, idx) => {
                        const label = path.split("-").join(" ").replace("/", "").replace("all products", "Shop");
                        return (
                            <Link
                                key={idx}
                                to={path}
                                onClick={handleLinkClick}
                                className="p-2 rounded-lg transition-colors duration-200"
                                style={{ color: "var(--text)" }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--muted)")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                                {label}
                            </Link>
                        )
                    })}
                    <ModeSwitch />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
