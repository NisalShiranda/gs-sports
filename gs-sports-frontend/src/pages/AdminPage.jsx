import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { MdSpaceDashboard, MdWarehouse } from "react-icons/md";
import { FaUsers, FaStore } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Products from './Admin/Products';
import AddProductForm from './Admin/AddProductForm';
import EditProduct from './Admin/EditProduct';
import AdminOrders from './Admin/AdminOrders';
import AdminUser from './Admin/AdminUser';
import Loader from '../components/Loader';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminDashboard from './Admin/AdminDashboard';

function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      return navigate("/login");
    }
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (res.data.user.role !== "admin") {
        toast.error("Not authorized");
        navigate("/");
      } else {
        setUserValidated(true);
      }
    }).catch(() => {
      toast.error("Session expired");
      navigate("/login");
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <>
      {userValidated ? (
        <div className="flex w-full h-screen overflow-hidden bg-gray-100">
          {/* Sidebar */}
          <aside className="w-72 h-full bg-white shadow-md flex flex-col p-5">
            <div className="flex items-center justify-center mb-8">
              <h2 className="text-2xl font-bold text-blue-600 text-center">GS SPORTS</h2>
            </div>

            <nav className="h-full flex justify-between flex-col gap-4">
              <div className="space-y-2">
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
                    }`
                  }
                >
                  <MdSpaceDashboard size={20} /> Dashboard
                </NavLink>

                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
                    }`
                  }
                >
                  <FaUsers size={20} /> Users
                </NavLink>

                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
                    }`
                  }
                >
                  <MdWarehouse size={20} /> Products
                </NavLink>

                <NavLink
                  to="/admin/orders"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
                    }`
                  }
                >
                  <FaStore size={20} /> Orders
                </NavLink>
              </div>

              <div className="self-flex flex flex-end justify-center items-center">
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <p>Log Out</p>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route path="/*" element={<AdminDashboard />} />
              <Route path="/users" element={<AdminUser />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/addproduct" element={<AddProductForm />} />
              <Route path="/editproduct" element={<EditProduct />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default AdminPage;
