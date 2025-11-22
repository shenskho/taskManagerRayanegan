import { apiClient } from './http/instances'
import urls from './http/urls'

const parseAuthPayload = (data, credentials = {}) => {
  const token =
    data?.token || data?.accessToken || data?.jwtToken || data?.data?.token || data?.data?.accessToken
  const user =
    data?.user ||
    data?.data?.user ||
    data?.data ||
    data?.result?.user ||
    data?.result || {
      id: data?.id || 'unknown',
      name: data?.name || data?.fullName || credentials.email?.split('@')[0] || 'کاربر',
      email: data?.email || credentials.email,
      role: data?.role || 'user',
    }
  const permissions = user?.permissions || data?.permissions || []

  return {
    user,
    token: token || null,
    refreshToken: data?.refreshToken || data?.data?.refreshToken || null,
    permissions,
  }
}

export const authService = {
  async login(credentials) {
    const response = await apiClient.post(urls.auth.login, credentials)
    const payload = parseAuthPayload(response.data, credentials)
    if (payload.token) {
      localStorage.setItem('token', payload.token)
    }
    if (payload.user) {
      localStorage.setItem('user', JSON.stringify(payload.user))
    }
    return { data: payload }
  },

  async register(userData) {
    const response = await apiClient.post(urls.auth.register, userData)
    const payload = parseAuthPayload(response.data, userData)
    if (payload.token) {
      localStorage.setItem('token', payload.token)
    }
    if (payload.user) {
      localStorage.setItem('user', JSON.stringify(payload.user))
    }
    return { data: payload }
  },

  async logout() {
    await apiClient.post(urls.auth.logout)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  async getProfile() {
    const response = await apiClient.get(urls.auth.profile)
    return { data: response.data }
  },
}

export default authService
