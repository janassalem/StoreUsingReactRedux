import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import CheckoutImage from "./assets/CheckoutImage.png";
import Sucessimage from "./assets/Sucessimage.png";
import CartEmptyImage from "./assets/CartEmptyImage.png";
import { placeOrder } from "./features/Product/OrderSlice.js";
import { clearCart } from "./features/Product/CartSlice.js";

const CheckOutPage = () => {
    const dispatch = useDispatch();

    //use selector to get states from store
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

    // ✅ Clear cart AFTER success screen is shown
    useEffect(() => {
        if (orderPlaced) {
            const timer = setTimeout(() => {
                dispatch(clearCart());
            }, 1000); // wait 1 second before clearing cart
            return () => clearTimeout(timer);
        }
    }, [orderPlaced, dispatch]);

    //Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler for the "Place Order" button
    const handlePlaceOrder = (e) => {
        e.preventDefault();

        const orderData = {
            name: formData.fullName,
            email: formData.email,
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
                quantity: item.quantity
            })),
            total,
        };

        console.log("Placing order with data:", orderData);

        // send to backend
        dispatch(placeOrder(orderData));

        // ✅ First show success screen
        setOrderPlaced(true);
    };

    // Conditional rendering for a successful order
    if (orderPlaced) {
        return (
            <div className="flex items-center min-h-screen font-[Inter] p-8 relative">
                <div>
                    <img src={Sucessimage} className=" justify-start  h-150 w-150 top-26 left-0 absolute" />
                </div>
                <div className=" absolute text-center bg-white  p-10 max-w-lg right-50 top-65 ">
                    <h2 className="text-5xl font-extrabold text-green-600 mb-4">Order Placed!</h2>
                    <p className="text-gray-700 mb-6">
                        Thank you for your purchase. Your order has been successfully placed and will be shipped shortly.
                    </p>
                    <Link to="/profile" className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full font-bold transition-colors duration-200 hover:bg-gray-700">
                        Go to profile
                    </Link>
                </div>
            </div>
        );
    }

    // Conditional rendering for an empty cart
    if (cartItems.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen font-[Inter] p-8">
                <div>
                    <img src={CartEmptyImage} className=" justify-start  h-200 w-150 top-10 right-0 absolute" />
                </div>
                <div className=" absolute text-center bg-white  p-10 max-w-lg left-50 top-65">
                    <p className="text-3xl text-gray-500 font-semibold mb-4">Your cart is empty.</p>
                    <Link to="/all-products" className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full font-bold transition-colors duration-200 hover:bg-gray-700">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="bg-white-100 font-[Inter] min-h-screen p-4 md:p-8">
            <div className="container mx-auto max-w-7xl">
                {/* Breadcrumb Navigation */}
                <div className="text-sm text-gray-500 mb-6">
                    <Link to="/" className="hover:text-gray-900">Home</Link> &gt;
                    <Link to="/cart" className="hover:text-gray-900">Cart</Link> &gt;
                    <span className="text-gray-900">Checkout</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 mt-9">CHECKOUT</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Shipping and Payment Form */}
                    <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-6">Shipping & Payment</h2>
                        <form onSubmit={handlePlaceOrder} className="space-y-6">
                            {/* Contact Information */}
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="street"
                                        placeholder="Street Address"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                        value={formData.street}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="zip"
                                            placeholder="ZIP / Postal Code"
                                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            value={formData.zip}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Payment</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="card"
                                        placeholder="Card Number"
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                        value={formData.card}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="expiration"
                                            placeholder="MM/YY"
                                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            value={formData.expiration}
                                            onChange={handleChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="cvc"
                                            placeholder="CVC"
                                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                            value={formData.cvc}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-gray-900 text-white rounded-full font-bold transition-colors duration-200 hover:bg-gray-700"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>

                    {/* Order Summary Section */}
                    <div className="lg:w-1/3 bg-white rounded-2xl shadow-md p-6 h-fit">
                        <h2 className="text-2xl font-extrabold mb-6">Order Summary</h2>
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center mb-4 pb-2 border-b">
                                <div className="flex items-center space-x-2">
                                    <img src={item.image} alt={item.title} className="w-15 h-15  object-cover rounded-lg" />
                                    <div>
                                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
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
                                <span className="font-semibold text-red-600">-${discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between text-xl font-bold mb-6">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <img src={CheckoutImage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOutPage;
