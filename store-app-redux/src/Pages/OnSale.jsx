import React, { useEffect } from 'react';
import ProductCard from '../Components/ProductCard.jsx';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../features/Product/productSlice.js';
import AOS from "aos";

import Loading from '../assets/Coming Soon Loading GIF by Exxeta.gif';

const OnSale = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.ProductState);

    useEffect(() => {
        AOS.init({
            once: false,
        });
        dispatch(GetAllProducts());
    }, [dispatch]);

    // filter only on-sale products
    const onSaleProducts = products.filter(product => product.discount > 0 || product.onSale);

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
                No products available.
            </div>
        );
    }

    if (onSaleProducts.length === 0) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-gray-500">
                No products are currently on sale.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-gray-700">
                <img
                    src={Loading}
                    className="size-1/3"
                />
            </div>
        );
    } else {
        return (
            <div className="bg-white py-1 px-10 mt-24">
                <div className="container mx-auto px-4">
                    <h2
                        className="text-4xl font-extrabold text-center text-gray-900 mb-8"
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                    >
                        ON SALE
                    </h2>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                    >
                        {onSaleProducts.map(product => (
                            <Link to={`/ProductDetailPage/${product.id}`} key={product.id}>
                                <ProductCard
                                    key={product.id}
                                    name={product.title}
                                    image={product.image}
                                    price={product.price}
                                    rating={product.rating}
                                    // extra fields if your ProductCard supports them
                                    // originalPrice={product.originalPrice}
                                    // discount={product.discount}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                <hr className="my-10 border-gray-300" />
            </div>
        );
    }
};

export default OnSale;
