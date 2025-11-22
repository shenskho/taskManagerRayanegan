import { useSelector } from 'react-redux'

const useAuth = () => {
  const { token, role, user } = useSelector((state) => state.auth)
  return {
    token,
    role,
    user,
    isAuthenticated: Boolean(token),
  }
}

export default useAuth
