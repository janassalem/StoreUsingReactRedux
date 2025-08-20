import React from 'react';


const ProductCard = ({ name, image, rating, reviews, price, originalPrice, discount,product, onProductClick }) => {

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-yellow-400">★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="text-yellow-400">½</span>);
        }

        return stars;
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            onClick={() => onProductClick(product)}
            <div className="bg-gray-100 p-4">
                <img src={image} alt={name} className="w-full h-64 object-contain mx-auto" />
            </div>
            <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{name}</h3>
                <div className="flex items-center justify-center my-2">
                    <div className="flex text-sm">
                        {renderStars(rating)}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">
                        {rating}/{reviews}
                    </span>
                </div>
                <div className="text-xl font-bold text-gray-900 mt-2">
                    ${price}
                    {originalPrice && (
                        <>
                            <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice}</span>
                            <span className="ml-2 text-red-500 text-sm font-normal">-{discount}%</span>
                        </>
                    )}
                </div>
            </div>

        </div>


    );
};

export default ProductCard;