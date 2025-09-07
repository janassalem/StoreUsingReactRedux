import React from 'react'
import CartEmptyImage from "./assets/CartEmptyImage.png";
import {Link} from "react-router-dom";
import "aos/dist/aos.css";


function NotUser() {
    return (
        <div className="flex justify-center items-center min-h-screen font-[Inter] p-8">
            <div>
                <img src={CartEmptyImage} className=" justify-start  h-200 w-150 top-10 right-0 absolute"
                data-aos="fade-left"/>
            </div>
            <div className=" absolute text-center bg-white  p-10 max-w-lg left-50 top-65"
                 data-aos="fade-right">
                <p className="text-3xl text-gray-500 font-semibold mb-4" >  you are not Registered !</p>
                <Link to="/log-in" className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full font-bold transition-colors duration-200 hover:bg-gray-700"
                >
                   Login
                </Link>
                <Link to="/registr" className="inline-block ml-8 px-6 py-3 bg-gray-900 text-white rounded-full font-bold transition-colors duration-200 hover:bg-gray-700"
                >
                    Register
                </Link>
            </div>
        </div>
    )
}

export default NotUser
