import React, { useState } from 'react';
import { ChevronDown, Menu, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ onCategoryChange, onCountryChange, onThemeToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const categories = [
    "business", "entertainment", "general", "health", 
    "science", "sports", "technology", "politics"
  ];

  const countries = [
    { code: "us", name: "United States" },
    { code: "gb", name: "United Kingdom" },
    { code: "in", name: "India" },
    { code: "au", name: "Australia" },
    { code: "ca", name: "Canada" }
  ];

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    if (onThemeToggle) onThemeToggle(!isDarkTheme);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 border-2">
      <nav className="container mx-auto px-2">
        <div className="flex items-center justify-between h-16 mb-2">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-black">FeedFusion</h1>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Navigation items */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent`}>
            <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 p-4 lg:p-0">
              {/* All News */}
              <li>
                <button className="text-black hover:text-rose-300 font-semibold" 
                  onClick={() => onCategoryChange('all')}>
                  Top Headlines
                </button>
              </li>

              <li>
                <Link to="/signin">
                <button className='text-black hover:text-rose-300 font-semibold'> SignIn </button>
                </Link>
              </li>

              {/* Categories Dropdown */}
              <li className="relative">
                <button 
                  className="flex items-center space-x-1 text-black hover:text-rose-300 font-semibold"
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowCountryDropdown(false);
                  }}
                >
                  <span>Categories</span>
                  <ChevronDown size={16} className={`transform transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showCategoryDropdown && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 capitalize"
                          onClick={() => {
                            onCategoryChange(category);
                            setShowCategoryDropdown(false);
                          }}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Countries Dropdown */}
              <li className="relative">
                <button 
                  className="flex items-center space-x-1 text-black hover:text-rose-300 font-semibold"
                  onClick={() => {
                    setShowCountryDropdown(!showCountryDropdown);
                    setShowCategoryDropdown(false);
                  }}
                >
                  <span>Countries</span>
                  <ChevronDown size={16} className={`transform transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showCountryDropdown && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {countries.map((country) => (
                      <li key={country.code}>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
                          onClick={() => {
                            onCountryChange(country.code);
                            setShowCountryDropdown(false);
                          }}
                        >
                          {country.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Theme Toggle */}
              <li>
                <button 
                  className="text-black hover:text-rose-300"
                  onClick={handleThemeToggle}
                >
                  {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;