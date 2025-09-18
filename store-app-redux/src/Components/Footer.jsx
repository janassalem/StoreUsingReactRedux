import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";
import Visa from "../assets/Visa.svg"
import Master from "../assets/MasterCard.svg"
import PayPal from "../assets/PayPal.svg"
import GooglePay from "../assets/Google Pay.svg"
import ApplePay from "../assets/Apple Pay.svg"
const Footer = () => {

    return (
        <footer className="bg-gray-100 py-16 px-10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-gray-800">
                    {/* Column 1: Brand Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h2 className="text-3xl font-extrabold mb-4">SHOP.CO</h2>
                        <p className="text-sm text-gray-600 mb-6 max-w-xs">
                            We have clothes that suits your style and which you're proud to wear. From women to men.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Facebook" className="text-black-600 hover:text-gray-900 transition-colors duration-300">
                                <FaFacebook  size={24} />
                            </a>
                            <a href="#" aria-label="Twitter" className="text-black-600 hover:text-gray-900 transition-colors duration-300">
                                <RiTwitterXLine size={24}  />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-black-600 hover:text-gray-900 transition-colors duration-300">
                                <AiFillInstagram size={24} />
                            </a>
                            <a href="#" aria-label="Github" className="text-black-600 hover:text-gray-900 transition-colors duration-300">
                                <FaGithub  size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Company */}
                    <div>
                        <h3 className="text-lg  mb-4">COMPANY</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">About</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Features</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Works</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Career</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Help */}
                    <div>
                        <h3 className="text-lg  mb-4">HELP</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Customer Support</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Delivery Details</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Terms & Conditions</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Column 4: FAQ */}
                    <div>
                        <h3 className="text-lg  mb-4">FAQ</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Account</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Manage Deliveries</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Orders</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Payments</a></li>
                        </ul>
                    </div>

                    {/* Column 5: Resources */}
                    <div>
                        <h3 className="text-lg  mb-4">RESOURCES</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Free E-books</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Development Tutorial</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">How to - Blog</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-300">Youtube Playlist</a></li>
                        </ul>
                    </div>
                </div>

                {/* Separator Line */}
                <hr className="my-10 border-gray-300" />

                {/* Copyright & Payment Section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <p className="mb-4 md:mb-0">Shop.co © 2000-2023, All Rights Reserved</p>
                    <div className="flex -gap-0">
                        <img src={Visa} alt="Visa" className="h-12" />
                        <img src={Master} alt="Mastercard" className="h-12" />
                        <img src={PayPal} alt="Paypal" className="h-12" />
                        <img src={ApplePay} alt="ApplePay" className="h-12" />
                        <img src={GooglePay} alt="Google Pay" className="h-12" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
