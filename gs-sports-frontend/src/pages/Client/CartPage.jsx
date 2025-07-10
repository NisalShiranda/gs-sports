// import React, { useEffect, useState } from 'react'
// import { TiShoppingCart } from "react-icons/ti";
// import getCart, { addToCart, getTotal, getTotalForLabeledPrice, removeFromCart } from '../../../utils/Cart';
// import { BiTrash } from 'react-icons/bi';
// import { useNavigate } from 'react-router-dom';

// function CartPage() {

//     const [cartLoaded, setCartLoaded] = useState(false);
//     const [cart, setCart] = useState([])
//     const navigate = useNavigate();
//     useEffect(() => {
//         if(cartLoaded===false){
//             const cart = getCart();
//             setCart(cart);
//             setCartLoaded(true);
           
//         }
//     },[cartLoaded])
//   return (
//     <div className="w-full h-full flex justify-center  ">
//         <div className="w-[700px]">
//             {
//                 cart.map((item,index) => {
//                     return(
                        
//                        <div key={index} className='w-full  bg-white shadow-2xl my-[50px] flex justify-between items-center relative'>
//                        <button>
//                         <BiTrash className='absolute right-[-20px] top-2 text-2xl text-red-500 cursor-pointer' onClick={() => {
//                             removeFromCart(item.productID)
//                             setCartLoaded(false)
//                         }} />
//                        </button>
//                         <img src={item.image} alt={item.name} className='w-[100px] h-full aspect-square object-cover' />
//                         <div className="h-full max-w-[300px] w-[300px] ">
//                             <h1 className='text-xl font-bold'>{item.name}</h1>
//                             <p>{item.altNames}</p>
                            
//                             {
//                                 item.labeledPrice>item.price?
//                                 <div className="flex justify-center items-center space-x-2">
//                                     <h1 className="text-2xl font-bold text-red-500">LKR: {item.price.toFixed(2)}</h1>
//                                     <h1 className="text-md font-bold text-gray-500 line-through">LKR: {item.labeledPrice.toFixed(2)}</h1>
//                                 </div>
//                                 :
//                                 <h1 className="text-2xl font-bold text-red-500 text-center">LKR: {item.price.toFixed(2)}</h1>
//                             }
//                             <div className="flex space-x-2">
//                             <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer" onClick={() => {
//                                 addToCart(item,-1)
//                                 setCartLoaded(false)
//                             }}>-</button>
//                             <p>{item.quantity}</p>
//                             <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer" onClick={() => {
//                                 addToCart(item,1)
//                                 setCartLoaded(false)
                                
//                             }}>+</button>
//                             </div>
//                             <p>{item.price * item.quantity.toFixed(2)}</p>
//                         </div>
//                        </div> 
//                     )
//                 })
//             }
//             <div className="w-full   flex justify-end pr-2">
//                 <h1 className="w-[100px]  text-end text-xl">Total: </h1>
//                 <h1 className="w-[100px]  text-end text-xl">{getTotalForLabeledPrice().toFixed(2)}</h1>
//             </div>
//             <div className="w-full   flex justify-end pr-2 ">
//                 <h1 className="w-[100px]  text-end text-xl">Discount: </h1>
//                 <h1 className="w-[100px]  text-end text-xl border-b-2">{getTotalForLabeledPrice()-getTotal().toFixed(2)}</h1>
//             </div>
//             <div className="w-full   flex justify-end pr-2 pb-[20px]">
//                 <h1 className="w-[100px]  text-end text-xl">Net Total: </h1>
//                 <h1 className="w-[100px]  text-end text-xl border-double border-b-5">{getTotal().toFixed(2)}</h1>
//             </div>
//             <div className="w-full flex justify-end pr-2 pb-[20px]">
//                 <button className="w-[100px] text-xl text-center cursor-pointer bg-amber-200 p-2 rounded-sm" onClick={() => {
//                     navigate("/checkout", {
//                         state: {
//                             items : cart,
//                         }
//                     })
//                 }}>Checkout</button>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default CartPage

import React, { useEffect, useState } from 'react';
import { TiShoppingCart } from "react-icons/ti";
import getCart, {
  addToCart,
  getTotal,
  getTotalForLabeledPrice,
  removeFromCart
} from '../../../utils/Cart';
import { BiTrash } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartLoaded) {
      const loadedCart = getCart();
      setCart(loadedCart);
      setCartLoaded(true);
    }
  }, [cartLoaded]);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[700px]">
        {cart.map((item, index) => (
            console.log(item),
          <div
            key={index}
            className="w-full bg-white shadow-2xl my-[50px] flex justify-between items-center relative rounded-md p-2"
          >
            <button>
              <BiTrash
                className="absolute right-[-20px] top-2 text-2xl text-red-500 cursor-pointer"
                onClick={() => {
                  removeFromCart(item.productID);
                  setCartLoaded(false);
                }}
              />
            </button>
            <img
              src={item.image}
              alt={item.name}
              className="w-[100px] h-full aspect-square object-cover rounded-md"
            />
            <div className="h-full max-w-[300px] w-[300px] space-y-1">
              <h1 className="text-xl font-bold">{item.name}</h1>
              <p className="text-sm text-gray-500">{item.altNames}</p>

              {/* Show selected size */}
              {item.selectedSize && (
                <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
              )}

              {/* Show selected color */}
              {item.selectedColor && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <span>Color:</span>
                  <div
                    className="w-4 h-4 rounded-full border border-gray-400"
                    style={{ backgroundColor: item.selectedColor.value || item.selectedColor }}
                    title={item.selectedColor.name || item.selectedColor}
                  />
                  <span>{item.selectedColor.name || item.selectedColor}</span>
                </div>
              )}

              {/* Price Display */}
              {item.labeledPrice > item.price ? (
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold text-red-600">
                    LKR: {item.price.toFixed(2)}
                  </h1>
                  <h1 className="text-md font-bold text-gray-500 line-through">
                    LKR: {item.labeledPrice.toFixed(2)}
                  </h1>
                </div>
              ) : (
                <h1 className="text-xl font-bold text-red-600">
                  LKR: {item.price.toFixed(2)}
                </h1>
              )}

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2 mt-2">
                <button
                  className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center"
                  onClick={() => {
                    addToCart(item, -1);
                    setCartLoaded(false);
                  }}
                >
                  −
                </button>
                <p className="text-lg">{item.quantity}</p>
                <button
                  className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center"
                  onClick={() => {
                    addToCart(item, 1);
                    setCartLoaded(false);
                  }}
                >
                  +
                </button>
              </div>

              <p className="text-sm font-medium">
                Total: LKR {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        {/* Totals */}
        <div className="w-full flex justify-end pr-2 mt-4">
          <h1 className="w-[100px] text-end text-xl">Total:</h1>
          <h1 className="w-[100px] text-end text-xl">
            {getTotalForLabeledPrice().toFixed(2)}
          </h1>
        </div>
        <div className="w-full flex justify-end pr-2">
          <h1 className="w-[100px] text-end text-xl">Discount:</h1>
          <h1 className="w-[100px] text-end text-xl border-b-2">
            {(getTotalForLabeledPrice() - getTotal()).toFixed(2)}
          </h1>
        </div>
        <div className="w-full flex justify-end pr-2 pb-[20px]">
          <h1 className="w-[100px] text-end text-xl">Net Total:</h1>
          <h1 className="w-[100px] text-end text-xl border-double border-b-5">
            {getTotal().toFixed(2)}
          </h1>
        </div>

        {/* Checkout Button */}
        <div className="w-full flex justify-end pr-2 pb-[20px]">
          <button
            className="w-[100px] text-xl text-center cursor-pointer bg-amber-200 p-2 rounded-sm"
            onClick={() =>
              navigate("/checkout", {
                state: {
                  items: cart,
                },
              })
            }
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

