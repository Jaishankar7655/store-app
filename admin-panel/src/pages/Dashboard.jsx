import { useEffect, useState } from 'react'
import api from '../utils/axios'
import { Link } from 'react-router-dom'
import { formatCurrencySimple } from '../utils/currency'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [usersRes, productsRes, ordersRes, salesRes] = await Promise.all([
        api.get('/auth/users/'),
        api.get('/products/products/'),
        api.get('/orders/orders/'),
        api.get('/orders/sales-report/'),
      ])

      const orders = ordersRes.data.results || ordersRes.data
      const sales = salesRes.data.summary || {}

      setStats({
        totalUsers: usersRes.data.results?.length || usersRes.data.length || 0,
        totalProducts: productsRes.data.results?.length || productsRes.data.length || 0,
        totalOrders: orders.results?.length || orders.length || 0,
        totalRevenue: sales.total_revenue || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'bg-blue-500',
      link: '/users',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: '📦',
      color: 'bg-green-500',
      link: '/products',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: '🛒',
      color: 'bg-purple-500',
      link: '/orders',
    },
    {
      title: 'Total Revenue',
      value: formatCurrencySimple(stats.totalRevenue),
      icon: '💰',
      color: 'bg-yellow-500',
      link: '/sales-report',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-poppins">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/products"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="font-medium text-gray-700">Add Product</div>
          </Link>
          <Link
            to="/categories"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">🏷️</div>
            <div className="font-medium text-gray-700">Manage Categories</div>
          </Link>
          <Link
            to="/promo-codes"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">🎫</div>
            <div className="font-medium text-gray-700">Create Promo Code</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

