import React, {useEffect} from 'react';
import LoginImage from "./assets/LoginImage.png"
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const LoginPage = () => {
    useEffect(() => {
        AOS.init({
            // Optional: Configuration options
            duration: 1000, // Animation duration in milliseconds
            easing: 'ease-in-out', // Easing function
            once: true, // Whether animation should only happen once
            disable: 'phone', // Disable animations on phone devices
        });
    }, []);
    return (
        <div className=" bg-white flex items-center justify-center w-full mt-20 ">
            <div className="bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row max-w-6xl w-full">
                {/* Left side: Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center"
                     data-aos="flip-left">
                    <h1 className="text-3xl font-bold mb-2 text-neutral-800">Welcome back!</h1>
                    <h5 className="text-md font-bold mb-8 text-neutral-600">Enter your Credentials to access your account</h5>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    autoComplete="email"
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
                                    autoComplete="current-password"
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
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-black bg-black hover:bg-white  focus:ring-2 focus:ring-offset-2 focus:ring-black focus:border-black"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

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
                        <a href="#" className="font-medium text-black hover:text-white">
                            Sign in
                        </a>
                    </div>
                </div>

                {/* Right side: Image */}
                <div className="w-full lg:w-1/2 hidden lg:block  overflow-hidden" data-aos="zoom-in">
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

export default LoginPage;
