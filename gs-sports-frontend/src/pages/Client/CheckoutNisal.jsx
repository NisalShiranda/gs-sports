// import React, {  useState } from 'react'
// import { TiShoppingCart } from "react-icons/ti";

// import { BiTrash } from 'react-icons/bi';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// function Checkout() {
//     const location = useLocation();
    
//     const [cart, setCart] = useState(location.state.items)
//     const [cartRefresh, setCartRefresh] = useState(false);
//     const [name, setName] = useState("");
//     const [address, setAddress] = useState("");
//     const [phone, setPhone] = useState("");
//     const navigate = useNavigate();

//     function placeOrder(){

//         const orderData = {
//             name : name, // Replace with actual user data
//             address : address, // Replace with actual user data
//             phoneNumber : phone, // Replace with actual user data  
//             billItems : []
//         }
//         for(let i = 0; i < cart.length; i++){
//             orderData.billItems[i] = {
//                 productID : cart[i].productID,
//                 quantity : cart[i].quantity
//             }
//         }

//         const token = localStorage.getItem("token");
//         axios.post(import.meta.env.VITE_BACKEND_URL +"/api/order", orderData, {
//             headers: {
//                 Authorization: "Bearer " + token,
//             },
//         }).then(() => {
            
//             toast.success("Order placed successfully")
//             console.log(orderData)
            
//             navigate("/")
//         }).catch(() => {
            
//             toast.error("Error placing order")
//         })
//     }

//     function getTotal(){
//         let total = 0;
//         cart.forEach((item) => {
//             total += item.price * item.quantity
//         })
//         return total
//     }
//     function getTotalForLabeledPrice(){
//         let total = 0;
//         cart.forEach((item) => {
//             total += item.labeledPrice * item.quantity
//         })
//         return total
//     }

    
//   return (
//     <div className="w-full h-full flex justify-center  ">
//         <div className="w-[700px]">
//             {
//                 cart.map((item,index) => {
//                     return(
                        
//                        <div key={index} className='w-full  bg-white shadow-2xl my-[50px] flex justify-between items-center relative'>
//                        <button>
//                         <BiTrash className='absolute right-[-20px] top-2 text-2xl text-red-500 cursor-pointer' onClick={() => {
//                             const newCart = cart.filter((prdct) => prdct.productID !== item.productID)
//                             setCart(newCart)
                            
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
//                                 const newCart = cart;
//                                 newCart[index].quantity -= 1;
//                                 if(newCart[index].quantity <= 0){
//                                     newCart[index].quantity = 1;}
//                                     setCart(newCart)
//                                     setCartRefresh(!cartRefresh)
                                
//                             }}>-</button>
//                             <p>{item.quantity}</p>
//                             <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer" onClick={() => {
//                                 const newCart = cart;
//                                 newCart[index].quantity += 1;
//                                 setCart(newCart)
//                                 setCartRefresh(!cartRefresh)
                                
                                
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
//                 <h1 className="w-[100px]  text-end text-xl border-b-2">{getTotalForLabeledPrice().toFixed(2)-getTotal().toFixed(2)}</h1>
//             </div>
//             <div className="w-full   flex justify-end pr-2 pb-[20px]">
//                 <h1 className="w-[100px]  text-end text-xl">Net Total: </h1>
//                 <h1 className="w-[100px]  text-end text-xl border-double border-b-5">{getTotal().toFixed(2)}</h1>
//             </div>
//             <div className="w-full flex flex-col space-y-4">
//                 <input type="text" placeholder="Name" className="w-full p-2 border-2 border-gray-300 rounded-md" value={name} onChange={(e) => setName(e.target.value)} />
//                 <input type="text" placeholder="Address" className="w-full p-2 border-2 border-gray-300 rounded-md" value={address} onChange={(e) => setAddress(e.target.value)} />
//                 <input type="text" placeholder="Phone Number" className="w-full p-2 border-2 border-gray-300 rounded-md" value={phone} onChange={(e) => setPhone(e.target.value)} />
//             </div>
//             <div className="w-full flex justify-end pr-2 pb-[20px]">
//                 <button className="w-[100px] text-xl text-center cursor-pointer bg-amber-200 p-2 rounded-sm" onClick={() => {
//                     placeOrder();
//                 }}>Place Order</button>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Checkout
import React, { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Checkout() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state.items);
  const [cartRefresh, setCartRefresh] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  function placeOrder() {
    const orderData = {
      name: name,
      address: address,
      phoneNumber: phone,
      billItems: cart.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })),
    };

    const token = localStorage.getItem('token');
    axios
      .post(import.meta.env.VITE_BACKEND_URL + '/api/order', orderData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(() => {
        toast.success('Order placed successfully');
        navigate('/');
      })
      .catch(() => {
        toast.error('Error placing order');
      });
  }

  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function getTotalForLabeledPrice() {
    return cart.reduce(
      (total, item) => total + item.labeledPrice * item.quantity,
      0
    );
  }

  

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[700px]">
        {cart.map((item, index) => (
            
          <div
            key={index}
            className="w-full bg-white shadow-2xl my-[50px] flex justify-between items-center relative"
          >
            <button>
              <BiTrash
                className="absolute right-[-20px] top-2 text-2xl text-red-500 cursor-pointer"
                onClick={() => {
                  const newCart = cart.filter(
                    (prdct) => prdct.productID !== item.productID
                  );
                  setCart(newCart);
                }}
              />
            </button>
            <img
              src={item.image}
              alt={item.name}
              className="w-[100px] h-full aspect-square object-cover"
            />
            <div className="h-full max-w-[300px] w-[300px]">
              <h1 className="text-xl font-bold">{item.name}</h1>
              <p>{item.altNames}</p>

              {/* ✅ Size and Color */}
              {item.selectedSize && (
                <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
              )}
              
              {item.selectedColor && (
  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
    <span>Color:</span>
    <div
      className="w-4 h-4 rounded-full border border-gray-400"
      style={{ backgroundColor: item.selectedColor }}
      title={item.selectedColor}
    />
    <span>{item.selectedColor}</span>
  </div>
)}

              {item.labeledPrice > item.price ? (
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-red-500">
                    LKR: {item.price.toFixed(2)}
                  </h1>
                  <h1 className="text-md font-bold text-gray-500 line-through">
                    LKR: {item.labeledPrice.toFixed(2)}
                  </h1>
                </div>
              ) : (
                <h1 className="text-2xl font-bold text-red-500 text-center">
                  LKR: {item.price.toFixed(2)}
                </h1>
              )}

              <div className="flex space-x-2 mt-2">
                <button
                  className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center"
                  onClick={() => {
                    const newCart = [...cart];
                    newCart[index].quantity = Math.max(1, newCart[index].quantity - 1);
                    setCart(newCart);
                    setCartRefresh(!cartRefresh);
                  }}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center"
                  onClick={() => {
                    const newCart = [...cart];
                    newCart[index].quantity += 1;
                    setCart(newCart);
                    setCartRefresh(!cartRefresh);
                  }}
                >
                  +
                </button>
              </div>

              <p>Total: LKR {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}

        {/* Totals */}
        <div className="w-full flex justify-end pr-2">
          <h1 className="w-[100px] text-end text-xl">Total: </h1>
          <h1 className="w-[100px] text-end text-xl">
            {getTotalForLabeledPrice().toFixed(2)}
          </h1>
        </div>
        <div className="w-full flex justify-end pr-2">
          <h1 className="w-[100px] text-end text-xl">Discount: </h1>
          <h1 className="w-[100px] text-end text-xl border-b-2">
            {(getTotalForLabeledPrice() - getTotal()).toFixed(2)}
          </h1>
        </div>
        <div className="w-full flex justify-end pr-2 pb-[20px]">
          <h1 className="w-[100px] text-end text-xl">Net Total: </h1>
          <h1 className="w-[100px] text-end text-xl border-double border-b-5">
            {getTotal().toFixed(2)}
          </h1>
        </div>

        {/* Input Fields */}
        <div className="w-full flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-2 border-2 border-gray-300 rounded-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Place Order */}
        <div className="w-full flex justify-end pr-2 pb-[20px]">
          <button
            className="w-[100px] text-xl bg-amber-200 p-2 rounded-sm"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

