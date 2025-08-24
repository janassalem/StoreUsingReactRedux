import './App.css';
import LandingPage from "./LandingPage.jsx";
import ProductDetailPage from "./ProductDetailPage.jsx";
import Cart from "./Cart.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import AllProductsPage from "./AllProductsPage.jsx";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/ProductDetailPage/:id" element={<ProductDetailPage />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/all-products"  element={<AllProductsPage/> }/>
                <Route path="/new-arrivals" element={<AllProductsPage/>}/>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;