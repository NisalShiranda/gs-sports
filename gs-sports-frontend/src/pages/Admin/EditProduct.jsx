import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import mediaUpload from '../../../utils/MediaUpload';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function EditProduct() {
  const locationData = useLocation();
  const navigate = useNavigate();

  const [productId, setProductId] = useState(locationData.state.productID);
  const [productName, setProductName] = useState(locationData.state.name);
  const [alternativeNames, setAlternativeNames] = useState(locationData.state.altNames.join(','));
  const [price, setPrice] = useState(locationData.state.price);
  const [labeledPrice, setLabeledPrice] = useState(locationData.state.labeledPrice);
  const [description, setDescription] = useState(locationData.state.description);
  const [stock, setStock] = useState(locationData.state.stock);

  const [allImages, setAllImages] = useState(
    (locationData.state.images || []).map((url, index) => ({
      id: `old-${index}`,
      url,
      file: null,
      isNew: false,
    }))
  );

  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImageData = files.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      file: file,
      isNew: true,
    }));
    setAllImages(prev => [...prev, ...newImageData]);
  };

  const handleImageDelete = (id) => {
    setAllImages(prev => prev.filter(img => img.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(allImages);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setAllImages(reordered);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const uploadedImages = await Promise.all(
        allImages.map(async (img) => {
          if (img.isNew && img.file) {
            const url = await mediaUpload(img.file);
            return url;
          }
          return img.url;
        })
      );

      const altNamesArray = alternativeNames.split(',');
      const productData = {
        name: productName,
        altNames: altNamesArray,
        price: price,
        labeledPrice: labeledPrice,
        description: description,
        images: uploadedImages,
        stock: stock,
      };

      const token = localStorage.getItem('token');

      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`, productData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      toast.success('Product Updated Successfully');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      toast.error('Product Updating Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center my-[50px]">
      <div className="bg-white shadow-lg w-[600px] rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Edit Product</h1>

        <input type="text" disabled value={productId} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Alternative Names" value={alternativeNames} onChange={e => setAlternativeNames(e.target.value)} className="w-full border p-2 rounded" />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="w-full border p-2 rounded" />
        <input type="number" placeholder="Labeled Price" value={labeledPrice} onChange={e => setLabeledPrice(e.target.value)} className="w-full border p-2 rounded" />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded h-24" />
        <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} className="w-full border p-2 rounded" />

        <input type="file" multiple onChange={handleImageUpload} className="w-full border p-2 rounded" />

        <div>
          <p className="text-sm mb-1 text-gray-700">Drag images to reorder (first image is priority)</p>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided) => (
                <div
                  className="flex gap-3 overflow-x-auto p-2 border rounded"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {allImages.map((img, index) => (
                    <Draggable key={img.id} draggableId={img.id} index={index}>
                      {(provided) => (
                        <div
                          className="relative w-24 h-24"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img src={img.url} alt="product" className="w-full h-full object-cover rounded" />
                          <button
                            onClick={() => handleImageDelete(img.id)}
                            className="absolute top-1 right-1 text-white bg-red-600 hover:bg-red-700 text-xs rounded-full w-5 h-5 flex justify-center items-center"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="flex justify-between">
          <Link to="/admin/products" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Updating...
              </>
            ) : (
              'Update'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
