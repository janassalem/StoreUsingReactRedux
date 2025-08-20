import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
        // Logic
    };

    return (
        <div className="flex items-center w-100 h-10  max-w-lg mx-auto bg-gray-100 rounded-full shadow-md overflow-hidden p-2">
            {/* Search Icon */}
            <button className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 focus:outline-none">
                <IoSearchSharp />
            </button>


            {/* Input Field */}
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
