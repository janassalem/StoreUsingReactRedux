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
        <div className="flex items-center justify-center w-full mt-20" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
            <div className="rounded-3xl overflow-hidden flex flex-col lg:flex-row max-w-6xl w-full" style={{ backgroundColor: "var(--bg)" }}>
                {/* Left side: Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center" data-aos="flip-left">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>Welcome back!</h1>
                    <h5 className="text-md font-bold mb-8" style={{ color: "var(--muted)" }}>
                        Enter your credentials to access your account
                    </h5>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium" style={{ color: "var(--muted)" }}>
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
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                                style={{
                                    borderColor: "var(--muted)",
                                    backgroundColor: "var(--bg)",
                                    color: "var(--text)"
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium" style={{ color: "var(--muted)" }}>
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
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                                style={{
                                    borderColor: "var(--muted)",
                                    backgroundColor: "var(--bg)",
                                    color: "var(--text)"
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2"
                            style={{
                                backgroundColor: "var(--accent)",
                                color: "var(--accent-text)",
                                borderColor: "var(--accent)"
                            }}
                        >
                            {isLoading ? "Loading..." : "Sign in"}
                        </button>

                        {error && <p className="text-sm mt-2" style={{ color: "var(--error)" }}>{error}</p>}

                        <div className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
                            Don't have an account?{" "}
                            <Link to="/register" className="font-medium" style={{ color: "var(--accent)" }}>
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
