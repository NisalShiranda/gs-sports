import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ImageSlider from "../../components/ImageSlider";
import getCart, { addToCart } from "../../../utils/Cart";

function ProductOverview() {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1); // ✅ New state

  useEffect(() => {
    if (!params.id) {
      toast.error("Product ID not found");
      navigate("/products");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${params.id}`)
      .then((res) => {
        const fetched = res.data.product;
        setProduct(fetched);
        setSelectedColor(fetched.colors?.[0] || null);
        setSelectedSize(fetched.sizes?.[0] || null);
        setStatus("loaded");
      })
      .catch(() => {
        setStatus("error");
        toast.error("Error loading product");
      });
  }, [params.id, navigate]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size");
      return;
    }

    const productWithOptions = {
      ...product,
      selectedColor,
      selectedSize,
    };


    addToCart(productWithOptions, quantity);
   // toast.success(`Added ${quantity} item(s) to cart`);
    addToCart(productWithOptions, 1);
    toast.success(
      `Product added to cart`
    );
    console.log(getCart());
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size");
      return;
    }

    navigate("/checkout", {
      state: {
        items: [
          {
            productID: product.productID,
            name: product.name,
            altNames: product.altNames,
            price: product.price,
            labeledPrice: product.labeledPrice,
            image: product.images[0],
            quantity: quantity,
            selectedColor,
            selectedSize,
          },
        ],
      },
    });
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="w-full h-full p-4 md:p-[40px]">
      {status === "loading" && <Loader />}
      {status === "loaded" && (
        <div className="w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="w-full lg:w-[50%] h-64 sm:h-80 md:h-96 lg:h-full bg-gray-300 rounded-md">
            <ImageSlider images={product.images} />
          </div>

          <div className="w-full lg:w-[50%] lg:h-full">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6 h-full flex flex-col">
              {/* Product Details */}
              <div className="mb-4">
                <h1 className="text-sm sm:text-lg font-semibold text-white line-through">
                  <span className="bg-red-800 px-2 py-1 rounded-md">
                    LKR {product.labeledPrice.toFixed(2)}
                  </span>
                </h1>
                <h1 className="font-bold text-xl sm:text-2xl text-gray-600 mb-2 mt-2 uppercase tracking-wide">
                  {product.name}
                </h1>
                <p className="text-gray-500 text-sm sm:text-md">
                  {product.altNames?.join(" | ")}
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-4xl font-bold text-black">
                  LKR {product.price.toFixed(2)}
                </h1>
              </div>

              {/* Colors */}
              {product.colors?.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                    COLORS
                  </h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                          selectedColor === color
                            ? "border-gray-800 ring-2 ring-gray-400"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {selectedColor}
                    </p>
                  )}
                </div>
              )}

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                    SIZES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`px-3 py-2 sm:px-4 sm:py-2 border rounded text-sm transition-all duration-200 ${
                          selectedSize === size
                            ? "border-gray-800 bg-gray-200 text-gray-800"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {selectedSize && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {selectedSize}
                    </p>
                  )}
                </div>
              )}

              {/* ✅ Quantity Selector */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                  Quantity
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-md text-xl font-bold hover:bg-gray-100"
                    onClick={decreaseQty}
                  >
                    −
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-md text-xl font-bold hover:bg-gray-100"
                    onClick={increaseQty}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3">
                <button
                  className="bg-gray-800 text-white py-3 px-4 sm:px-6 rounded-md font-medium hover:bg-gray-700 w-full text-sm sm:text-base"
                  onClick={handleAddToCart}
                  disabled={!selectedColor || !selectedSize}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-yellow-500 text-black py-3 px-4 sm:px-6 rounded-md font-medium hover:bg-yellow-600 w-full text-sm sm:text-base"
                  onClick={handleBuyNow}
                  disabled={!selectedColor || !selectedSize}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-xl sm:text-2xl text-red-500">
            Error loading product
          </h1>
        </div>
      )}
    </div>
  );
}

export default ProductOverview;
