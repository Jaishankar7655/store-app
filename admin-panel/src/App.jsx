import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import SalesReport from './pages/SalesReport'
import PromoCodes from './pages/PromoCodes'
import Layout from './components/Layout'
import LowStockAlerts from './pages/LowStockAlerts'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (user.role !== 'store_manager') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600">You need to be a store manager to access this panel.</p>
        </div>
      </div>
    )
  }
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <Router basename="/admin">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="sales-report" element={<SalesReport />} />
            <Route path="promo-codes" element={<PromoCodes />} />
            <Route path="low-stock" element={<LowStockAlerts />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

