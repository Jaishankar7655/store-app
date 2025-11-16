import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import api from '../utils/axios'

const Layout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    if (user) {
      fetchCartCount()
    }
  }, [user])

  const fetchCartCount = async () => {
    try {
      const response = await api.get('/cart/')
      setCartCount(response.data.total_items || 0)
    } catch (error) {
      console.error('Error fetching cart count:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600 font-poppins">
                🛒 Grocery Store
              </span>
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/products') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Products
              </Link>
              {user && (
                <>
                  <Link
                    to="/cart"
                    className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Cart
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/wishlist"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/wishlist') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/orders"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/orders') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    Orders
                  </Link>
                </>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-700 hidden md:block">
                    Hi, {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">&copy; 2024 Grocery Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout

