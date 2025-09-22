import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import CheckoutImage from "../assets/CheckoutImage.png";
import Sucessimage from "../assets/Sucessimage.png";
import CartEmptyImage from "../assets/CartEmptyImage.png";
import { placeOrder } from "../features/Product/OrderSlice.js";
import { clearCart } from "../features/Product/CartSlice.js";
import AOS from 'aos';
import 'aos/dist/aos.css';

const CheckOutPage = () => {
    const dispatch = useDispatch();
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const token = localStorage.getItem("token");
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const { cartItems, subtotal, discount, deliveryFee, total } = useSelector(
        (state) => state.CartState
    );

    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        street: '',
        city: '',
        zip: '',
        card: '',
        expiration: '',
        cvc: '',
    });

    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-out', once: true });
    }, []);

    useEffect(() => {
        if (orderPlaced) {
            const timer = setTimeout(() => {
                dispatch(clearCart());
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [orderPlaced, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const navigate = useNavigate();
    const handlePlaceOrder = (e) => {
        if (!token) {
            navigate("/log-in");
        }
        e.preventDefault();
        const orderData = {
            userID: JSON.parse(localStorage.getItem("user")).id,
            name: formData.fullName,
            email: formData.email,
            date: formattedDate,
            address: {
                street: formData.street,
                city: formData.city,
                zip: formData.zip,
            },
            payment: {
                card: formData.card,
                expiration: formData.expiration,
                cvc: formData.cvc,
            },
            items: cartItems.map(item => ({
                id: item.id,
                quantity: item.quantity,
                image: item.image,
            })),
            total,
        };

        dispatch(placeOrder(orderData));
        setOrderPlaced(true);
    };

    // ✅ Success Screen
    if (orderPlaced) {
        return (
            <div className="flex items-center min-h-screen font-[Inter] p-8 relative bg-[var(--bg)] text-[var(--text)]">
                <div data-aos="zoom-in">
                    <img src={Sucessimage} className="justify-start h-150 w-150 top-26 left-0 absolute" />
                </div>
                <div className="absolute text-center bg-[var(--bg)] p-10 max-w-lg right-50 top-65 rounded-2xl shadow-md" data-aos="fade-up">
                    <h2 className="text-5xl font-extrabold mb-4 text-[var(--success)] animate-bounce">
                        Order Placed!
                    </h2>
                    <p className="mb-6 text-[var(--muted)]">
                        Thank you for your purchase. Your order has been successfully placed and will be shipped shortly.
                    </p>
                    <Link
                        to="/profile"
                        className="inline-block px-6 py-3 rounded-full font-bold transition-colors duration-200 bg-[var(--accent)] text-[var(--accent-text)] hover:opacity-80"
                    >
                        Go to profile
                    </Link>
                </div>
            </div>
        );
    }

    // ✅ Empty Cart Screen
    if (cartItems.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen font-[Inter] p-8 bg-[var(--bg)] text-[var(--text)]">
                <div data-aos="fade-down">
                    <img src={CartEmptyImage} className="justify-start h-200 w-150 top-10 right-0 absolute animate-bounce" />
                </div>
                <div className="absolute text-center bg-[var(--bg)] p-10 max-w-lg left-50 top-65 rounded-2xl shadow-md" data-aos="fade-up">
                    <p className="text-3xl font-semibold mb-4 text-[var(--muted)]">
                        Your cart is empty.
                    </p>
                    <Link
                        to="/all-products"
                        className="inline-block px-6 py-3 rounded-full font-bold transition-colors duration-200 bg-[var(--accent)] text-[var(--accent-text)] hover:opacity-80"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // ✅ Checkout Page
    return (
        <div className="bg-[var(--bg)] text-[var(--text)] font-[Inter] min-h-screen p-4 md:p-8">
            <div className="container mx-auto max-w-7xl">
                {/* Breadcrumb */}
                <div className="text-sm mb-6 text-[var(--muted)]" data-aos="fade-right">
                    <Link to="/" className="hover:underline">Home</Link> &gt;
                    <Link to="/cart" className="hover:underline">Cart</Link> &gt;
                    <span className="text-[var(--text)]">Checkout</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 mt-9" data-aos="fade-down">CHECKOUT</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Shipping + Payment */}
                    <div className="flex-1 bg-[var(--bg)] rounded-2xl shadow-md p-6" data-aos="fade-up">
                        <h2 className="text-2xl font-bold mb-6">Shipping & Payment</h2>
                        <form onSubmit={handlePlaceOrder} className="space-y-6">
                            {/* Contact */}
                            <div data-aos="fade-right">
                                <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--muted)] bg-[var(--bg)] text-[var(--text)]"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div data-aos="fade-left">
                                <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--muted)] bg-[var(--bg)] text-[var(--text)]"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="street"
                                        placeholder="Street Address"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--muted)] bg-[var(--bg)] text-[var(--text)]"
                                        value={formData.street}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--muted)] bg-[var(--bg)] text-[var(--text)]"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="zip"
                                            placeholder="ZIP / Postal Code"
                                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--muted)] bg-[var(--bg)] text-[var(--text)]"
                                            value={formData.zip}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div data-aos="fade-right">
                                <h3 className="text-xl font-semibold mb-2">Payment</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="card"
                                        placeholder="Card Number"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--muted)] bg-[var(--bg)] text-[var(--text)]"
                                        value={formData.card}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="expiration"
                                            placeholder="MM/YY"
                                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--muted)] bg-[var(--bg)] text-[var(--text)]"
                                            value={formData.expiration}
                                            onChange={handleChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="cvc"
                                            placeholder="CVC"
                                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--muted)] bg-[var(--bg)] text-[var(--text)]"
                                            value={formData.cvc}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 rounded-full font-bold transition-colors duration-200 bg-[var(--accent)] text-[var(--accent-text)] hover:opacity-80 animate-pulse"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3 bg-[var(--bg)] rounded-2xl shadow-md p-6 h-fit" data-aos="fade-left">
                        <h2 className="text-2xl font-extrabold mb-6">Order Summary</h2>
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center mb-4 pb-2 border-b border-[var(--muted)]" data-aos="fade-up">
                                <div className="flex items-center space-x-2">
                                    <img src={item.image} alt={item.title} className="w-15 h-15 object-cover rounded-lg" />
                                    <div>
                                        <h3 className="font-bold">{item.title}</h3>
                                        <p className="text-sm text-[var(--muted)]">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="space-y-4 mt-6">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-semibold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span className="font-semibold text-[var(--error)]">-${discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                            </div>
                        </div>
                        <hr className="my-4 border-[var(--muted)]" />
                        <div className="flex justify-between text-xl font-bold mb-6">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <img src={CheckoutImage} className="animate-fadeIn" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOutPage;
