import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../Components/ProductCard.jsx';
import { GetAllProducts } from '../features/Product/productSlice.js';
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from '../assets/Coming Soon Loading GIF by Exxeta.gif';

const NeWArrivals = () => {
    const dispatch = useDispatch();
    const { filteredProducts, products, isLoading, error } = useSelector((state) => state.ProductState);

    useEffect(() => {
        AOS.init({ once: false });
        dispatch(GetAllProducts());
    }, [dispatch]);

    if (error) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-red-600">
                Error: {error}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-gray-500">
                No new arrivals available.
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-gray-500">
                No products match your search.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <img
                    src={Loading}
                    alt="Loading..."
                    className="w-1/3"
                />
            </div>
        );
    }

    return (
        <div className="bg-white py-1 px-10 mt-24" style={{ backgroundColor: "var(--bg)" }}>
            <div className="container mx-auto px-4">
                <h2
                    className="text-4xl font-extrabold text-center mb-8"
                    style={{ color: "var(--text)" }}
                    data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom"
                >
                    {filteredProducts.length < 20 ? "SEARCH RESULTS" : "NEW ARRIVALS"}
                </h2>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                >
                    {filteredProducts.map(product => (
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

            <hr className="my-10 border-gray-300" />
        </div>
    );
};

export default NeWArrivals;
