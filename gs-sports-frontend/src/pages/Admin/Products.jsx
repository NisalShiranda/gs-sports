import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IoMdAddCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from 'react-icons/md';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

function Products() {

    const [products,setProducts] = useState([]);
    const [loaded,setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(
        () => {
          if(!loaded){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then((response) => {
              setProducts(response.data)
              setLoaded(true)
          })


          }
            
        } , [loaded]
    )

    async function handleDelete(id) {

      const token = localStorage.getItem("token")
      if(token == null){
        toast.error("Please login to delete a product")
        return
      }

      try{
        await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id, {
          headers: {
            "Authorization" : "Bearer "+token
          }
        })
        toast.success("Product deleted successfully")
        setLoaded(false)
        }
       
       catch(e){
        console.log(e)
        toast.error("Error deleting product")
      }
  }

    
        
  return (
    <>
      <div className="w-full h-full p-[10px] rounded-lg relative">
        <Link to="/admin/addproduct" className="text-[40px] absolute right-[50px] bottom-[30px] text-red-600 cursor-pointer hover:text-green-600">
          <IoMdAddCircle className="" />
        </Link>
        {loaded&&<table className="w-full table-auto border-collapse rounded-xl overflow-hidden shadow-lg text-center">
          <thead>
            <tr className="bg-red-600 text-white text-sm uppercase tracking-wide">
              <th className="px-4 py-3">Product ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Labeled Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {products.map((product, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-100 hover:bg-green-100 transition duration-200 cursor-pointer"
              >
                <td className="px-4 py-3 font-medium">{product.productID}</td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 line-through text-gray-500">
                  ${product.labeledPrice.toFixed(2)}
                </td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3 flex justify-center items-center space-x-3">
                  <div className=" ">
                    <FaTrash className="text-lg hover:text-red-600 transition duration-200" onClick={() => {
                      handleDelete(product.productID)
                    }} />
                  </div>
                  <div className=" ">
                  <MdModeEdit className="text-lg hover:text-blue-600 transition duration-200" onClick={() => {
                    navigate("/admin/editproduct",{
                      state: product
                    })
                  }} />
                  </div>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>}
        {
          !loaded && <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        }
      </div>
    </>
  );
}


export default Products
