import React from 'react';
import CartEmptyImage from "../../assets/CartEmptyImage.png";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

function NotUser() {
    return (
        <div className="flex justify-center items-center min-h-screen font-[Inter] p-8">
            <div>
                <img
                    src={CartEmptyImage}
                    className="justify-start h-200 w-150 top-10 right-0 absolute"
                    data-aos="fade-left"
                    alt="Not Registered"
                />
            </div>
            <div
                className="absolute text-center p-10 max-w-lg left-50 top-65 rounded-xl shadow-md"
                data-aos="fade-right"
                style={{
                    backgroundColor: "var(--bg)",
                    color: "var(--text)"
                }}
            >
                <p
                    className="text-3xl font-semibold mb-4"
                    style={{ color: "var(--muted)" }}
                >
                    You are not Registered!
                </p>
                <Link
                    to="/log-in"
                    className="inline-block px-6 py-3 rounded-full font-bold transition-colors duration-200"
                    style={{
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-text)"
                    }}
                >
                    Login
                </Link>
                <Link
                    to="/registr"
                    className="inline-block ml-8 px-6 py-3 rounded-full font-bold transition-colors duration-200"
                    style={{
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-text)"
                    }}
                >
                    Register
                </Link>
            </div>
        </div>
    );
}

export default NotUser;
