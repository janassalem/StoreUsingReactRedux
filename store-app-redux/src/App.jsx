import './App.css';
import LandingPage from "./LandingPage.jsx";
import ProductDetailPage from "./ProductDetailPage.jsx";
import Cart from "./Cart.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import AllProductsPage from "./AllProductsPage.jsx";
import CheckOutPage from "./CheckOutPage.jsx";
import NewArrivals from "./NewArrivals.jsx";
import Profile from "./Profile.jsx";
import LoginPage from "./LoginPage.jsx";
import RegistrationPage from "./RegisterationPage.jsx";
import Dashboard from "./Dashboard.jsx";
import ProtectedRoute from "./PrtotectedRoute.jsx";
import {ToastContainer} from "react-toastify";
import OnSale from "./OnSale.jsx";
import Brands from "./Brands.jsx";
import AdminNavBar from "./AdminNavBar.jsx";
import {useEffect, useState} from "react";

function App() {
    const [token,setWToken] = useState();
    useEffect(()=>{
        setWToken(localStorage.getItem("token"))
    },[token])
    console.log(token)
    return (
        <Router>
            {/* Show Navbar for normal users, AdminNavBar for admins */}
            {/*{token =="userishere" &&  <Navbar />}*/}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/ProductDetailPage/:id" element={<ProductDetailPage />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/all-products" element={<AllProductsPage />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/log-in" element={<LoginPage />} />
                <Route path="/Registr" element={<RegistrationPage />} />
                <Route path="/checkout" element={<CheckOutPage />} />
                <Route path="/on-sale" element={<OnSale />} />
                <Route path="/brands" element={<Brands />} />

                {/* Protected Dashboard route */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/admin/*" element={<AdminNavBar />} />
                </Route>
            </Routes>

            {/* Show footer only for normal users */}
            {token !== "admin" && <Footer />}

            <ToastContainer />
        </Router>
    );
}

export default App;
