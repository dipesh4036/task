import React from 'react';

const Card = ({ title, description, creator, views, type }) => {
  return (
    <div className="bg-purple-100/25 shadow-md rounded-lg p-5 transition-transform transform hover:scale-105 h-full  flex flex-col">
      <h2 className="text-lg md:text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4 text-sm md:text-base flex-grow">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs md:text-sm">{creator}</span>
        <span className="text-gray-500 text-xs md:text-sm">{views} views</span>
      </div>
      <span className="mt-2 w-fit inline-block bg-purple-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
        {type}
      </span>
    </div>
  );
};

export default Card;