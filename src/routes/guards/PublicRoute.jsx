import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { getRoleHomePath } from '@/routes/utils'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={getRoleHomePath(role)} replace />
  }

  return children || <Outlet />
}

export default PublicRoute
