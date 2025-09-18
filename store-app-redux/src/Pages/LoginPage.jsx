import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/Auth/authSlice.js';
import LoginImage from "../assets/LoginImage.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.AuthSlice);

    const [formData, setFormData] = useState({ email: "", password: "" });
    const nav = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, disable: 'phone' });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginUser(formData))
            .unwrap()
            .then((res) => {
                toast.success("Login successful!");

                if (res.role === "admin") {
                    nav("/admin/dashboard");
                } else {
                    nav("/");
                }
            })
            .catch((err) => {
                toast.error(err || "Invalid credentials. Please try again!");
            });
    };

    return (
        <div className="bg-white flex items-center justify-center w-full mt-20">
            <div className="bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row max-w-6xl w-full">
                {/* Left side: Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center" data-aos="flip-left">
                    <h1 className="text-3xl font-bold mb-2 text-neutral-800">Welcome back!</h1>
                    <h5 className="text-md font-bold mb-8 text-neutral-600">
                        Enter your credentials to access your account
                    </h5>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter your email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-black bg-black hover:bg-white focus:ring-2 focus:ring-offset-2 focus:ring-black focus:border-black"
                        >
                            {isLoading ? "Loading..." : "Sign in"}
                        </button>

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <div className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-medium text-black hover:text-white">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Right side: Image */}
                <div className="w-full lg:w-1/2 hidden lg:block overflow-hidden" data-aos="zoom-in">
                    <img src={LoginImage} alt="Login" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
