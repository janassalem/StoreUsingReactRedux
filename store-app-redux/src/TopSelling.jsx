import React from 'react';
import ProductCard from './ProductCard'; // Assuming a ProductCard component exists
import tshirtImage from './assets/t-shirt.png';
import jeansImage from './assets/jeans.png';
import checkeredShirtImage from './assets/checkered-shirt.png';
import stripedShirtImage from './assets/striped-shirt.png';

const NewArrivals = () => {
    const products = [
        {
            id: 1,
            name: 'T-shirt with Tape Details',
            image: tshirtImage,
            rating: 4.5,
            reviews: 5,
            price: 120,
            originalPrice: null,
            discount: null,
        },
        {
            id: 2,
            name: 'Skinny Fit Jeans',
            image: jeansImage,
            rating: 3.5,
            reviews: 5,
            price: 240,
            originalPrice: 260,
            discount: 20,
        },
        {
            id: 3,
            name: 'Checkered Shirt',
            image: checkeredShirtImage,
            rating: 4.5,
            reviews: 5,
            price: 180,
            originalPrice: null,
            discount: null,
        },
        {
            id: 4,
            name: 'Sleeve Striped T-shirt',
            image: stripedShirtImage,
            rating: 4.5,
            reviews: 5,
            price: 130,
            originalPrice: 160,
            discount: 30,
        },
    ];

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 px-10 mt-8">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
                    TOP SELLING
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            image={product.image}
                            rating={product.rating}
                            reviews={product.reviews}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            discount={product.discount}
                        />
                    ))}
                </div>
                <div className="flex justify-center mt-12">
                    <button className="px-8 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition duration-300">
                        View All
                    </button>
                </div>
            </div>
            <div className=" flex justify-center">

            </div>
            <hr className="my-10 border-gray-300" />
        </div>

    );
};

export default NewArrivals;