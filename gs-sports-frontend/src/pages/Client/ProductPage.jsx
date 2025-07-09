import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import ProductCard from '../../components/ProductCard'

function ProductPage() {

  const [productsList, setProductsList] = useState([])
  const [productsLoaded, setProductsLoaded] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!productsLoaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/").then((response) => {
        setProductsList(response.data)
        setProductsLoaded(true)
      })
    }
  }, [productsLoaded])

  function searchProducts() {
    if (search.length > 0) {
      axios.get(import.meta.env.VITE_BACKEND_URL + `/api/product/search?q=${search}`)
        .then((response) => {
          setProductsList(response.data.products);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    } else {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
        .then((response) => {
          setProductsList(response.data.products);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-6">
      
      {/* Search Section */}
      <div className="w-full max-w-5xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full md:w-2/3 px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-black text-white rounded-lg hover:opacity-90 transition"
            onClick={() => {
              searchProducts();
              setProductsLoaded(false);
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Product Display Section */}
      {productsLoaded ? (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsList.map((product, index) => {
            return (
              <ProductCard key={index} product={product} />
            )
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default ProductPage
