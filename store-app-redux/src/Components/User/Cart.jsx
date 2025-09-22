import React from 'react';
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, updateQuantity } from "../../features/Product/CartSlice.js";
import {Link} from "react-router-dom";
import CartEmptyImage from "../../assets/CartEmptyImage.png";
import "aos/dist/aos.css";
import {toast, ToastContainer} from "react-toastify";

const ShoppingCart = () => {

    const dispatch = useDispatch();

    // Use useSelector to access the state from the Redux store
    const { cartItems, subtotal, discount, deliveryFee, total } = useSelector(
        (state) => state.CartState
    );

    // This function now dispatches the updateQuantity action
    const handleQuantityChange = (id, newQuantity) => {
        dispatch(updateQuantity({ id, newQuantity }));
        toast("changed Sucessfully !");
    };

    // This function now dispatches the removeItemFromCart action
    const handleRemoveItem = (id) => {
        dispatch(removeItemFromCart(id));
        toast("removed Sucessfully !");
    };

    // Conditional rendering to display a message if the cart is empty
    if (cartItems.length === 0) {
        return (

            <div className="flex justify-center items-center min-h-screen font-[Inter] p-8">
                <div>
                    <img src={CartEmptyImage} className=" justify-start  h-200 w-150 top-10 right-0 absolute"
                         data-aos="fade-left"/>
                </div>
                <div className=" absolute text-center   p-10 max-w-lg left-50 top-65"
                     data-aos="fade-right">
                    <p className="text-3xl text-gray-500 font-semibold mb-4" >Your cart is empty.</p>
                    <Link to="/all-products" className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full font-bold transition-colors duration-200 hover:bg-gray-700"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-white-100 font-[Inter] min-h-screen p-4 md:p-8">
                <div className="container mx-auto max-w-7xl">
                    {/* Breadcrumb Navigation */}
                    <div className="text-sm text-gray-500 mb-6">
                        <a href="#" className="hover:text-gray-900">Home</a> &gt; <span className="text-gray-900">Cart</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold mb-8 mt-9"
                        data-aos="fade-up-right"
                        style={{ color: "var(--text)" }}>
                        YOUR CART</h1>

                    <div className="flex flex-col lg:flex-row gap-8 ">
                        {/* Cart Items Section */}
                        <div className="flex-1 space-y-4"
                             data-aos="fade-up-right">
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl shadow-md p-4 flex items-center space-x-4"
                                    style={{ backgroundColor: "var(--bg)" }}
                                >
                                    <img src={item.image} alt={item.name} className="w-24 h-full object-cover rounded-lg p-5" />
                                    <div className="flex-1">
                                        <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
                                            {item.title}
                                        </h2>
                                        <p className="text-sm" style={{ color: "var(--muted)" }}>
                                            Size: {item.size}
                                        </p>
                                        <p className="text-sm" style={{ color: "var(--muted)" }}>
                                            Color: {item.color}
                                        </p>
                                        <p className="text-lg font-bold mt-2" style={{ color: "var(--text)" }}>
                                            ${item.price}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className="flex items-center border rounded-full px-2 py-1"
                                            style={{ borderColor: "var(--muted)" }}
                                        >
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                style={{ color: "var(--muted)" }}
                                            >
                                                &minus;
                                            </button>
                                            <span className="px-3" style={{ color: "var(--text)" }}>
          {item.quantity}
        </span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                style={{ color: "var(--muted)" }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            aria-label="Remove item"
                                            style={{ color: "var(--error)" }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="lg:w-1/3 rounded-2xl shadow-md p-6 h-fit"
                            style={{ backgroundColor: "var(--bg)" }}
                            data-aos="zoom-in"
                        >
                            <h2 className="text-2xl font-extrabold mb-6" style={{ color: "var(--text)" }}>
                                Order Summary
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span style={{ color: "var(--muted)" }}>Subtotal</span>
                                    <span style={{ color: "var(--text)", fontWeight: 600 }}>
                    ${subtotal.toFixed(2)}
                  </span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ color: "var(--muted)" }}>Discount (-20%)</span>
                                    <span style={{ color: "var(--error)", fontWeight: 600 }}>
                    -${discount.toFixed(2)}
                  </span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ color: "var(--muted)" }}>Delivery Fee</span>
                                    <span style={{ color: "var(--text)", fontWeight: 600 }}>
                    ${deliveryFee.toFixed(2)}
                  </span>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="flex justify-between text-xl font-bold mb-6" style={{ color: "var(--text)" }}>
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex space-x-2 mb-4">
                                <input
                                    type="text"
                                    placeholder="Add promo code"
                                    className="flex-1 p-3 rounded-full focus:outline-none"
                                    style={{
                                        border: "1px solid var(--muted)",
                                        color: "var(--text)",
                                        backgroundColor: "var(--bg)"
                                    }}
                                />
                                <button
                                    className="px-6 py-3 rounded-full font-bold transition-colors duration-200"
                                    style={{
                                        backgroundColor: "var(--accent)",
                                        color: "var(--accent-text)"
                                    }}
                                >
                                    Apply
                                </button>
                            </div>
                            <Link to="/checkout">
                                <button
                                    className="w-full px-6 py-2 rounded-full font-bold transition-colors duration-200"
                                    style={{
                                        backgroundColor: "var(--accent)",
                                        color: "var(--accent-text)"
                                    }}
                                >
                                    Go to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;