import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoSearchSharp } from "react-icons/io5";
import { searchProducts } from './features/Product/productSlice.js';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Dispatch the search action with the query value
        dispatch(searchProducts(value));
    };

    return (
        <div className="flex items-center w-100 h-10  max-w-lg mx-auto bg-gray-100 rounded-full shadow-md overflow-hidden p-2">
            <button className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 focus:outline-none">
                <IoSearchSharp />
            </button>
            <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none px-4 py-2 text-gray-700 placeholder-gray-400"
            />
        </div>
    );
};

export default SearchBar;