// import React, {useState} from 'react'
// import toast from 'react-hot-toast';
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import mediaUpload from '../../../utils/MediaUpload';

// function AddProductForm() {

//   const [productId, setProductId] = useState("");
//   const [productName, setProductName] = useState("");
//   const [alternativeNames, setAlternativeNames] = useState("");
//   const [price, setPrice] = useState("");
//   const [labeledPrice, setLabeledPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [stock, setStock] = useState("");
//   const navigate = useNavigate();

//   async function handleSubmit() {

//     const promiseArray = []

//     for(let i=0; i<images.length; i++){
//       const promise = mediaUpload(images[i])
//       promiseArray.push(promise)
      

//     }

//     try {

//     const result = await Promise.all(promiseArray)
//     console.log(result)
    
    

//     const altNamesInArray = alternativeNames.split(",");

//     const productData = {
//       productID: productId,
//       name: productName,
//       altNames: altNamesInArray,
//       price: price,
//       labeledPrice: labeledPrice,
//       description: description,
//       images : result,
//       stock: stock
//     }

//     const token = localStorage.getItem("token")

//     console.log(token)

//     console.log(productData)

//     await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/product/", productData,{
//       headers: {
//         "Authorization" : "Bearer "+token
//       }
//     })

//     toast.success("Product Added Successfully")
//     navigate("/admin/products")

//   }catch (error){
//     console.log(error)
//     toast.error("Product Adding Failed")
    
//   }
  
//   }

//   return (
//     <>
//       <div className="w-full h-full bg-gray-100 rounded-lg justify-center items-center flex">
//         <div className="bg-white shadow-lg w-[600px] h-[650px] rounded-lg flex flex-col justify-center items-center space-y-5 px-[30px]">
//           <h1 className="text-[30px] font-semibold">Add Product</h1>

//           <input
//             className="w-full h-[40px] border border-black rounded-lg text-center text-black"
//             type="text"
//             placeholder="Product ID"
//             value={productId}
//             onChange={(e) => setProductId(e.target.value)}
//           ></input>

//           <input
//             className="w-full h-[40px] border border-black rounded-lg text-center text-black"
//             type="text"
//             placeholder="Product Name"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//           ></input>

//           <input
//             className="w-full h-[40px] border border-black rounded-lg text-center text-black"
//             type="text"
//             placeholder="Alternative Names"
//             value={alternativeNames}
//             onChange={(e) => setAlternativeNames(e.target.value)}
//           ></input>

//           <input
//             className="w-full h-[40px] border border-black rounded-lg text-center text-black"
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           ></input>

//           <input
//             className="w-full h-[40px] border border-black rounded-lg text-center text-black"
//             type="number"
//             placeholder="Labeled Price"
//             value={labeledPrice}
//             onChange={(e) => setLabeledPrice(e.target.value)}
//           ></input>

//           <textarea
//             className="w-full h-[40px] border border-black rounded-lg text-center text-black"
//             type="description"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>

//           <input 
//             type="file"
//             className="w-full h-[40px] border border-black rounded-lg text-center text-black"
//             placeholder="Image"
//             onChange={(e) => setImages(e.target.files)}
//             multiple
//           ></input>

//           <input
//             className="w-full h-[40px] border border-black rounded-lg text-center text-black"
//             type="number"
//             placeholder="Stock"
//             value={stock}
//             onChange={(e) => setStock(e.target.value)}
//           ></input>

//           <div className="flex space-x-5">
//             <Link
//               to="/admin/products"
//               className="w-[150px] h-[40px] bg-red-600 text-white rounded-lg hover:bg-red-700 text-center flex justify-center items-center"
//             >
//               Cancel
//             </Link>
//             <Link
              
//               className="w-[150px] h-[40px] bg-green-600 text-white rounded-lg hover:bg-green-700 text-center flex justify-center items-center"
//               onClick={handleSubmit}
//             >
//               Add Product
//             </Link>

            
//           </div>

          
          
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddProductForm
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import mediaUpload from '../../../utils/MediaUpload';

const predefinedSizes = {
  Cloth: ['S', 'M', 'L', 'XL'],
  Shoe: ['5', '6', '7', '8', '9', '10', '11'],
};

const colorPalette = ['red', 'blue', 'black', 'green', 'orange', 'purple'];

function AddProductForm() {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [alternativeNames, setAlternativeNames] = useState('');
  const [price, setPrice] = useState('');
  const [labeledPrice, setLabeledPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Cloth');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const navigate = useNavigate();

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  async function handleSubmit() {
    const promiseArray = Array.from(images).map((img) => mediaUpload(img));

    try {
      const result = await Promise.all(promiseArray);
      const altNamesInArray = alternativeNames.split(',').map((name) => name.trim());

      const productData = {
        productID: productId,
        name: productName,
        altNames: altNamesInArray,
        price,
        labeledPrice,
        description,
        category,
        colors: selectedColors,
        sizes: selectedSizes,
        images: result,
        stock,
      };

      const token = localStorage.getItem('token');

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/product/`, productData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      toast.success('Product Added Successfully');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      toast.error('Product Adding Failed');
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[90%] max-w-5xl bg-white p-10 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Product</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <input placeholder="Product ID" className="input" value={productId} onChange={(e) => setProductId(e.target.value)} />
            <input placeholder="Product Name" className="input" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <input placeholder="Alternative Names (comma separated)" className="input" value={alternativeNames} onChange={(e) => setAlternativeNames(e.target.value)} />
            <input placeholder="Price" className="input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input placeholder="Labeled Price" className="input" type="number" value={labeledPrice} onChange={(e) => setLabeledPrice(e.target.value)} />
            <textarea placeholder="Description" className="input" value={description} onChange={(e) => setDescription(e.target.value)} />

            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
              <option value="Cloth">Cloth</option>
              <option value="Shoe">Shoe</option>
              <option value="Accessory">Accessory</option>
              <option value="Trophy">Trophy</option>
            </select>

            {/* COLORS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colors</label>
              <div className="flex gap-2 flex-wrap">
                {colorPalette.map((color) => (
                  <div
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColors.includes(color) ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            {/* SIZES */}
            {['Cloth', 'Shoe'].includes(category) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
                <div className="flex gap-2 flex-wrap">
                  {predefinedSizes[category].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 rounded border ${selectedSizes.includes(size) ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="flex flex-col gap-4">
            <input
              type="file"
              className="input"
              onChange={(e) => setImages(e.target.files)}
              multiple
            />
            <input placeholder="Stock" className="input" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />

            <div className="flex justify-end gap-4 mt-auto">
              <Link
                to="/admin/products"
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </Link>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductForm;

// TailwindCSS base input style
// Add this to your global.css or apply utility classes via @layer
// .input {
//   @apply w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500;
// }



