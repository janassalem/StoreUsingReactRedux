import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="bg-[var(--bg)] shadow-lg rounded-2xl p-10 text-center max-w-md border border-gray-200"
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
                    className="flex justify-center mb-6"
                >
                    <Lock size={60} className="text-[var(--error)]" />
                </motion.div>

                <motion.h1
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-4xl font-bold mb-2"
                >
                    403
                </motion.h1>

                <motion.h2
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-xl font-semibold mb-4 text-[var(--text)]"
                >
                    Unauthorized Access
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-[var(--muted)] mb-6"
                >
                    You don’t have permission to view this page. Please log in with the correct account.
                </motion.p>

                <motion.button
                    onClick={() => navigate("/")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    className="px-6 py-2 rounded-xl bg-[var(--accent)] text-[var(--accent-text)] font-medium hover:opacity-90 transition"
                >
                    Go Back Home
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Unauthorized;
