import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import { CgArrowLongUpR } from 'react-icons/cg';
import { FaClosedCaptioning } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';

function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
    const [displayingOrder, setDisplayingOrder] = useState(null);

    useEffect(() =>{
        if(!loaded){
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_BACKEND_URL +"/api/order", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }).then((response) => {
                console.log(response.data);
                setOrders(response.data);
                setLoaded(true);
            }).catch((error) => {
                console.error("Error fetching orders:", error);
                toast.error("Failed to load orders");
            })
            
        }else{
            console.log("Orders already loaded");
        }
    },[loaded])

            /* 
            "_id": "67d6d0708868fc4a508ace31",
            "orderID": "ORD0001",
            "email": "customer0@gmail.com",
            "name": "John Doe",
            "address": "123 Main Street, City, Country",
            "status": "Pending",
            "phoneNumber": "+1234567890",
            "billItems": [],
            "date": "2025-03-16T13:21:52.555Z",
            "__v": 0
        */

        function changeOrderStatus(orderID, status) {

            const token = localStorage.getItem("token");
            axios.put(import.meta.env.VITE_BACKEND_URL +"/api/order/"+orderID, {status: status}, {
                headers: {
                    Authorization: "Bearer " + token,
                }

        } ).then(() => {
            toast.success("Order status updated successfully");
            setLoaded(false);
        })
    }

        function deleteOrder(orderID){

            const token = localStorage.getItem("token");
            axios.delete(import.meta.env.VITE_BACKEND_URL +"/api/order/"+orderID, {
                headers: {
                    Authorization: "Bearer " + token,
                }
        }).then(() => {
            toast.success("Order deleted successfully");
            setLoaded(false);
        })

    }



  return (
    <div className="w-full h-full">
      {
        loaded?
        <div className="W-full h-full bg-amber-200">
        <table className="w-full table-auto border-collapse rounded-xl overflow-hidden shadow-lg text-center">
        <thead>
            <tr className="bg-red-600 text-white text-sm uppercase tracking-wide">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer Email</th>
              <th className="px-4 py-3">Customer Name</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Date</th>
              <th></th>

            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
                      {orders.map((order) => (
                        <tr
                          key={order.orderID}
                          className="odd:bg-white even:bg-gray-100 hover:bg-green-100 transition duration-200 cursor-pointer" 
                        >
                          <td className="px-4 py-3 font-medium">{order.orderID}</td>
                            <td className="px-4 py-3">{order.email}</td>
                            <td className="px-4 py-3">{order.name}</td>
                            <td className="px-4 py-3">{order.address}</td>
                            <td className="px-4 py-3">
                                <select value={order.status} onChange={(e) => {
                                    changeOrderStatus(order.orderID, e.target.value);
                                     // Reload orders after status change
                                }}>
                                    <option value="Pending">Pending</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Processing">Processing</option>
                                </select>
                            </td>
                            <td className="px-4 py-3">
                              {order.total}
                            </td>
                            <td className="px-4 py-3">{new Date(order.date).toDateString()}</td>
                            <td className="px-4 py-3 flex flex-col">
                                <button className="text-lg text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => {
                                    setModalIsDisplaying(true);
                                    setDisplayingOrder(order);
                                }}>
                                    Details
                                </button>
                                <div className="text-lg text-red-600 hover:text-red-800 cursor-pointer" onClick={() => {
                                    deleteOrder(order.orderID);
                                }}>Delete</div>

                            </td>

                          
                        </tr>
                      ))}
                      
                    </tbody>
        </table>
        {
            modalIsDisplaying &&
            <div className="fixed bg-[#00000098] w-full h-full top-0 left-0 flex justify-center items-center">
                <div className="bg-white shadow-lg w-[600px] h-[650px] max-h-[650px]  rounded-xl flex flex-col    relative">
                    <button className="cursor-pointer" onClick={() => {
                        setModalIsDisplaying(false);
                    }}><IoCloseCircle className="text-3xl absolute right-0 top-2" /></button>
                    <div className="w-full  bg-yellow-200 flex flex-col justify-center items-center  rounded-t-xl">
                        <h1>Order ID: {displayingOrder.orderID}</h1>
                        <h1 className="text-2xl font-bold">Customer: {displayingOrder.name}</h1>
                        <h1 className="text-md font-semibold">Email: {displayingOrder.email}</h1>
                        <h1 className="text-md font-semibold">Phone: {displayingOrder.phoneNumber}</h1>
                        <h1 className="text-md font-semibold">Address: {displayingOrder.address}</h1>
                        <h1 className="text-md font-semibold">Status: {displayingOrder.status}</h1>
                        <h1 className="text-md font-semibold">Date: {new Date(displayingOrder.date).toDateString()}</h1>
                        <h1 className="text-md font-semibold">Total: {displayingOrder.total}</h1>
                        
                        

                    </div>
                    <div className="w-full h-full overflow-y-scroll px-4">
  {displayingOrder.billItems.map((item, index) => (
    <div
      key={index}
      className="w-full flex justify-between items-center py-3 border-b"
    >
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.productName}
        className="w-[60px] h-[60px] object-cover rounded-md"
      />

      {/* Product Info */}
      <div className="flex flex-col flex-1 ml-3">
        <h1 className="text-lg font-semibold">{item.productName}</h1>

        {/* ✅ Show Size if exists */}
        {item.selectedSize && (
          <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
        )}

        {/* ✅ Show Color if exists */}
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
      </div>

      {/* Price Details */}
      <div className="flex flex-col items-end space-y-1">
        <p className="text-sm">Price: LKR {item.price.toFixed(2)}</p>
        <p className="text-sm">Qty: {item.quantity}</p>
        <p className="text-sm font-semibold">
          Total: LKR {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  ))}
</div>

                   
                </div>

            </div>
        }
        </div>
        :<Loader />
      }
    </div>
  )
}

export default AdminOrders

// 24190198160-j2hrn584q49m2orouoh7ndmc7i35luld.apps.googleusercontent.com
