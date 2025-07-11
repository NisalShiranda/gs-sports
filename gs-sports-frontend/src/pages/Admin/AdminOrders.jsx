import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { CgArrowLongUpR } from "react-icons/cg";
import { FaClosedCaptioning } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
  const [displayingOrder, setDisplayingOrder] = useState(null);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          toast.error("Failed to load orders");
        });
    } else {
      console.log("Orders already loaded");
    }
  }, [loaded]);

  function changeOrderStatus(orderID, status) {
    const token = localStorage.getItem("token");
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderID,
        { status: status },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        toast.success("Order status updated successfully");
        setLoaded(false);
      });
  }

  function deleteOrder(orderID) {
    const token = localStorage.getItem("token");
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderID, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Order deleted successfully");
        setLoaded(false);
      });
  }

  return (
    <div className="w-full h-full">
      {loaded ? (
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
                    <select
                      value={order.status}
                      onChange={(e) => {
                        changeOrderStatus(order.orderID, e.target.value);
                        // Reload orders after status change
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">{order.total}</td>
                  <td className="px-4 py-3">
                    {new Date(order.date).toDateString()}
                  </td>
                  <td className="px-4 py-3 flex flex-col">
                    <button
                      className="text-lg text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => {
                        setModalIsDisplaying(true);
                        setDisplayingOrder(order);
                      }}
                    >
                      Details
                    </button>
                    <div
                      className="text-lg text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => {
                        deleteOrder(order.orderID);
                      }}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {modalIsDisplaying && (
            <div className="fixed bg-[#00000098] w-full h-full top-0 left-0 flex justify-center items-center z-50 p-4">
              <div className="bg-white shadow-xl w-full max-w-[650px] h-[90vh] max-h-[700px] rounded-lg flex flex-col relative overflow-hidden border border-gray-200">
                <button
                  className="absolute right-3 top-3 z-10 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                  onClick={() => {
                    setModalIsDisplaying(false);
                  }}
                >
                  <IoCloseCircle className="text-2xl hover:scale-110 transition-transform duration-200" />
                </button>
                {/* Header Section */}
                <div className="bg-black  text-white px-6 py-5 rounded-t-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-start gap-4">
                      <span className="text-sm font-medium bg-slate-700 px-3 py-1 rounded-md">
                        Order #{displayingOrder.orderID}
                      </span>
                      <div
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          displayingOrder.status === "Delivered"
                            ? "bg-green-600 text-white"
                            : displayingOrder.status === "Pending"
                            ? "bg-orange-500 text-white"
                            : displayingOrder.status === "Processing"
                            ? "bg-blue-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {displayingOrder.status}
                      </div>
                    </div>

                    <h1 className="text-2xl font-bold">
                      {displayingOrder.name}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Email : </span>
                        {displayingOrder.email}
                      </div>
                      <div>
                        <span className="font-medium">Phone : </span>
                        {displayingOrder.phoneNumber}
                      </div>
                      <div>
                        <span className="font-medium">Address : </span>
                        {displayingOrder.address}
                      </div>
                      <div>
                        <span className="font-medium">Date : </span>
                        {new Date(displayingOrder.date).toDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Total : </span>
                        <span className="text-lg font-bold text-white ml-2">
                          LKR
                        </span>
                        <span className="text-lg font-bold text-white ml-2">
                          {displayingOrder.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 bg-gray-50 sticky top-0 py-2">
                    Items ({displayingOrder.billItems.length})
                  </h2>

                  <div className="space-y-3">
                    {displayingOrder.billItems.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-gray-800 mb-2">
                              {item.productName}
                            </h3>

                            <div className="space-y-1">
                              {/* Size */}
                              {item.selectedSize && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    Size
                                  </span>
                                  <span className="text-sm text-gray-700">
                                    {item.selectedSize}
                                  </span>
                                </div>
                              )}

                              {/* Color */}
                              {item.selectedColor && (
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    Color
                                  </span>
                                  <div
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{
                                      backgroundColor: item.selectedColor,
                                    }}
                                    title={item.selectedColor}
                                  />
                                  <span className="text-sm text-gray-700">
                                    {item.selectedColor}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-1 text-right">
                            <div className="text-sm text-gray-600">
                              LKR {item.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </div>
                            <div className="text-base font-bold text-gray-800">
                              LKR {(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default AdminOrders;
