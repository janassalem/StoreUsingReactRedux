import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';


const ProductCard = ({ name, image, rating, price, originalPrice, discount }) => {

    const renderStars = (ratingValue) => {
        const stars = [];
        const fullStars = Math.floor(ratingValue);
        const hasHalfStar = ratingValue % 1 >= 0.5; // Check if half-star

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                // Render a filled star for each full point
                stars.push(<AiFillStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars && hasHalfStar) {
                // Render a half-star if the decimal is 0.5 or greater

                stars.push(<span key={i} className="text-yellow-400">½</span>);
            } else {
                // Render an empty star for the rest
                stars.push(<AiOutlineStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    const limitTitle = (title, wordLimit) => {
        const words = title.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return title;
    };

    const productRating = rating?.rate || 0;
    const reviewCount = rating?.count || 0;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 p-4">
                <img src={image} alt={name} className="w-full h-64 object-contain mx-auto" />
            </div>
            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center line-clamp-2">{limitTitle(name, 4)}</h3>
                <div className="flex items-center justify-center my-2">
                    <div className="flex text-sm">
                        {renderStars(productRating)}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">
                        {productRating.toFixed(1)} / {reviewCount} reviews
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