import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css"

const Header = () => {
    const [country, setCountry] = useState("US");

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    return (
        <header>
            <nav className="fixed top-0 left-0 w-full h-auto flex items-center justify-around p-4">
                <div className="flex items-center">
                    
                    <h3 className="text-2xl font-semibold text-pink-500">FeedFusion</h3>
                </div>
                <ul className="flex items-center space-x-4">
                    <li>    
                        <select
                            value={country}
                            onChange={handleCountryChange}
                            className="bg-gray-200 text-black p-2 rounded"
                        >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="AU">Australia</option>
                            <option value="IN">India</option>
                           
                        </select>
                    </li>
                    <li>
                        <Link to="/top-headlines" className="text-black">Top Headlines</Link>
                    </li>
                    <li>
                        <Link to="/signin" className="text-black">Signin</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;