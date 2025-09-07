import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './features/Auth/authSlice';
import LoginImage from "./assets/LoginImage.png"
import { FaGoogle, FaApple } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Link, useNavigate} from "react-router-dom";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { loading, error , user} = useSelector((state) => state.AuthSlice);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const nav=useNavigate()
    useEffect(() => {
        dispatch(loginUser())
        AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, disable: 'phone' });
    }, []);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(1)
        if (formData.email === "admin" && formData.password === "admin") {
            localStorage.setItem("token", "adminishere");
            nav("../dashboard")
        }
        else if (user.find((user) => user.email === formData.email && user.password === formData.password)) {
            localStorage.setItem("token", "userishere");
            localStorage.setItem("user", JSON.stringify(user.filter((user) => user.email === formData.email && user.password === formData.password)));
            nav("../")
        }
        else{
            dispatch(loginUser(formData));
        }

    };

    return (
        <div className=" bg-white flex items-center justify-center w-full mt-20 ">
            <div className="bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row max-w-6xl w-full">
                {/* Left side: Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center"
                     data-aos="flip-left">
                    <h1 className="text-3xl font-bold mb-2 text-neutral-800">Welcome back!</h1>
                    <h5 className="text-md font-bold mb-8 text-neutral-600">Enter your Credentials to access your account</h5>

                    <form className="space-y-6" >
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
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-start">
                            {/*<div className="flex items-center">*/}
                            {/*    <input*/}
                            {/*        id="terms"*/}
                            {/*        name="terms"*/}
                            {/*        type="checkbox"*/}
                            {/*        className="h-4 w-4 text-black focus:ring-white border-gray-300 rounded"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="ml-2 text-sm">*/}
                            {/*    <label htmlFor="terms" className="font-medium text-gray-700">*/}
                            {/*        I agree to the <a href="#" className="text-black hover:text-white">terms of service</a>*/}
                            {/*    </label>*/}
                            {/*</div>*/}
                        </div>

                        <div>
                            <button
                                onClick={(e)=>handleSubmit(e)}
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-black bg-black hover:bg-white  focus:ring-2 focus:ring-offset-2 focus:ring-black focus:border-black"
                            >
                                {loading ? "Loading..." : "Sign in"}
                            </button>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                            <div className="mt-6 text-center text-sm text-gray-600">
                               Don't Have an account?
                                <Link to="/registr"  className="font-medium text-black hover:text-white">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>

                    {/* keep rest as is */}
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
