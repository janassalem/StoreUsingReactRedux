import React, { useEffect, useState } from 'react';
import LoginImage from "../assets/LoginImage.png"
import { FaGoogle, FaApple } from "react-icons/fa";
import AOS from "aos";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const RegisterationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            disable: 'phone',
        });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast("Registeration Sucessfull!");
        if (!formData.terms) {
            setMessage("You must agree to the terms.");
            return;
        }

        try {
            // check if user already exists
            const res = await axios.get(`http://localhost:3000/users?email=${formData.email}`);
            if (res.data.length > 0) {
                setMessage("User already exists with this email.");
                return;
            }

            // create new user
            await axios.post("http://localhost:3000/users", {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            setMessage("Registration successful! You can now login.");
            navigate("/profile")
            setFormData({ name: "", email: "", password: "", terms: false });
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong. Try again.");
        }
    };

    return (
        <div className=" bg-white flex items-center justify-center w-full mt-20 ">
            <div className="bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row max-w-6xl w-full">
                {/* Left side: Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center" data-aos="flip-left">
                    <h1 className="text-3xl font-bold mb-8 text-neutral-800">Get Started Now</h1>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-black focus:ring-white border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-2 text-sm">
                                <label htmlFor="terms" className="font-medium text-gray-700">
                                    I agree to the <a href="#" className="text-black hover:text-white">terms of service</a>
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-black bg-black hover:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-black focus:border-black"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    {message && (
                        <p className="mt-4 text-center text-sm text-red-600">{message}</p>
                    )}

                    <div className="mt-6 text-center text-gray-500 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative bg-white px-2 inline-block text-sm">or</div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <a
                            href="#"
                            className="w-full flex items-center justify-center px-4 py-2 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 gap-2"
                        >
                            <FaGoogle />
                            Sign in with Google
                        </a>
                        <a
                            href="#"
                            className="w-full flex items-center justify-center px-4 py-2 border border-black rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 gap-2"
                        >
                            <FaApple />
                            Sign in with Apple
                        </a>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Have an account?
                        <Link to="/log-in"  className="font-medium text-black hover:text-white">
                            Sign in
                        </Link>
                    </div>
                </div>

                {/* Right side: Image */}
                <div className="w-full lg:w-1/2 hidden lg:block overflow-hidden" data-aos="zoom-in">
                    <img
                        src={LoginImage}
                        alt="Login photo"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterationPage;
