import React from 'react';

const Card = ({ 
  title, 
  description, 
  imgUrl, 
  publishedAt, 
  url, 
  author, 
  source 
}) => {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={imgUrl || '/api/placeholder/400/250'} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="text-white text-sm font-medium px-2 py-1 rounded bg-blue-600">
            {source}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">
                {author ? author[0].toUpperCase() : 'N'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {author || 'Unknown Author'}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(publishedAt)}
              </p>
            </div>
          </div>
          
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;