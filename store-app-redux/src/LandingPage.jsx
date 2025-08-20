import React from 'react'
import Navbar from "./Navbar.jsx";
import HeroSection from "./HeroSection.jsx";
import ProductSection from "./ProductSection.jsx";
import TopSelling from "./TopSelling.jsx";
import Footer from "./Footer.jsx";


function LandingPage() {


    return (
        <div>
            <Navbar/>
            <HeroSection/>
            <ProductSection/>
            <TopSelling/>
            <Footer/>
        </div>

    )
}

export default LandingPage
