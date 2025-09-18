import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/User/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

export default function PublicLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
