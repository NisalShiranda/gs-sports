import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [userRes, productRes, orderRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/all`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
      ]);

      setUsers(userRes.data);
      setProducts(productRes.data);
      setOrders(orderRes.data);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    }
  };

  
  const recentOrders = [...orders].reverse().slice(0, 10); // Last 5
  const pendingOrders = orders.filter((order) => order.status === 'Pending');
const totalSales = orders
  .filter((order) => order.status === 'Delivered')
  .reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
  <div className="bg-white shadow-md rounded-lg p-5">
    <h4 className="text-lg font-semibold text-gray-700">Total Users</h4>
    <p className="text-3xl font-bold text-blue-600 mt-2">{users.length}</p>
  </div>
  <div className="bg-white shadow-md rounded-lg p-5">
    <h4 className="text-lg font-semibold text-gray-700">Total Products</h4>
    <p className="text-3xl font-bold text-green-600 mt-2">{products.length}</p>
  </div>
  <div className="bg-white shadow-md rounded-lg p-5">
    <h4 className="text-lg font-semibold text-gray-700">Total Orders</h4>
    <p className="text-3xl font-bold text-purple-600 mt-2">{orders.length}</p>
  </div>
  <div className="bg-white shadow-md rounded-lg p-5">
    <h4 className="text-lg font-semibold text-gray-700">Pending Orders</h4>
    <p className="text-3xl font-bold text-orange-600 mt-2">{pendingOrders.length}</p>
  </div>
  <div className="bg-white shadow-md rounded-lg p-5">
    <h4 className="text-lg font-semibold text-gray-700">Total Sales</h4>
    <p className="text-3xl font-bold text-emerald-600 mt-2">
      LKR {totalSales.toLocaleString()}
    </p>
  </div>
</div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h4>
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {recentOrders.length > 0 ? recentOrders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{order.orderID}</td>
                <td className="px-4 py-2">{order.name}</td>
                <td className="px-4 py-2">LKR {order.total}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === "Pending" ? "bg-orange-100 text-orange-600" :
                    order.status === "Delivered" ? "bg-green-100 text-green-600" :
                    order.status === "Cancelled" ? "bg-red-100 text-red-600" :
                    "bg-blue-100 text-blue-600"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">{new Date(order.date).toDateString()}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">No recent orders</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
