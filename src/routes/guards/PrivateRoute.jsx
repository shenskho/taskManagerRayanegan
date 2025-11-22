import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div className="text-center p-5">در حال بارگذاری...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace state={{ from: location }} />
  }

  return children || <Outlet />
}

export default PrivateRoute
