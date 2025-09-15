import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (token === 'userishere') {
        return <Navigate to="./" replace />;
    }else if(!token){
        return <Navigate to="/log-in" replace />;
    }

    return <Outlet />;  // renders child routes
}
