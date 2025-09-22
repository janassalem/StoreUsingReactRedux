import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductSection from "../Components/ProductSection.jsx";
import { GetAllProducts } from '../features/Product/productSlice.js';
import { addItemToCart } from '../features/Product/CartSlice.js';
import Loading from "../assets/Coming Soon Loading GIF by Exxeta.gif";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Components/Loader.jsx";

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, products, error } = useSelector((state) => state.ProductState);

    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(GetAllProducts());
    }, [id]);

    const product = products.find(p => p.id === id);

    useEffect(() => {
        if (product) setMainImage(product.image);
    }, [product]);

    if (error) return <div className="text-center py-20 text-[var(--error)]">Error fetching product details.</div>;
    if (!product) return <div className="text-center py-20 text-[var(--muted)]">Product not found!</div>;

    const productRating = product.rating?.rate;
    const reviewCount = product.rating?.count;

    const handleAddToCart = () => {
        dispatch(addItemToCart({ ...product, quantity }));
        toast.success("Added successfully!");
        navigate('/Cart');
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader/>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-[Inter] bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
            <ToastContainer />
            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product Image */}
                    <div className="flex flex-col md:flex-row gap-4 lg:w-1/2 mt-15">
                        <div className="flex-1 rounded-lg shadow-xl overflow-hidden order-1 md:order-2 w-full"
                             data-aos="fade-right"
                             data-aos-offset="300"
                             data-aos-easing="ease-in-sine">
                            <img src={mainImage || product.image} alt={product.title}
                                 className="w-full h-auto object-cover p-20" />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:w-1/2 p-6 mt-9">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">{product.title}</h1>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-4xl font-bold text-[var(--accent)]">${product.price}</span>
                                <span className="text-2xl font-bold text-[var(--muted)] ml-6">
                                    {productRating?.toFixed(1)} / 5 stars ({reviewCount} reviews)
                                </span>
                            </div>
                        </div>
                        <p className="text-[var(--muted)] mb-6 mt-5">{product.description}</p>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
                            <div className="flex items-center border rounded-full px-4 py-2 w-32 md:w-auto">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    className="text-[var(--text)] hover:text-[var(--accent)]"
                                >
                                    &minus;
                                </button>
                                <span className="px-4 text-lg font-semibold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(prev => prev + 1)}
                                    className="text-[var(--text)] hover:text-[var(--accent)]"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="w-full md:flex-1 px-6 py-4 bg-[var(--accent)] text-[var(--accent-text)] rounded-full font-bold transition-colors duration-300 hover:opacity-90"
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
