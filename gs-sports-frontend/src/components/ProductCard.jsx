import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard(props) {

    const product = props.product

  return (

    <Link to={"/overview/"+product.productID} className="w-[250px] h-[350px] bg-amber-300 rounded-xl shadow-xl m-4">
      <img className="w-full h-[225px] object-cover" src={product.images[0]}></img>
      <div className="w-full h-[125px] flex flex-col justify-center items-center space-y-2">
        <p className="text-[10px] text-gray-400">{product.productID}</p>
        <p>{product.name}</p>
        <div className="flex space-x-2">
        <p>{product.price}</p><span className="line-through">{product.price<product.labeledPrice&&product.labeledPrice}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
