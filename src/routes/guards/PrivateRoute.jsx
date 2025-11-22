import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import useAbility from '@hooks/useAbility'

const PrivateRoute = ({ children, meta }) => {
  const { isAuthenticated } = useAuth()
  const ability = useAbility()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (meta?.action && meta?.subject && !ability.can(meta.action, meta.subject)) {
    return <Navigate to="/not-authorized" replace />
  }

  return children
}

export default PrivateRoute
