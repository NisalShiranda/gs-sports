// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Loader from "../../components/Loader";
// import ProductCard from "../../components/ProductCard";

// function ProductPage() {
//   const [productsList, setProductsList] = useState([]);
//   const [productsLoaded, setProductsLoaded] = useState(false);
//   const [allProducts, setAllProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const categoryFromUrl = urlParams.get("category");
//     if (categoryFromUrl) {
//       setSelectedCategory(categoryFromUrl);
//     }
//   }, [location.search]);

//   useEffect(() => {
//     if (!productsLoaded) {
//       axios
//         .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
//         .then((response) => {
//           setProductsList(response.data);
//           setAllProducts(response.data);
//           setProductsLoaded(true);
//         });
//     }
//   }, [productsLoaded]);

//   // Real-time search filtering
//   useEffect(() => {
//     if (search.length > 0) {
//       const filtered = allProducts.filter(
//         (product) =>
//           product.name?.toLowerCase().includes(search.toLowerCase()) ||
//           product.title?.toLowerCase().includes(search.toLowerCase()) ||
//           product.description?.toLowerCase().includes(search.toLowerCase())
//       );
//       setProductsList(filtered);
//     } else {
//       setProductsList(allProducts);
//     }
//   }, [search, allProducts]);

//   function searchProducts() {
//     if (search.length > 0) {
//       axios
//         .get(
//           import.meta.env.VITE_BACKEND_URL + `/api/product/search?q=${search}`
//         )
//         .then((response) => {
//           setProductsList(response.data);
//           setAllProducts(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching search results:", error);
//         });
//     } else {
//       axios
//         .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
//         .then((response) => {
//           setProductsList(response.data);
//           setAllProducts(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching products:", error);
//         });
//     }
//   }

//   // Group products by category
//   const groupedByCategory = productsList.reduce((acc, product) => {
//     const category = product.category || "Uncategorized";
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(product);
//     return acc;
//   }, {});

//   const categories = ["All", ...Object.keys(groupedByCategory)];

//   // Filter products by selected category
//   const filteredProducts =
//     selectedCategory === "All"
//       ? productsList
//       : groupedByCategory[selectedCategory] || [];

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     if (category === "All") {
//       navigate("/products", { replace: true });
//     } else {
//       navigate(`/products?category=${encodeURIComponent(category)}`, {
//         replace: true,
//       });
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-white text-white px-4 py-6">
//         {/* Search Section */}
//         <div className="w-full max-w-5xl mx-auto mb-4">
//           <div className="flex flex-col md:flex-row items-center justify-center gap-3">
//             <input
//               type="text"
//               placeholder="Search Products..."
//               className="w-full md:w-2/3 px-4 py-3 rounded-lg bg-red-100 text-gray-500 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <button
//               className="px-6 py-3 bg-gradient-to-r from-red-600 to-black text-white rounded-lg hover:opacity-90 transition cursor-pointer"
//               onClick={() => {
//                 searchProducts();
//                 setProductsLoaded(false);
//               }}
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Category Filter Buttons */}
//         <div className="w-full max-w-5xl mx-auto mb-6 flex flex-wrap gap-3 justify-center">
//           {categories.map((category, index) => (
//             <button
//               key={index}
//               className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
//                 selectedCategory === category
//                   ? "bg-red-600 text-white border-red-600"
//                   : "bg-white text-black border-gray-300"
//               }`}
//               onClick={() => handleCategoryChange(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Active Category Display */}
//         {selectedCategory !== "All" && (
//           <div className="w-full max-w-5xl mx-auto mb-6">
//             <h2 className="text-2xl font-bold text-center text-black">
//               {selectedCategory} ({filteredProducts.length} products)
//             </h2>
//           </div>
//         )}

//         {/* Product Display Section */}
//         {productsLoaded ? (
//           <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((product, index) => (
//               <ProductCard key={index} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="flex justify-center items-center h-64">
//             <Loader />
//           </div>
//         )}

//         {/* No Products Found */}
//         {productsLoaded && filteredProducts.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">
//               No products found{" "}
//               {selectedCategory !== "All" ? `in ${selectedCategory}` : ""}
//               {search.length > 0 ? ` matching "${search}"` : ""}
//             </p>
//             <button
//               onClick={() => {
//                 setSearch("");
//                 setSelectedCategory("All");
//                 navigate("/products", { replace: true });
//               }}
//               className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}
//       </div>
//       {/* FOOTER */}
//       <div className="w-full">
//         <footer className="bg-black text-white py-8 px-6 text-center text-sm w-full">
//           <p>&copy; 2025 GS SPORTS. All rights reserved.</p>
//           <p className="mt-2">
//             Email: support@gssports.lk | Phone: +94 77 123 4567
//           </p>
//           <div className="mt-4 flex justify-center gap-6">
//             <a href="#" className="hover:text-red-500">
//               Facebook
//             </a>
//             <a href="#" className="hover:text-red-500">
//               Instagram
//             </a>
//             <a href="#" className="hover:text-red-500">
//               Twitter
//             </a>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// }

// export default ProductPage;
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Loader from "../../components/Loader";
// import ProductCard from "../../components/ProductCard";

// function ProductPage() {
//   const [productsList, setProductsList] = useState([]);
//   const [productsLoaded, setProductsLoaded] = useState(false);
//   const [allProducts, setAllProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const categoryFromUrl = urlParams.get("category");
//     if (categoryFromUrl) {
//       setSelectedCategory(categoryFromUrl);
//     }
//   }, [location.search]);

//   useEffect(() => {
//     if (!productsLoaded) {
//       axios
//         .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
//         .then((response) => {
//           setProductsList(response.data);
//           setAllProducts(response.data);
//           setProductsLoaded(true);
//         });
//     }
//   }, [productsLoaded]);

//   // Real-time search filtering
//   useEffect(() => {
//     if (search.length > 0) {
//       const filtered = allProducts.filter(
//         (product) =>
//           product.name?.toLowerCase().includes(search.toLowerCase()) ||
//           product.title?.toLowerCase().includes(search.toLowerCase()) ||
//           product.description?.toLowerCase().includes(search.toLowerCase())
//       );
//       setProductsList(filtered);
//     } else {
//       setProductsList(allProducts);
//     }
//   }, [search, allProducts]);

//   function searchProducts() {
//     if (search.length > 0) {
//       axios
//         .get(
//           import.meta.env.VITE_BACKEND_URL + `/api/product/search?q=${search}`
//         )
//         .then((response) => {
//           setProductsList(response.data);
//           setAllProducts(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching search results:", error);
//         });
//     } else {
//       axios
//         .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
//         .then((response) => {
//           setProductsList(response.data);
//           setAllProducts(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching products:", error);
//         });
//     }
//   }

//   // Group products by category
//   const groupedByCategory = productsList.reduce((acc, product) => {
//     const category = product.category || "Uncategorized";
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(product);
//     return acc;
//   }, {});

//   const categories = ["All", ...Object.keys(groupedByCategory)];

//   // Filter products by selected category
//   const filteredProducts =
//     selectedCategory === "All"
//       ? productsList
//       : groupedByCategory[selectedCategory] || [];

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     if (category === "All") {
//       navigate("/products", { replace: true });
//     } else {
//       navigate(`/products?category=${encodeURIComponent(category)}`, {
//         replace: true,
//       });
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50">
//         {/* Header Section */}
//         <div className="bg-white border-b border-gray-100">
//           <div className="px-4 py-12">
//             <div className="text-center mb-12">
//               <h1 className="text-4xl font-light text-gray-900 mb-4">Products</h1>
//               <p className="text-gray-600 text-lg font-light">Discover our collection</p>
//             </div>

//             {/* Search Section */}
//             <div className="max-w-2xl mx-auto px-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="w-full px-6 py-4 text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button
//                   className="absolute right-2 top-2 bottom-2 px-6 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
//                   onClick={() => {
//                     searchProducts();
//                     setProductsLoaded(false);
//                   }}
//                 >
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Category Filter Section */}
//         <div className="bg-white border-b border-gray-100">
//           <div className="px-4 py-8">
//             <div className="flex flex-wrap gap-3 justify-center">
//               {categories.map((category, index) => (
//                 <button
//                   key={index}
//                   className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
//                     selectedCategory === category
//                       ? "bg-gray-900 text-white"
//                       : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
//                   }`}
//                   onClick={() => handleCategoryChange(category)}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Active Category Display */}
//         {selectedCategory !== "All" && (
//           <div className="px-4 py-8">
//             <div className="text-center">
//               <h2 className="text-2xl font-light text-gray-900">
//                 {selectedCategory}
//               </h2>
//               <p className="text-gray-600 mt-2">
//                 {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Product Display Section */}
//         <div className="px-24 pb-16">
//           {productsLoaded ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
//               {filteredProducts.map((product, index) => (
//                 <ProductCard key={index} product={product} />
//               ))}
//             </div>
//           ) : (
//             <div className="flex justify-center items-center h-64">
//               <Loader />
//             </div>
//           )}

//           {/* No Products Found */}
//           {productsLoaded && filteredProducts.length === 0 && (
//             <div className="text-center py-16">
//               <div className="max-w-md mx-auto">
//                 <h3 className="text-xl font-light text-gray-900 mb-4">
//                   No products found
//                 </h3>
//                 <p className="text-gray-600 mb-8">
//                   {selectedCategory !== "All" ? `No products available in ${selectedCategory}` : ""}
//                   {search.length > 0 ? ` matching "${search}"` : ""}
//                 </p>
//                 <button
//                   onClick={() => {
//                     setSearch("");
//                     setSelectedCategory("All");
//                     navigate("/products", { replace: true });
//                   }}
//                   className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer className="bg-gray-900 text-white">
//         <div className="max-w-6xl mx-auto px-6 py-12">
//           <div className="text-center">
//             <p className="text-sm text-gray-400 mb-4">
//               &copy; 2025 GS SPORTS. All rights reserved.
//             </p>
//             <p className="text-sm text-gray-400 mb-8">
//               Email: support@gssports.lk | Phone: +94 77 123 4567
//             </p>
//             <div className="flex justify-center gap-8">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
//                 Facebook
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
//                 Instagram
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
//                 Twitter
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }

// export default ProductPage;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";

function ProductPage() {
  const [productsList, setProductsList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryFromUrl = urlParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    if (!productsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
        .then((response) => {
          setProductsList(response.data);
          setAllProducts(response.data);
          setProductsLoaded(true);
        });
    }
  }, [productsLoaded]);

  // Real-time search filtering
  useEffect(() => {
    if (search.length > 0) {
      const filtered = allProducts.filter(
        (product) =>
          product.name?.toLowerCase().includes(search.toLowerCase()) ||
          product.title?.toLowerCase().includes(search.toLowerCase()) ||
          product.description?.toLowerCase().includes(search.toLowerCase())
      );
      setProductsList(filtered);
    } else {
      setProductsList(allProducts);
    }
  }, [search, allProducts]);

  function searchProducts() {
    if (search.length > 0) {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL + `/api/product/search?q=${search}`
        )
        .then((response) => {
          setProductsList(response.data);
          setAllProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
        .then((response) => {
          setProductsList(response.data);
          setAllProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }

  // Group products by category
  const groupedByCategory = productsList.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  const categories = ["All", ...Object.keys(groupedByCategory)];

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "All"
      ? productsList
      : groupedByCategory[selectedCategory] || [];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      navigate("/products", { replace: true });
    } else {
      navigate(`/products?category=${encodeURIComponent(category)}`, {
        replace: true,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 pt-4 pb-1">
            <div className="text-center mb-3">
              <h1 className="text-4xl font-light text-gray-900 mb-4">Products</h1>
              <p className="text-gray-600 text-md font-light">Discover our collection</p>
            </div>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-6 py-4 text-gray-700 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="absolute right-2 top-2 bottom-2 px-6 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                  onClick={() => {
                    searchProducts();
                    setProductsLoaded(false);
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Section */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Category Display */}
        {selectedCategory !== "All" && (
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-light text-gray-900">
                {selectedCategory}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
          </div>
        )}

        {/* Product Display Section */}
        <div className="max-w-6xl mx-auto px-6 pb-16">
          {productsLoaded ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
              {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          )}

          {/* No Products Found */}
          {productsLoaded && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-light text-gray-900 mb-4">
                  No products found
                </h3>
                <p className="text-gray-600 mb-8">
                  {selectedCategory !== "All" ? `No products available in ${selectedCategory}` : ""}
                  {search.length > 0 ? ` matching "${search}"` : ""}
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                    navigate("/products", { replace: true });
                  }}
                  className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">
              &copy; 2025 GS SPORTS. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Email: support@gssports.lk | Phone: +94 77 123 4567
            </p>
            <div className="flex justify-center gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default ProductPage;