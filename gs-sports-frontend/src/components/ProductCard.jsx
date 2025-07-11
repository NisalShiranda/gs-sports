// import React from "react";
// import { Link } from "react-router-dom";

// function ProductCard(props) {
//   const product = props.product;

//   return (
//     <>
//       <Link
//         to={"/overview/" + product.productID}
//         className="w-[250px] h-[400px] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-xl shadow-xl drop-shadow-lg m-4 hover:scale-[1.02] transition-transform overflow-hidden"
//       >
//         <img
//           className="w-full h-[225px] object-cover rounded-t-xl"
//           src={product.images[0]}
//           alt={product.name}
//         />

//         <div className="w-full h-[125px] flex flex-col justify-start items-start space-y-1 px-2 py-3">
//           {product.price < product.labeledPrice && (
//             <span className="line-through text-sm bg-red-800 px-2 py-1 rounded-md">
//               ${product.labeledPrice}
//             </span>
//           )}
//           <p className="text-xs font-semibold mt-2 text-gray-400">{product.productID}</p>
//           <p className="font-bold text-xl uppercase text-gray-400">{product.name}</p>

//           <div className="flex items-center space-x-2">
//             <p className="font-bold text-lg">${product.price}</p>
//           </div>

//           {/* ✅ Proper JSX */}
//           {Array.isArray(product.colors) && product.colors.length > 0 && (
//             <div className="flex space-x-1 mt-1">
//               {product.colors.map((color, index) => (
//                 <div
//                   key={index}
//                   className="w-4 h-4 rounded-full border border-gray-400"
//                   style={{ backgroundColor: color }}
//                   title={color}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </Link>
      
//     </>
//   );
// }

// export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const product = props.product;

  return (
    <Link
      to={"/overview/" + product.productID}
      className="group relative w-[280px] h-[420px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 border border-gray-100"
    >
      {/* Image Container with Overlay */}
      <div className="relative w-full h-[260px] overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={product.images[0]}
          alt={product.name}
        />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Discount Badge */}
        {product.price < product.labeledPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
            {Math.round(((product.labeledPrice - product.price) / product.labeledPrice) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 space-y-1">
        {/* Product ID - Subtle */}
        <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          {product.productID}
        </p>
        
        {/* Product Name */}
        <h3 className="font-semibold text-lg text-gray-800 leading-tight group-hover:text-gray-900 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.price < product.labeledPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.labeledPrice}
            </span>
          )}
        </div>

        {/* Color Variants */}
        {Array.isArray(product.colors) && product.colors.length > 0 && (
          <div className="flex items-center space-x-2 pt-2">
            <span className="text-xs text-gray-500 font-medium">Colors:</span>
            <div className="flex space-x-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white shadow-md flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-medium">+{product.colors.length - 4}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </Link>
  );
}

export default ProductCard;