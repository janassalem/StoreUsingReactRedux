import React, { useEffect } from 'react';
import ProductCard from '../Components/ProductCard.jsx';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../features/Product/productSlice.js';
import AOS from "aos";
import "aos/dist/aos.css";

// Import your Loader component
import Loader from '../Components/Loader.jsx';

const AllProductsPage = () => {
    const dispatch = useDispatch();
    const { filteredProducts, products, isLoading, error } = useSelector(
        (state) => state.ProductState
    );

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 800,
            easing: "ease-in-out"
        });
        dispatch(GetAllProducts());
    }, [dispatch]);

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

    if (filteredProducts.length === 0) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-[var(--text-muted,#6b7280)]">
                No products match your search.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader />
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
                    {filteredProducts.length < 20 ? "SEARCH RESULTS" : "ALL PRODUCTS"}
                </h2>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {[...filteredProducts].reverse().map((product) => (
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

export default AllProductsPage;
