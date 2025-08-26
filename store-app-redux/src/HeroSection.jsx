import React from 'react';
import { PiStarFourFill } from "react-icons/pi";
import HeroImage from './assets/8384779.png';
import {Link} from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="bg-white">
            <div className="relative container mx-auto overflow-hidden bg-white">
                {/* Desktop Layout*/}
                <div className="hidden md:flex flex-col lg:flex-row items-start justify-between md:p-16 space-y-8 lg:space-y-0 w-full">
                    {/* Left Side Content - Desktop */}
                    <div className="relative p-3 z-10 w-1/2 flex flex-col justify-center text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-black mt-12">
                            FIND CLOTHES THAT MATCHES YOUR STYLE
                        </h1>
                        <p className="mt-4 text-gray-700 text-lg">
                            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                        </p>
                        <div className="mt-8">
                            <Link to="/all-products" className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-300">
                                Shop Now
                            </Link>
                        </div>
                        {/* Stats Section - Desktop */}
                        <div className="mt-12 flex flex-col md:flex-row md:space-x-12 space-y-8 md:space-y-0 text-center md:text-left">
                            <div>
                                <h3 className="text-3xl font-bold text-black">200+</h3>
                                <p className="text-gray-600 mt-1">International Brands</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-black">2,000+</h3>
                                <p className="text-gray-600 mt-1">High-Quality Products</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-black">30,000+</h3>
                                <p className="text-gray-600 mt-1">Happy Customers</p>
                            </div>
                        </div>
                    </div>
                    {/* Right Side Image - Desktop */}
                    <div className="relative w-1/2 lg:mt-0">
                        <div className="absolute top-10 right-10 transform -translate-x-1/2 -translate-y-1/2">
                            <PiStarFourFill />
                        </div>
                        <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                            <PiStarFourFill />
                        </div>
                        <div className="w-[450px] h-auto absolute -top-36 left-45">
                            <img
                                src={HeroImage}
                                alt="Models showcasing fashion"
                                className="!w-full !h-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Layout - visible on screens smaller than md */}
                <div className="md:hidden">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col items-center justify-between gap-12">
                            {/* Left Side Content - Mobile */}
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-4xl font-extrabold text-gray-900 mt-12">
                                    FIND CLOTHES THAT MATCHES YOUR STYLE
                                </h1>
                                <p className="mt-4 text-gray-700 text-base max-w-2xl">
                                    Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                                </p>
                                <div className="mt-8">
                                    <Link to="/all-products" className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-300">
                                        Shop Now
                                    </Link>
                                </div>
                                {/* Stats Section - Mobile */}
                                <div className="mt-12 w-full flex flex-col space-y-6 text-center">
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900">200+</h3>
                                        <p className="text-gray-600 mt-1">International Brands</p>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900">2,000+</h3>
                                        <p className="text-gray-600 mt-1">High-Quality Products</p>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900">30,000+</h3>
                                        <p className="text-gray-600 mt-1">Happy Customers</p>
                                    </div>
                                </div>
                            </div>
                            {/* Right Side Image - Mobile */}
                            <div className="relative w-full flex justify-center items-center">
                                <img
                                    src={HeroImage}
                                    alt="Models showcasing fashion"
                                    className="relative z-20 top-20 left-5 w-full max-w-sm h-auto object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brand Logos Section - visible on all screens */}
                <div className="bg-black p-4 md:p-8 mt-12">
                    <div className="container mx-auto flex flex-wrap justify-around items-center gap-4">
                        <span className="text-white text-xl sm:text-2xl font-semibold opacity-75">VERSACE</span>
                        <span className="text-white text-xl sm:text-2xl font-semibold opacity-75">ZARA</span>
                        <span className="text-white text-xl sm:text-2xl font-semibold opacity-75">GUCCI</span>
                        <span className="text-white text-xl sm:text-2xl font-semibold opacity-75">PRADA</span>
                        <span className="text-white text-xl sm:text-2xl font-semibold opacity-75">Calvin Klein</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;