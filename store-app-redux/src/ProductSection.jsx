import React from 'react';
import ProductCard from './ProductCard';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from './features/Product/productSlice.js';

const ProductSection = () => {
    const dispatch = useDispatch();

    const { filteredProducts,products, isLoading, error } = useSelector((state) => state.ProductState);

    useEffect(() => {
        dispatch(GetAllProducts());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-gray-700">
                Loading new arrivals...
            </div>
        );
    }

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


    // console.log(featuredProducts);
    const featuredProducts = filteredProducts.slice(0, 4);



    return (
        <div className="bg-white py-1 px-10 mt-8">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
                    NEW ARRIVALS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Map over the sliced array to display only 4 products */}
                    {featuredProducts.map(product => (
                        <Link to={`/ProductDetailPage/${product.id}`} key={product.id}>
                            <ProductCard
                                key={product.id}
                                name={product.title}
                                image={product.image}
                                price={product.price}
                                rating={product.rating}
                                // The API response doesn't contain these props
                                // rating={product.rating}
                                // reviews={product.reviews}
                                // originalPrice={product.originalPrice}
                                // discount={product.discount}
                            />
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center mt-12">

                    <Link to="/all-products" className="px-8 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition duration-300">
                        View All
                    </Link>
                </div>
            </div>
            <hr className="my-10 border-gray-300" />
        </div>
    );
};

export default ProductSection;
