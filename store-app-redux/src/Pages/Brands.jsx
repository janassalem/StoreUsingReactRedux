import React, { useEffect } from 'react';
import ProductCard from '../Components/ProductCard.jsx';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../features/Product/productSlice.js';
import AOS from "aos";
import "aos/dist/aos.css";

import Loading from '../assets/Coming Soon Loading GIF by Exxeta.gif';

const Brands = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.ProductState);

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 800,
            easing: "ease-in-out"
        });
        dispatch(GetAllProducts());
    }, [dispatch]);

    // Example: filter by brand (change "Nike" to any brand name you need)
    const brandName = "Nike";
    const brandProducts = products.filter((product) => product.brand === brandName);

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
                No products available.
            </div>
        );
    }

    if (brandProducts.length === 0) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-[var(--text-muted,#6b7280)]">
                No products found for {brandName}.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <img src={Loading} className="w-1/3" alt="Loading..." />
            </div>
        );
    }

    return (
        <div className="bg-[var(--bg-color)] py-1 px-10 mt-24">
            <div className="container mx-auto px-4">
                <h2
                    className="text-4xl font-extrabold text-center text-[var(--text-color)] mb-8"
                    data-aos="fade-up"
                >
                    {brandName.toUpperCase()} PRODUCTS
                </h2>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {brandProducts.map((product) => (
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
            </div>

            <hr className="my-10 border-gray-300 dark:border-gray-700" />
        </div>
    );
};

export default Brands;
