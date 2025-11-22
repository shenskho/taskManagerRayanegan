import { useSelector } from 'react-redux'

export const useAuth = () => {
  const { user, token, isAuthenticated, loading, permissions } = useSelector((state) => state.auth)
  const role = user?.role || 'guest'
  return { user, token, isAuthenticated, loading, permissions, role }
}

export default useAuth
