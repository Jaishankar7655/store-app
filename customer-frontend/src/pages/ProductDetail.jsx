import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/axios'
import { formatCurrencySimple } from '../utils/currency'

const ProductDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/products/${id}/`)
      setProduct(response.data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      await api.post('/cart/', {
        product_id: id,
        quantity: quantity,
      })
      setMessage('Product added to cart!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      alert(error.response?.data?.error || 'Error adding to cart')
    }
  }

  const handleAddToWishlist = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      await api.post('/wishlist/', {
        product_id: id,
      })
      setMessage('Product added to wishlist!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      alert(error.response?.data?.error || 'Error adding to wishlist')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-600 text-lg">Product not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {message && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div>
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{product.category_name}</p>
            <p className="text-3xl font-bold text-primary-600 mb-6">{formatCurrencySimple(product.price)}</p>

            {product.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                Stock: <span className={`font-semibold ${product.stock_count < 10 ? 'text-red-600' : 'text-green-600'}`}>
                  {product.stock_count} available
                </span>
              </p>
            </div>

            {product.stock_count > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock_count}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                  >
                    ♥ Wishlist
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">Out of Stock</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

