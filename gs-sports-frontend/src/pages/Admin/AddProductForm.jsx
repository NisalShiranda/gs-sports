import React, {useState} from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import mediaUpload from '../../../utils/MediaUpload';

function AddProductForm() {

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [price, setPrice] = useState("");
  const [labeledPrice, setLabeledPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {

    const promiseArray = []

    for(let i=0; i<images.length; i++){
      const promise = mediaUpload(images[i])
      promiseArray.push(promise)
      

    }

    try {

    const result = await Promise.all(promiseArray)
    console.log(result)
    
    

    const altNamesInArray = alternativeNames.split(",");

    const productData = {
      productID: productId,
      name: productName,
      altNames: altNamesInArray,
      price: price,
      labeledPrice: labeledPrice,
      description: description,
      images : result,
      stock: stock
    }

    const token = localStorage.getItem("token")

    console.log(token)

    console.log(productData)

    await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/product/", productData,{
      headers: {
        "Authorization" : "Bearer "+token
      }
    })

    toast.success("Product Added Successfully")
    navigate("/admin/products")

  }catch (error){
    console.log(error)
    toast.error("Product Adding Failed")
    
  }
  
  }

  return (
    <>
      <div className="w-full h-full bg-gray-100 rounded-lg justify-center items-center flex">
        <div className="bg-white shadow-lg w-[600px] h-[650px] rounded-lg flex flex-col justify-center items-center space-y-5 px-[30px]">
          <h1 className="text-[30px] font-semibold">Add Product</h1>

          <input
            className="w-full h-[40px] border border-black rounded-lg text-center text-black"
            type="text"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          ></input>

          <input
            className="w-full h-[40px] border border-black rounded-lg text-center text-black"
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          ></input>

          <input
            className="w-full h-[40px] border border-black rounded-lg text-center text-black"
            type="text"
            placeholder="Alternative Names"
            value={alternativeNames}
            onChange={(e) => setAlternativeNames(e.target.value)}
          ></input>

          <input
            className="w-full h-[40px] border border-black rounded-lg text-center text-black"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>

          <input
            className="w-full h-[40px] border border-black rounded-lg text-center text-black"
            type="number"
            placeholder="Labeled Price"
            value={labeledPrice}
            onChange={(e) => setLabeledPrice(e.target.value)}
          ></input>

          <textarea
            className="w-full h-[40px] border border-black rounded-lg text-center text-black"
            type="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input 
            type="file"
            className="w-full h-[40px] border border-black rounded-lg text-center text-black"
            placeholder="Image"
            onChange={(e) => setImages(e.target.files)}
            multiple
          ></input>

          <input
            className="w-full h-[40px] border border-black rounded-lg text-center text-black"
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          ></input>

          <div className="flex space-x-5">
            <Link
              to="/admin/products"
              className="w-[150px] h-[40px] bg-red-600 text-white rounded-lg hover:bg-red-700 text-center flex justify-center items-center"
            >
              Cancel
            </Link>
            <Link
              
              className="w-[150px] h-[40px] bg-green-600 text-white rounded-lg hover:bg-green-700 text-center flex justify-center items-center"
              onClick={handleSubmit}
            >
              Add Product
            </Link>

            
          </div>

          
          
        </div>
      </div>
    </>
  );
}

export default AddProductForm
