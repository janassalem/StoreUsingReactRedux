import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";
import { motion } from "framer-motion";
import Visa from "../assets/Visa.svg";
import Master from "../assets/MasterCard.svg";
import PayPal from "../assets/PayPal.svg";
import GooglePay from "../assets/Google Pay.svg";
import ApplePay from "../assets/Apple Pay.svg";

const Footer = () => {
    const socialIcons = [
        { icon: FaFacebook, label: "Facebook" },
        { icon: RiTwitterXLine, label: "Twitter" },
        { icon: AiFillInstagram, label: "Instagram" },
        { icon: FaGithub, label: "Github" },
    ];

    const payments = [Visa, Master, PayPal, ApplePay, GooglePay];

    return (
        <footer className="bg-gray-100 py-16 px-10 dark:bg-gray-900">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 text-gray-800 dark:text-gray-200">
                    {/* Column 1: Brand Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h2 className="text-3xl font-extrabold mb-4">SHOP.CO</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xs">
                            We have clothes that suit your style and which you're proud to wear. From women to men.
                        </p>
                        <div className="flex space-x-4">
                            {socialIcons.map((item) => (
                                <motion.a
                                    key={item.label}
                                    href="#"
                                    aria-label={item.label}
                                    className="transition-colors duration-300"
                                    whileHover={{ scale: 1.2, color: "#4B5563" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <item.icon size={24} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Columns 2-5 */}
                    {["COMPANY", "HELP", "FAQ", "RESOURCES"].map((title) => (
                        <div key={title}>
                            <h3 className="text-lg mb-4">{title}</h3>
                            <ul className="space-y-2">
                                {Array(4).fill("").map((_, i) => (
                                    <li key={i}>
                                        <a
                                            href="#"
                                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors duration-300"
                                        >
                                            {title} Link {i + 1}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Separator */}
                <hr className="my-10 border-gray-300 dark:border-gray-700" />

                {/* Copyright & Payment */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-4 md:mb-0">Shop.co © 2000-2023, All Rights Reserved</p>
                    <div className="flex gap-4">
                        {payments.map((img, idx) => (
                            <motion.img
                                key={idx}
                                src={img}
                                alt={`payment-${idx}`}
                                className="h-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2, duration: 0.5 }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
