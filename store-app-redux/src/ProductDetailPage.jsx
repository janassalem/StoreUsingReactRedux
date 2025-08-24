import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductSection from "./ProductSection.jsx";
import { GetAllProducts } from './features/Product/productSlice.js';
import { addItemToCart } from './features/Product/CartSlice.js';

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const { products, isLoading, error } = useSelector((state) => state.ProductState);

    useEffect(() => {
        if (products.length === 0 && !isLoading) {
            dispatch(GetAllProducts());
        }
    }, [dispatch, products.length, isLoading]);

    const product = products.find(p => p.id === parseInt(id));

    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product) {
            setMainImage(product.image);
        }
    }, [product]);

    if (isLoading && products.length === 0) {
        return <div className="text-center py-20">Loading product details...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600">Error fetching product details.</div>;
    }

    if (!product) {
        return <div className="text-center py-20">Product not found!</div>;
    }

    // Create the handler for the "Add to Cart" button
    const handleAddToCart = () => {
        // Dispatch the action with the product data and quantity
        dispatch(addItemToCart({ ...product, quantity }));
        // Navigate to the cart page after adding the item
        navigate('/Cart');
    };

    return (
        <div className="bg-white font-[Inter] min-h-screen">
            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Image Gallery Section */}
                    <div className="flex flex-col md:flex-row gap-4 lg:w-1/2 mt-15">
                        <div className="flex-1 rounded-lg shadow-xl overflow-hidden order-1 md:order-2 w-100">
                            <img src={mainImage || product.image} alt={product.title} className="w-full h-auto object-cover p-20" />
                        </div>
                    </div>
                    {/* Product Details Section */}
                    <div className="lg:w-1/2 p-6 mt-9">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">{product.title}</h1>

                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6 mt-5">{product.description}</p>

                        <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
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


                            <button
                                onClick={handleAddToCart}
                                className="w-full md:flex-1 px-6 py-4 bg-gray-900 text-white rounded-full font-bold transition-colors duration-300 hover:bg-gray-700"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ProductSection />
        </div>
    );
};

export default ProductDetailPage;