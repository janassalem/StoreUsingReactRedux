import React, { useEffect, useState } from 'react';
import LoginImage from "../assets/LoginImage.png";
import { FaGoogle, FaApple } from "react-icons/fa";
import AOS from "aos";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        toast("Registration Successful!");
        if (!formData.terms) {
            setMessage("You must agree to the terms.");
            return;
        }

        try {
            // Check if user already exists
            const res = await axios.get(`http://localhost:3000/users?email=${formData.email}`);
            if (res.data.length > 0) {
                setMessage("User already exists with this email.");
                return;
            }

            // Create new user
            await axios.post("http://localhost:3000/users", {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            setMessage("Registration successful! You can now login.");
            navigate("/log-in");
            setFormData({ name: "", email: "", password: "", terms: false });
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong. Try again.");
        }
    };

    return (
        <div className="bg-[var(--bg)] text-[var(--text)] flex items-center justify-center w-full mt-20 transition-colors duration-300">
            <div className="rounded-3xl overflow-hidden flex flex-col lg:flex-row max-w-6xl w-full shadow-lg">
                {/* Left: Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center" data-aos="flip-left">
                    <h1 className="text-3xl font-bold mb-8 text-[var(--text)]">Get Started Now</h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {["name", "email", "password"].map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-sm font-medium text-[var(--muted)] capitalize">{field}</label>
                                <div className="mt-1">
                                    <input
                                        id={field}
                                        name={field}
                                        type={field === "password" ? "password" : "text"}
                                        placeholder={`Enter your ${field}`}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-[var(--muted)] focus:outline-none focus:ring-[var(--accent)] focus:border-[var(--accent)] sm:text-sm bg-[var(--bg)] text-[var(--text)]"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Terms */}
                        <div className="flex items-start">
                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-[var(--accent)] border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-2 text-sm">
                                <label htmlFor="terms" className="font-medium text-[var(--muted)]">
                                    I agree to the <a href="#" className="text-[var(--accent)] hover:underline">terms of service</a>
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-[var(--accent-text)] bg-[var(--accent)] hover:opacity-90 transition"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    {message && (
                        <p className="mt-4 text-center text-sm text-[var(--error)]">{message}</p>
                    )}

                    {/* Divider */}
                    <div className="mt-6 text-center text-[var(--muted)] relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative bg-[var(--bg)] px-2 inline-block text-sm">or</div>
                    </div>

                    {/* Social Login */}
                    <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        {[{icon: FaGoogle, label: "Google"}, {icon: FaApple, label: "Apple"}].map((item, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className="w-full flex items-center justify-center px-4 py-2 border border-[var(--text)] rounded-md shadow-sm text-sm font-medium gap-2 bg-[var(--bg)] hover:bg-gray-50 transition"
                            >
                                <item.icon />
                                Sign in with {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="mt-6 text-center text-sm text-[var(--muted)]">
                        Have an account?{" "}
                        <Link to="/log-in" className="font-medium text-[var(--accent)] hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>

                {/* Right: Image */}
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
