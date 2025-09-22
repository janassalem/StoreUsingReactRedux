import React, { useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../features/Product/productSlice.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductSection = () => {
    const dispatch = useDispatch();
    const { filteredProducts, products, isLoading, error } = useSelector((state) => state.ProductState);

    useEffect(() => {
        AOS.init({
            once: true,         // animates only once per element
            duration: 800,      // smoother animation
            easing: "ease-in-out"
        });
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-[var(--text-color)]">
                Loading new arrivals...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-red-500">
                Error: {error}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-[var(--text-muted,#6b7280)]">
                No new arrivals available.
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-[var(--text-muted,#6b7280)]">
                No products match your search.
            </div>
        );
    }

    const featuredProducts = filteredProducts.slice(0, 4);

    return (
        <div className="bg-[var(--bg-color)] py-1 px-10 mt-8">
            <div className="container mx-auto px-4">
                <h2
                    className="text-4xl font-extrabold text-center text-[var(--text-color)] mb-8"
                    data-aos="fade-up"
                >
                    NEW ARRIVALS
                </h2>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {featuredProducts.map((product) => (
                        <Link to={`/ProductDetailPage/${product.id}`} key={product.id}>
                            <ProductCard
                                name={product.title}
                                image={product.image}
                                price={product.price}
                                rating={product.rating}
                            />
                        </Link>
                    ))}
                </div>

                <div
                    className="flex justify-center mt-12"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    <Link
                        to="/all-products"
                        className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-full text-[var(--text-color)] hover:bg-[var(--hover-bg,#f3f4f6)] transition duration-300"
                    >
                        View All
                    </Link>
                </div>
            </div>

            <hr className="my-10 border-gray-300 dark:border-gray-700" />
        </div>
    );
};

export default ProductSection;
