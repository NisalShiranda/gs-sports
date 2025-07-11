// import React, { useEffect, useState } from 'react'
// import { Routes, Route, Link, useNavigate } from 'react-router-dom'
// import { MdSpaceDashboard } from "react-icons/md";
// import { FaUsers } from "react-icons/fa";
// import { MdWarehouse } from "react-icons/md";
// import { FaStore } from "react-icons/fa";
// import Products from './Admin/Products';
// import AddProductForm from './Admin/AddProductForm';
// import EditProduct from './Admin/EditProduct';
// import RegisterPage from './Client/Register';
// import AdminOrders from './Admin/AdminOrders';
// import Loader from '../components/Loader';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// function AdminPage() {

//     const [userValidated, setUserValidated] = useState(false);
//     const navigate = useNavigate();
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if(token === null) {
//             toast.error("You are not logged in");
//             navigate("/login");
//         }else{
//         axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {

//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then((response) => {
            
//             const user = response.data.user;
            
//             if(user.role !== "admin") {
//                 toast.error("You are not authorized to access this page");
//                 navigate("/");
                
//             }else{
//                 setUserValidated(true)
//             }
            

            
//         }).catch(() => {
//             toast.error("Something went wrong please login");
//             setUserValidated(false);
//         });
//     }
        
//     })



//   return (
//     <>
//         {userValidated ?
//             <div className="w-full h-screen bg-gray-200 flex py-2 pr-2">
//             <div className="w-[300px] h-full py-[10px] px-[10px] space-y-5 flex flex-col items-center ">
            
//                 <Link to="/admin" className="px-[10px] py-[10px] border w-full rounded-lg flex items-center"><MdSpaceDashboard className="mr-2" />Dashboard</Link>
//                 <Link to="/admin/users" className="px-[10px] py-[10px] border w-full rounded-lg flex items-center "><FaUsers className="mr-2" />Users</Link>
//                 <Link to="/admin/products" className="px-[10px] py-[10px] border w-full rounded-lg flex items-center "><MdWarehouse className="mr-2" />Products</Link>
//                 <Link to="/admin/orders" className="px-[10px] py-[10px] border w-full rounded-lg flex items-center"><FaStore className="mr-2" />Orders</Link>

//             </div>
//             <div className="w-[calc(100vw-300px)] bg-white h-full rounded-lg">
//                 <Routes>
//                     <Route path="/*" element={<h1>Dashboard</h1>} />
//                     <Route path="/users" element={<h1>Users</h1>} />
//                     <Route path="/products" element={<Products />} />
//                     <Route path="/orders" element={<AdminOrders />} />
//                     <Route path="/addproduct" element={<AddProductForm />} />
//                     <Route path="/editproduct" element={<EditProduct/>} />
                    
                   
//                 </Routes>
//             </div>
//         </div>: <Loader />}
        
//     </>
//   )
// }

// export default AdminPage
import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { MdSpaceDashboard, MdWarehouse } from "react-icons/md";
import { FaUsers, FaStore } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Products from './Admin/Products';
import AddProductForm from './Admin/AddProductForm';
import EditProduct from './Admin/EditProduct';
import AdminOrders from './Admin/AdminOrders';
import Loader from '../components/Loader';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const navigate = useNavigate();

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
              <div><Link
                to="/admin"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition text-gray-700"
              >
                <MdSpaceDashboard size={20} /> Dashboard
              </Link>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition text-gray-700"
              >
                <FaUsers size={20} /> Users
              </Link>
              <Link
                to="/admin/products"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition text-gray-700"
              >
                <MdWarehouse size={20} /> Products
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition text-gray-700"
              >
                <FaStore size={20} /> Orders
              </Link>
              </div>
              <div className="self-flex flex flex-end justify-center items-center">
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <p className="">Log Out</p>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <Routes>
              <Route
                path="/*"
                element={
                  <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
                }
              />
              <Route
                path="/users"
                element={
                  <h1 className="text-2xl font-semibold">User Management</h1>
                }
              />
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

