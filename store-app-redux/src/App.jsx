import './App.css';
import LandingPage from "./LandingPage.jsx";
import ProductDetailPage from "./ProductDetailPage.jsx";
import Cart from "./Cart.jsx";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import AllProductsPage from "./AllProductsPage.jsx";
import CheckOutPage from "./CheckOutPage.jsx";
import NewArrivals from "./NewArrivals.jsx";
import Profile from "./Profile.jsx";
import LoginPage from "./LoginPage.jsx";
import  RegistrationPage from "./RegisterationPage.jsx";
import Dashboard from "./Dashboard.jsx";
import ProtectedRoute from "./PrtotectedRoute.jsx";
import {ToastContainer} from "react-toastify";
import OnSale from "./OnSale.jsx";
import Brands from "./Brands.jsx";
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/ProductDetailPage/:id" element={<ProductDetailPage />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/all-products"  element={<AllProductsPage/> }/>
                <Route path="/new-arrivals" element={<NewArrivals/>}/>
                <Route path="/profile" element={<Profile />}/>
                <Route  path="/log-in" element={<LoginPage />}/>
                <Route path="/Registr" element={<RegistrationPage/>}/>
                <Route path="/checkout" element={<CheckOutPage/>}/>
                <Route path="/on-sale" element={<OnSale/>}/>
                <Route path="/brands" element={<Brands/>}/>
                {/*<Route path="/Dashboard" element={<Dashboard/>}/>*/}
                {/*Protected Route*/}
                <Route element={<ProtectedRoute />}>
                    <Route path="/Dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
            <Footer />
            <ToastContainer />
        </Router>
    );
}

export default App;