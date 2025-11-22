import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuth()
  if (isAuthenticated) {
    const redirectPath = role === 'admin' ? '/dashboard' : '/reports'
    return <Navigate to={redirectPath} replace />
  }
  return children
}

export default PublicRoute
