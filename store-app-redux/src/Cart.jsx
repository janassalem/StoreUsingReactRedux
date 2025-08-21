import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import jeansImage from './assets/jeans.png';
import checkeredShirtImage from './assets/checkered-shirt.png';
import stripedShirtImage from './assets/striped-shirt.jpeg';
import { FaTrash } from "react-icons/fa6";



const ShoppingCart = () => {

    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Gradient Graphic T-shirt',
            size: 'Large',
            color: 'White',
            price: 145,
            quantity: 1,
            image: checkeredShirtImage,
        },
        {
            id: 2,
            name: 'Checkered Shirt',
            size: 'Medium',
            color: 'Red',
            price: 180,
            quantity: 1,
            image: stripedShirtImage,

        },
        {
            id: 3,
            name: 'Skinny Fit Jeans',
            size: 'Large',
            color: 'Blue',
            price: 240,
            quantity: 1,
            image: jeansImage,
        },
    ]);

    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const deliveryFee = 15;

    // Calculate subtotal and discount
    useEffect(() => {
        const calculatedSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setSubtotal(calculatedSubtotal);
        // Assuming a static discount for this example
        setDiscount(calculatedSubtotal * 0.20);
    }, [cartItems]);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const total = subtotal - discount + deliveryFee;

    return (
        <div>

            <div className="bg-white-100 font-[Inter] min-h-screen p-4 md:p-8">
                <div className="container mx-auto max-w-7xl">
                    {/* Breadcrumb Navigation */}
                    <div className="text-sm text-gray-500 mb-6">
                        <a href="#" className="hover:text-gray-900">Home</a> &gt; <span className="text-gray-900">Cart</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold mb-8">YOUR CART</h1>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items Section */}
                        <div className="flex-1 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white rounded-2xl shadow-md p-4 flex items-center space-x-4">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h2 className="text-lg font-bold">{item.name}</h2>
                                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                                        <p className="text-lg font-bold mt-2">${item.price}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center border rounded-full px-2 py-1">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                &minus;
                                            </button>
                                            <span className="px-3">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button onClick={() => handleRemoveItem(item.id)} aria-label="Remove item" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Section */}
                        <div className="lg:w-1/3 bg-white rounded-2xl shadow-md p-6 h-fit">
                            <h2 className="text-2xl font-extrabold mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount (-20%)</span>
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
                            <div className="flex space-x-2 mb-4">
                                <input
                                    type="text"
                                    placeholder="Add promo code"
                                    className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                                <button className="px-6 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-700 transition-colors duration-200">
                                    Apply
                                </button>
                            </div>
                            <button className="w-full px-6 py-4 bg-gray-900 text-white rounded-full font-bold transition-colors duration-200 hover:bg-gray-700">
                                Go to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default ShoppingCart;
