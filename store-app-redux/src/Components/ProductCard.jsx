import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaStarHalfAlt } from "react-icons/fa";

const ProductCard = ({ name, image, rating, price, originalPrice, discount }) => {

    const renderStars = (ratingValue) => {
        const stars = [];
        const fullStars = Math.floor(ratingValue);
        const hasHalfStar = ratingValue % 1 !== 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<AiFillStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400"/>);
            } else {
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
        <div
            className="rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundColor: "var(--bg)" }} // Card background
        >
            <div className="p-4">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-contain mx-auto"
                />
            </div>
            <div className="p-4 text-center">
                <h3
                    className="text-lg font-semibold mb-2 text-center line-clamp-2"
                    style={{ color: "var(--text)" }} // Title color
                >
                    {limitTitle(name, 4)}
                </h3>
                <div className="flex items-center justify-center my-2">
                    <div className="flex text-sm">{renderStars(productRating)}</div>
                    <span className="text-sm ml-2" style={{ color: "var(--muted)" }}>
                        {productRating.toFixed(1)} / {reviewCount} reviews
                    </span>
                </div>
                <div className="text-xl font-bold mt-2" style={{ color: "var(--text)" }}>
                    ${price}
                    {originalPrice && (
                        <>
                            <span className="ml-2 text-sm line-through" style={{ color: "var(--muted)" }}>
                                ${originalPrice}
                            </span>
                            <span className="ml-2 text-sm font-normal" style={{ color: "var(--error)" }}>
                                -{discount}%
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
