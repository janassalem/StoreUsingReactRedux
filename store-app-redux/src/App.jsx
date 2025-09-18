import './App.css';
import LandingPage from "./Pages/LandingPage.jsx";
import ProductDetailPage from "./Pages/ProductDetailPage.jsx";
import Cart from "./Components/User/Cart.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./Components/User/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import AllProductsPage from "./Pages/AllProductsPage.jsx";
import CheckOutPage from "./Pages/CheckOutPage.jsx";
import NewArrivals from "./Pages/NewArrivals.jsx";
import Profile from "./Components/User/Profile.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegistrationPage from "./Pages/RegisterationPage.jsx";
import Dashboard from "./Components/Admin/Dashboard.jsx";
import ProtectedRoute from "./PrtotectedRoute.jsx";
import {ToastContainer} from "react-toastify";
import OnSale from "./Pages/OnSale.jsx";
import Brands from "./Pages/Brands.jsx";
import AdminNavBar from "./Components/Admin/AdminNavBar.jsx";
import {useEffect, useState} from "react";
import PublicLayout from "./layouts/PublicLayout.jsx";
import AdminProducts from "./Components/Admin/AdminProducts.jsx";
import AdminOrders from "./Components/Admin/AdminOrders.jsx";
import UnAuthorized from "./Pages/Unauthorized.jsx";
function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [token]);

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/ProductDetailPage/:id" element={<ProductDetailPage />} />
                <Route path="/log-in" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/on-sale" element={<OnSale />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/all-products" element={<AllProductsPage />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                </Route>

                {/* User routes (protected) */}
                <Route element={<ProtectedRoute role="user" />}>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckOutPage />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Admin routes (protected) */}
                <Route element={<ProtectedRoute role="admin" />}>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/product" element={<AdminProducts />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                </Route>

                <Route path="/unauthorized" element={<UnAuthorized/>} />
            </Routes>

            <ToastContainer />
        </Router>
    );
}

export default App;