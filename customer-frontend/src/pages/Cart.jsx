import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/axios'
import { formatCurrencySimple } from '../utils/currency'

const Cart = () => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart/')
      setCart(response.data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return

    try {
      await api.put(`/cart/items/${itemId}/`, {
        quantity: newQuantity,
      })
      fetchCart()
    } catch (error) {
      alert(error.response?.data?.error || 'Error updating cart')
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`/cart/items/${itemId}/`)
      fetchCart()
    } catch (error) {
      alert(error.response?.data?.error || 'Error removing item')
    }
  }

  const handleClearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) return

    try {
      await api.delete('/cart/clear/')
      fetchCart()
    } catch (error) {
      alert(error.response?.data?.error || 'Error clearing cart')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12">
          <p className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</p>
          <p className="text-gray-600 mb-8">Start adding items to your cart</p>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 font-poppins">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4"
            >
              {item.product.image_url && (
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <Link
                  to={`/products/${item.product.id}`}
                  className="font-semibold text-gray-900 hover:text-primary-600"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-600">{item.product.category_name}</p>
                <p className="text-lg font-bold text-primary-600 mt-2">
                  {formatCurrencySimple(item.product.price)}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold text-gray-900 w-20 text-right">
                  {formatCurrencySimple(item.subtotal)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Items ({cart.total_items})</span>
                <span>{formatCurrencySimple(cart.total_price)}</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>{formatCurrencySimple(cart.total_price)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="block mt-4 text-center text-primary-600 hover:text-primary-700 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

