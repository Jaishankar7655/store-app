import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/axios'
import { formatCurrencySimple } from '../utils/currency'

const Home = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
    fetchCategories()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products/products/?sort_by=popular')
      const data = response.data.results || response.data || []
      setProducts(data.slice(0, 8))
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await api.get('/products/categories/')
      setCategories(response.data.results || response.data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 font-poppins">
              Fresh Groceries, Delivered to Your Door
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Shop for fresh produce, pantry essentials, and more with ease
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-poppins">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name}`}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-2">🏷️</div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-poppins">
            Popular Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.category_name}</p>
                  <p className="text-lg font-bold text-primary-600">{formatCurrencySimple(product.price)}</p>
                  {product.stock_count < 10 && (
                    <p className="text-xs text-red-600 mt-2">Limited Stock</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

