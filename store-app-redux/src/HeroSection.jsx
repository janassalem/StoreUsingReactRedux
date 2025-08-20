import React from 'react';
import { PiStarFourFill } from "react-icons/pi";
import HeroImage from './assets/8384779.png';



const HeroSection = () => {
    return (
        <div className="">
            <div className="relative container mx-auto  overflow-hidden  bg-white ">
                <div className="flex flex-col lg:flex-row items-start justify-between  md:p-16 space-y-8 lg:space-y-0 w-full  ">
                    {/* Left Side Content */}
                    <div className="relative p-3 z-10 w-1/2 flex flex-col justify-center text-center lg:text-left ">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-black mt-12">
                            FIND CLOTHES THAT MATCHES YOUR STYLE
                        </h1>
                        <p className="mt-4 text-gray-700 text-lg">
                            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                        </p>
                        <div className="mt-8">
                            <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-300">
                                Shop Now
                            </button>
                        </div>
                        {/* Stats Section */}
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

                    {/* Right Side Image */}
                    <div className="relative w-1/2  lg:mt-0  ">
                        {/* Decorative Stars */}
                        <div className="absolute top-10 right-10 transform -translate-x-1/2 -translate-y-1/2">
                            <PiStarFourFill />
                        </div>
                        <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                            <PiStarFourFill />
                        </div>
                       <div className={"w-[400px] h-auto absolute -top-28 left-40  "}>
                           <img
                               src={HeroImage}
                               alt="Models showcasing fashion"
                               className="!w-full !h-full "
                           />
                       </div>
                    </div>
                </div>

                {/* Brand Logos Section */}
                <div className="bg-black py-4 px-8 flex flex-wrap justify-around items-center space-x-4">
                    <span className="text-white text-xl md:text-2xl font-semibold opacity-75">VERSACE</span>
                    <span className="text-white text-xl md:text-2xl font-semibold opacity-75">ZARA</span>
                    <span className="text-white text-xl md:text-2xl font-semibold opacity-75">GUCCI</span>
                    <span className="text-white text-xl md:text-2xl font-semibold opacity-75">PRADA</span>
                    <span className="text-white text-xl md:text-2xl font-semibold opacity-75">Calvin Klein</span>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
