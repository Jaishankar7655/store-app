import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/axios'
import { formatCurrency, formatCurrencySimple } from '../utils/currency'

const Checkout = () => {
  const [cart, setCart] = useState(null)
  const [promoCodes, setPromoCodes] = useState([])
  const [selectedPromo, setSelectedPromo] = useState(null)
  const [promoCode, setPromoCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [formData, setFormData] = useState({
    shipping_address: '',
    notes: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
    fetchPromoCodes()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart/')
      setCart(response.data)
      if (!response.data.items || response.data.items.length === 0) {
        navigate('/cart')
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
      navigate('/cart')
    } finally {
      setLoading(false)
    }
  }

  const fetchPromoCodes = async () => {
    try {
      const response = await api.get('/products/promo-codes/')
      setPromoCodes(response.data.results || response.data || [])
    } catch (error) {
      console.error('Error fetching promo codes:', error)
    }
  }

  const handleApplyPromoCode = async () => {
    try {
      const response = await api.post('/products/promo-codes/apply/', {
        code: promoCode,
      })
      if (response.data.valid) {
        setSelectedPromo(response.data.promo_code)
        alert('Promo code applied successfully!')
      } else {
        alert('Invalid or expired promo code')
      }
    } catch (error) {
      alert('Error applying promo code')
    }
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    setProcessing(true)

    try {
      const orderData = {
        shipping_address: formData.shipping_address,
        notes: formData.notes,
      }
      if (selectedPromo) {
        orderData.promo_code = selectedPromo.id
      }

      const response = await api.post('/orders/checkout/', orderData)
      navigate('/orders')
    } catch (error) {
      alert(error.response?.data?.error || 'Error processing order')
      setProcessing(false)
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
    return null
  }

  const discount = selectedPromo
    ? selectedPromo.discount_percentage > 0
      ? (cart.total_price * selectedPromo.discount_percentage) / 100
      : selectedPromo.discount_amount
    : 0

  const total = cart.total_price - discount

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 font-poppins">Checkout</h1>

      <form onSubmit={handleCheckout}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
              <textarea
                value={formData.shipping_address}
                onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Enter your shipping address"
              />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Promo Code</h2>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyPromoCode}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {selectedPromo && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    Promo code {selectedPromo.code} applied!
                    {selectedPromo.discount_percentage > 0
                      ? ` ${selectedPromo.discount_percentage}% off`
                      : ` ₹${selectedPromo.discount_amount} off`}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Notes</h2>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Any special instructions..."
              />
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium">{formatCurrencySimple(item.subtotal)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrencySimple(cart.total_price)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={processing}
                className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout

