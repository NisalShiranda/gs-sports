
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import ProductCard from '../../components/ProductCard'

function ProductPage() {
  const [productsList, setProductsList] = useState([])
  const [productsLoaded, setProductsLoaded] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    if (!productsLoaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
        .then((response) => {
          setProductsList(response.data)
          setProductsLoaded(true)
        })
    }
  }, [productsLoaded])

  function searchProducts() {
    if (search.length > 0) {
      axios.get(import.meta.env.VITE_BACKEND_URL + `/api/product/search?q=${search}`)
        .then((response) => {
          setProductsList(response.data.products)
        })
        .catch((error) => {
          console.error("Error fetching search results:", error)
        })
    } else {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
        .then((response) => {
          setProductsList(response.data.products)
        })
        .catch((error) => {
          console.error("Error fetching products:", error)
        })
    }
  }

  // Group products by category
  const groupedByCategory = productsList.reduce((acc, product) => {
    const category = product.category || "Uncategorized"
    if (!acc[category]) acc[category] = []
    acc[category].push(product)
    return acc
  }, {})

  const categories = ["All", ...Object.keys(groupedByCategory)]

  // Filter products by selected category
  const filteredProducts = selectedCategory === "All"
    ? productsList
    : groupedByCategory[selectedCategory] || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-6">

      {/* Search Section */}
      <div className="w-full max-w-5xl mx-auto mb-4">
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
              searchProducts()
              setProductsLoaded(false)
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="w-full max-w-5xl mx-auto mb-6 flex flex-wrap gap-3 justify-center">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border transition-all ${
              selectedCategory === category ? 'bg-red-600 text-white border-red-600' : 'bg-white text-black border-gray-300'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Display Section */}
      {productsLoaded ? (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
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


