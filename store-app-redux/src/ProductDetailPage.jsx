import React, {useEffect, useState} from 'react';
import { PiStarFourFill } from "react-icons/pi";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import stripedShirtImage from './assets/striped-shirt.jpeg';
import ProductSection from "./ProductSection.jsx";
import {Link, useParams} from "react-router-dom";

const ProductDetailPage = () => {
    const {id} = useParams()
    console.log(id)


    useEffect(()=>{

    },[id])

    const product = {
        name: "ONE LIFE GRAPHIC T-SHIRT",
        rating: 4.5,
        price: 260,
        originalPrice: 300,
        discount: 40,
        description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
        images: [
           stripedShirtImage,stripedShirtImage,stripedShirtImage
        ],
        colors: ["#A0A08C", "#434651", "#1E3A8A"], // Example colors
        sizes: ["Small", "Medium", "Large", "X-Large"],
    };

    const [mainImage, setMainImage] = useState(product.images[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default to large
    const [quantity, setQuantity] = useState(1);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-yellow-400">★</span>);
        }
        if (rating % 1 !== 0) {
            stars.push(<span key="half" className="text-yellow-400">½</span>);
        }
        return stars;
    };

    return (

        <div className="bg-white font-[Inter] min-h-screen">
            <Navbar/>
            {/* Breadcrumb Navigation */}
            <div className="container mx-auto px-4 py-4 text-gray-500 text-sm">
                <a href="#" className="hover:text-gray-900">Home</a> &gt; <a href="#" className="hover:text-gray-900">Shop</a> &gt; <a href="#" className="hover:text-gray-900">Men</a> &gt; <span className="text-gray-900">T-shirts</span>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Image Gallery Section */}
                    <div className="flex flex-col md:flex-row gap-4 lg:w-1/2">
                        {/* Thumbnail Images */}
                        <div className="flex lg:flex-col gap-4 order-2 md:order-1">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Product thumbnail ${index + 1}`}
                                    className={`w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer border-2 ${stripedShirtImage === img ? 'border-gray-900' : 'border-transparent'}`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="flex-1 rounded-lg shadow-xl overflow-hidden order-1 md:order-2">
                            <img src={stripedShirtImage} alt={product.name} className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="lg:w-1/2 p-6">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">{product.name}</h1>

                        {/* Rating and Price */}
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex text-lg items-center">
                                {renderStars(product.rating)}
                                <span className="text-gray-500 text-sm ml-2">{product.rating}/5</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                                <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                                <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                                    -{product.discount}%
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mb-6">{product.description}</p>

                        {/* Color Selector */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">Select Colors</h3>
                            <div className="flex space-x-2">
                                {product.colors.map((color, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-colors duration-200 ${selectedColor === color ? 'border-gray-900' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">Choose Size</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${selectedSize === size ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border-transparent'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart Section */}
                        <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
                            {/* Quantity Selector */}
                            <div className="flex items-center border rounded-full px-4 py-2 w-32 md:w-auto">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    &minus;
                                </button>
                                <span className="px-4 text-lg font-semibold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(prev => prev + 1)}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    +
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <Link to="/Cart" className="w-full" >
                            <button
                                className="w-full md:flex-1 px-6 py-4 bg-gray-900 text-white rounded-full font-bold transition-colors duration-300 hover:bg-gray-700"
                            >
                                Add to Cart

                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ProductSection/>
            <Footer/>
        </div>
    );
};

export default ProductDetailPage;
