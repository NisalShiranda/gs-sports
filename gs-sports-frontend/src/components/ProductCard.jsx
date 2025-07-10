import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const product = props.product;

  return (
    <>
      <Link
        to={"/overview/" + product.productID}
        className="w-[250px] h-[400px] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-xl shadow-xl drop-shadow-lg m-4 hover:scale-[1.02] transition-transform overflow-hidden"
      >
        <img
          className="w-full h-[225px] object-cover rounded-t-xl"
          src={product.images[0]}
          alt={product.name}
        />

        <div className="w-full h-[125px] flex flex-col justify-start items-start space-y-1 px-2 py-3">
          {product.price < product.labeledPrice && (
            <span className="line-through text-sm bg-red-800 px-2 py-1 rounded-md">
              ${product.labeledPrice}
            </span>
          )}
          <p className="text-xs font-semibold mt-2 text-gray-400">{product.productID}</p>
          <p className="font-bold text-xl uppercase text-gray-400">{product.name}</p>

          <div className="flex items-center space-x-2">
            <p className="font-bold text-lg">${product.price}</p>
          </div>

          {/* ✅ Proper JSX */}
          {Array.isArray(product.colors) && product.colors.length > 0 && (
            <div className="flex space-x-1 mt-1">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-400"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
      <Link
        to={"/overview/" + product.productID}
        className="w-[250px] h-[400px] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-xl shadow-xl drop-shadow-lg m-4 hover:scale-[1.02] transition-transform overflow-hidden"
      >
        <img
          className="w-full h-[225px] object-cover rounded-t-xl"
          src={product.images[0]}
          alt={product.name}
        />

        <div className="w-full h-[125px] flex flex-col justify-start items-start space-y-1 px-2 py-3">
          {product.price < product.labeledPrice && (
            <span className="line-through text-sm bg-red-800 px-2 py-1 rounded-md">
              ${product.labeledPrice}
            </span>
          )}
          <p className="text-xs font-semibold mt-2 text-gray-400">{product.productID}</p>
          <p className="font-bold text-xl uppercase text-gray-400">{product.name}</p>

          <div className="flex items-center space-x-2">
            <p className="font-bold text-lg">${product.price}</p>
          </div>

          {/* ✅ Proper JSX */}
          {Array.isArray(product.colors) && product.colors.length > 0 && (
            <div className="flex space-x-1 mt-1">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-400"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </>
  );
}

export default ProductCard;