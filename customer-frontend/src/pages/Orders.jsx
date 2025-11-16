import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/axios'
import { formatCurrencySimple, formatCurrency } from '../utils/currency'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/orders/')
      setOrders(response.data.results || response.data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-12">
          <p className="text-2xl font-bold text-gray-900 mb-4">No orders yet</p>
          <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6 font-poppins">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold text-gray-900">Order #{order.order_number}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.purchase_date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Items:</p>
              <div className="space-y-1">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product_name} x{item.quantity}
                    </span>
                    <span className="font-medium">${item.subtotal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <div>
                {order.discount > 0 && (
                  <p className="text-sm text-gray-600">
                    Discount: <span className="text-green-600">-{formatCurrencySimple(order.discount)}</span>
                  </p>
                )}
                <p className="text-lg font-bold text-gray-900">Total: {formatCurrencySimple(order.total)}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(order)}
                className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-medium">{selectedOrder.order_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium">
                  {new Date(selectedOrder.purchase_date).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatCurrencySimple(item.subtotal)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">{formatCurrencySimple(selectedOrder.subtotal)}</p>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between">
                    <p className="text-gray-600">Discount</p>
                    <p className="font-medium text-green-600">-{formatCurrencySimple(selectedOrder.discount)}</p>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <p>Total</p>
                  <p>{formatCurrencySimple(selectedOrder.total)}</p>
                </div>
              </div>
              {selectedOrder.shipping_address && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Shipping Address</p>
                  <p className="font-medium">{selectedOrder.shipping_address}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders

