import React from 'react';

import { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';
import Loader from '../components/Loader.jsx';
import Header from '../components/Header.jsx';

function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  const isHomePage = location.pathname === '/';

  let pageSize = 15;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`https://news-aggregator-dusky.vercel.app/all-news?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(myJson => {
        if (myJson.success) {
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        } else {
          setError(myJson.message || 'An error occurred');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return (
    <div className="mt-18 bg-gray-100 min-h-screen py-6">
      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}
      {isHomePage && <Header />}
      
      {/* Updated grid container */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {!isLoading ? (
            data.map((element, index) => (
              <Card
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
                key={index}
              />
            ))
          ) : (
            <Loader />
          )}
        </div>
        
        {/* Pagination controls */}
        {!isLoading && data.length > 0 && (
          <div className="flex justify-center items-center gap-6 mt-8 mb-6">
            <button 
              disabled={page <= 1} 
              className="px-4 py-2 bg-rose-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-600 transition-colors"
              onClick={handlePrev}
            >
              ← Prev
            </button>
            <p className="text-sm font-medium text-gray-700">
              Page {page} of {Math.ceil(totalResults / pageSize)}
            </p>
            <button 
              disabled={page >= Math.ceil(totalResults / pageSize)}
              className="px-4 py-2 bg-rose-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-600 transition-colors"
              onClick={handleNext}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;