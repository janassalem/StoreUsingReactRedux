import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react"; // nice lock icon

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
            <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md">
                <div className="flex justify-center mb-6">
                    <Lock size={60} className="text-red-500" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">403</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Unauthorized Access</h2>
                <p className="text-gray-600 mb-6">
                    You don’t have permission to view this page. Please log in with the correct account.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;
