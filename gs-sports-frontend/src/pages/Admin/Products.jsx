// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaTrash } from "react-icons/fa";
// import { MdModeEdit } from 'react-icons/md';
// import toast from 'react-hot-toast';
// import Loader from '../../components/Loader';

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [loaded, setLoaded] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loaded) {
//       axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product")
//         .then((response) => {
//           setProducts(response.data);
//           setLoaded(true);
//         });
//     }
//   }, [loaded]);

//   async function handleDelete(id) {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login to delete a product");
//       return;
//     }

//     try {
//       await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + id, {
//         headers: {
//           "Authorization": "Bearer " + token
//         }
//       });
//       toast.success("Product deleted successfully");
//       setLoaded(false);
//     } catch (e) {
//       console.log(e);
//       toast.error("Error deleting product");
//     }
//   }

//   return (
//     <div className="w-full h-full p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Product List</h2>
//         <Link
//           to="/admin/addproduct"
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-green-600 transition text-sm font-medium"
//         >
//           + Create New Product
//         </Link>
//       </div>

//       {loaded ? (
//         <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
//           <table className="min-w-full text-sm text-left text-gray-700">
//             <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
//               <tr>
//                 <th className="px-6 py-4">Product ID</th>
//                 <th className="px-6 py-4">Name</th>
//                 <th className="px-6 py-4 text-right">Price</th>
//                 <th className="px-6 py-4 text-right">Labeled Price</th>
//                 <th className="px-6 py-4 text-center">Stock</th>
//                 <th className="px-6 py-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product, index) => (
//                 <tr
//                   key={index}
//                   className="hover:bg-gray-50 transition duration-200 border-b border-gray-100"
//                 >
//                   <td className="px-6 py-4 font-medium">{product.productID}</td>
//                   <td className="px-6 py-4">{product.name}</td>
//                   <td className="px-6 py-4 text-right text-green-600 font-semibold">
//                     ${product.price.toFixed(2)}
//                   </td>
//                   <td className="px-6 py-4 text-right line-through text-gray-400">
//                     ${product.labeledPrice.toFixed(2)}
//                   </td>
//                   <td className="px-6 py-4 text-center">{product.stock}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex justify-center gap-4 text-base">
//                       <button
//                         title="Edit"
//                         onClick={() =>
//                           navigate("/admin/editproduct", { state: product })
//                         }
//                         className="text-blue-500 hover:text-blue-700 transition"
//                       >
//                         <MdModeEdit />
//                       </button>
//                       <button
//                         title="Delete"
//                         onClick={() => handleDelete(product.productID)}
//                         className="text-red-500 hover:text-red-700 transition"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="w-full h-full flex justify-center items-center">
//           <Loader />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Products;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from 'react-icons/md';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

function Products() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((response) => {
          setProducts(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  async function handleDelete(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to delete a product");
      return;
    }

    try {
      await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + id, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      toast.success("Product deleted successfully");
      setLoaded(false);
    } catch (e) {
      console.log(e);
      toast.error("Error deleting product");
    }
  }

  return (
    <div className="w-full h-full p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Product List</h2>
        <Link
          to="/admin/addproduct"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-green-600 transition text-sm font-medium"
        >
          + Create New Product
        </Link>
      </div>

      {loaded ? (
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Sizes</th>
                <th className="px-4 py-3">Colors</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">Label Price</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150 border-b border-gray-100"
                >
                  <td className="px-4 py-3 font-semibold text-sm">{product.productID}</td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3 capitalize">{product.category}</td>
                  <td className="px-4 py-3">{product.sizes?.join(', ')}</td>
                  <td className="px-4 py-3">{product.colors?.join(', ')}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-semibold">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right line-through text-gray-400">
                    ${product.labeledPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">{product.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-5 text-lg">
                      <button
                        title="Edit Product"
                        onClick={() => navigate("/admin/editproduct", { state: product })}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <MdModeEdit size={20} />
                      </button>
                      <button
                        title="Delete Product"
                        onClick={() => handleDelete(product.productID)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Products;
