import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/axios'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const response = await api.get('/wishlist/')
      setWishlist(response.data)
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`/wishlist/items/${itemId}/`)
      fetchWishlist()
    } catch (error) {
      alert(error.response?.data?.error || 'Error removing item')
    }
  }

  const handleAddToCart = async (productId) => {
    try {
      await api.post('/cart/', {
        product_id: productId,
        quantity: 1,
      })
      alert('Product added to cart!')
    } catch (error) {
      alert(error.response?.data?.error || 'Error adding to cart')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!wishlist || !wishlist.items || wishlist.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12">
          <p className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</p>
          <p className="text-gray-600 mb-8">Start adding items to your wishlist</p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 font-poppins">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {item.product.image_url && (
              <Link to={`/products/${item.product.id}`}>
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
            )}
            <div className="p-4">
              <Link
                to={`/products/${item.product.id}`}
                className="font-semibold text-gray-900 hover:text-primary-600 block mb-2"
              >
                {item.product.name}
              </Link>
              <p className="text-sm text-gray-600 mb-2">{item.product.category_name}</p>
              <p className="text-lg font-bold text-primary-600 mb-4">${item.product.price}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAddToCart(item.product.id)}
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="px-3 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist

