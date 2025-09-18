import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../Components/Admin/AdminNavBar.jsx";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen">
            <AdminNavBar />
            <main className="flex-grow p-6 ">
                <Outlet />
            </main>
        </div>
    );
}
