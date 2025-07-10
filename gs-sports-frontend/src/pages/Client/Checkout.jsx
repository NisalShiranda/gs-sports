import React, { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { BiTrash } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Checkout() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state.items);
  const [cartRefresh, setCartRefresh] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
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

    const token = localStorage.getItem("token");
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Order placed successfully");
        navigate("/");
      })
      .catch(() => {
        toast.error("Error placing order");
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <TiShoppingCart className="text-3xl" />
              Checkout
            </h1>
          </div>

          {/* Cart Items */}
          <div className="p-6">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 relative border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => {
                      const newCart = cart.filter(
                        (prdct) => prdct.productID !== item.productID
                      );
                      setCart(newCart);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-md"
                  >
                    <BiTrash className="text-lg" />
                  </button>

                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{item.altNames}</p>
                      
                      {/* Size and Color Display */}
                      {item.selectedSize && (
                        <p className="text-sm text-gray-600 mb-1">
                          Size: {item.selectedSize}
                        </p>
                      )}

                      {item.selectedColor && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <span>Color:</span>
                          <div
                            className="w-4 h-4 rounded-full border border-gray-400"
                            style={{ backgroundColor: item.selectedColor }}
                            title={item.selectedColor}
                          />
                          <span>{item.selectedColor}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mb-3">
                        {item.labeledPrice > item.price ? (
                          <>
                            <span className="text-xl font-bold text-red-500">
                              LKR {item.price.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              LKR {item.labeledPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-gray-800">
                            LKR {item.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
                            onClick={() => {
                              const newCart = [...cart];
                              newCart[index].quantity = Math.max(
                                1,
                                newCart[index].quantity - 1
                              );
                              setCart(newCart);
                              setCartRefresh(!cartRefresh);
                            }}
                          >
                            -
                          </button>
                          <span className="text-lg font-medium px-3">
                            {item.quantity}
                          </span>
                          <button
                            className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
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
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800">
                            LKR {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span>LKR {getTotalForLabeledPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg text-green-600">
                  <span>Discount:</span>
                  <span>LKR {(getTotalForLabeledPrice() - getTotal()).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>LKR {getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    placeholder="Your delivery address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Your phone number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="mt-8">
              <button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform shadow-lg cursor-pointer"
                onClick={() => {
                  placeOrder();
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;