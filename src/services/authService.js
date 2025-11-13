import api, { createMockResponse } from './api'

const STATIC_AUTH_ENABLED = import.meta.env.VITE_USE_STATIC_AUTH !== 'false'
const STATIC_EMAIL = (import.meta.env.VITE_STATIC_AUTH_EMAIL || 'admin@rayanegan.com').toLowerCase()
const STATIC_PASSWORD = import.meta.env.VITE_STATIC_AUTH_PASSWORD || '123456'
const STATIC_PERMISSIONS = [
  'view_projects',
  'create_projects',
  'edit_projects',
  'delete_projects',
  'view_tasks',
  'create_tasks',
  'edit_tasks',
  'delete_tasks',
  'manage_users'
]

const buildStaticUser = () => ({
  id: 'static-user-1',
  name: 'رایانگان',
  email: STATIC_EMAIL,
  role: 'admin',
  avatar: '/api/placeholder/40/40',
  preferences: {
    language: 'fa',
    timezone: 'Asia/Tehran',
    notifications: true
  },
  permissions: STATIC_PERMISSIONS,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: new Date().toISOString()
})

// Auth Service
class AuthService {
  // Login user
  async login(credentials) {
    try {
      if (STATIC_AUTH_ENABLED) {
        const email = credentials.email?.trim().toLowerCase()
        const password = credentials.password

        if (email !== STATIC_EMAIL || password !== STATIC_PASSWORD) {
          throw new Error('ایمیل یا رمز عبور نادرست است.')
        }

        const staticUser = buildStaticUser()
        const mockResponse = {
          user: staticUser,
          token: `static-token-${Date.now()}`,
          refreshToken: `static-refresh-${Date.now()}`,
          permissions: STATIC_PERMISSIONS
        }

        localStorage.setItem('token', mockResponse.token)
        return { data: mockResponse }
      }

      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockResponse = {
          user: {
            id: '1',
            name: 'علی احمدی',
            email: credentials.email,
            role: 'admin',
            avatar: '/api/placeholder/40/40',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-11-05T10:00:00Z'
          },
          token: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now()
        }
        // Store token in localStorage for mock mode
        localStorage.setItem('token', mockResponse.token)
        await createMockResponse(mockResponse)
        return { data: mockResponse } // Return just the data, not the full response object
      }

      const response = await api.post('/auth/login', credentials)
      return response
    } catch (error) {
      throw error
    }
  }

  // Register new user
  async register(userData) {
    try {
      if (STATIC_AUTH_ENABLED) {
        throw new Error('ثبت‌نام در حال حاضر فعال نیست. لطفاً با مدیر سیستم تماس بگیرید.')
      }

      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockResponse = {
          user: {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            role: 'user',
            avatar: '/api/placeholder/40/40',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          token: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now()
        }
        // Store token in localStorage for mock mode
        localStorage.setItem('token', mockResponse.token)
        await createMockResponse(mockResponse)
        return { data: mockResponse } // Return just the data, not the full response object
      }

      const response = await api.post('/auth/register', userData)
      return response
    } catch (error) {
      throw error
    }
  }

  // Logout user
  async logout() {
    try {
      if (STATIC_AUTH_ENABLED) {
        localStorage.removeItem('token')
        return { data: { success: true } }
      }

      const response = await api.post('/auth/logout')
      // Clear token from localStorage
      localStorage.removeItem('token')
      return response
    } catch (error) {
      // Even if logout fails, clear local token
      localStorage.removeItem('token')
      throw error
    }
  }

  // Get user profile
  async getProfile() {
    try {
      if (STATIC_AUTH_ENABLED) {
        const staticUser = buildStaticUser()
        return { data: staticUser }
      }

      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockProfile = {
          id: '1',
          name: 'علی احمدی',
          email: 'ali@example.com',
          role: 'admin',
          avatar: '/api/placeholder/40/40',
          bio: 'مدیر پروژه و توسعه‌دهنده نرم‌افزار',
          phone: '+98 912 345 6789',
          location: 'تهران، ایران',
          website: 'https://ali-ahmadi.com',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-11-05T10:00:00Z'
        }
        await createMockResponse(mockProfile)
        return { data: mockProfile } // Return just the data, not the full response object
      }

      const response = await api.get('/auth/profile')
      return response
    } catch (error) {
      throw error
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await api.put('/auth/profile', userData)
      return response
    } catch (error) {
      throw error
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.post('/auth/change-password', passwordData)
      return response
    } catch (error) {
      throw error
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email })
      return response
    } catch (error) {
      throw error
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await api.post('/auth/reset-password', resetData)
      return response
    } catch (error) {
      throw error
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh-token')
      if (response.data?.data?.token) {
        localStorage.setItem('token', response.data.data.token)
      }
      return response
    } catch (error) {
      // If refresh fails, redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login'
      throw error
    }
  }

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await api.get(`/auth/verify-email/${token}`)
      return response
    } catch (error) {
      throw error
    }
  }

  // Resend verification email
  async resendVerificationEmail(email) {
    try {
      const response = await api.post('/auth/resend-verification', { email })
      return response
    } catch (error) {
      throw error
    }
  }
}

export const authService = new AuthService()
export default AuthService