import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
export default function ProtectedRoute({ role }) {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/log-in" replace />;
    }

    if (role && role !== userRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    if (userRole === "admin") {
        return (
            <AdminLayout>
                <Outlet />
            </AdminLayout>
        );
    }

    return (
        <UserLayout>
            <Outlet />
        </UserLayout>
    );
}