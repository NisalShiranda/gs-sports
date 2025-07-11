import React from 'react';
import { Link } from 'react-router-dom';

function CategoryCard({ name, img }) {
  return (
    <Link to={`/products?category=${encodeURIComponent(name)}`}>
      <div className="relative rounded-xl overflow-hidden h-82 group shadow hover:shadow-lg transition cursor-pointer">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
          <h3 className="text-white text-xl font-semibold">{name}</h3>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;