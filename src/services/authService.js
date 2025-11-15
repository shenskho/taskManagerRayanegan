import api, { createMockResponse } from './api'
import { getPlaceholderImage } from '../utils/imageUtils'

// Auth Service
class AuthService {
  // Login user
  async login(credentials) {
    try {
      // Mock API فقط در صورت تنظیم صریح
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        console.log('⚠️ Using MOCK API (not calling real API)')
        const mockResponse = {
          user: {
            id: '1',
            name: 'علی احمدی',
            email: credentials.email,
            role: 'admin',
            avatar: getPlaceholderImage(40, 40),
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

      console.log('🔵 Sending login request to real API')
      console.log('🔵 API Base URL:', import.meta.env.VITE_API_BASE_URL || 'https://localhost:7271')
      console.log('🔵 Endpoint:', '/api/Authentication/sign-in')
      console.log('🔵 Full URL:', `${import.meta.env.VITE_API_BASE_URL || 'https://localhost:7271'}/api/Authentication/sign-in`)
      console.log('🔵 Credentials:', { email: credentials.email, password: '***' })
      
      const response = await api.post('/api/Authentication/sign-in', credentials)
      
      console.log('🟢 Login response status:', response.status)
      console.log('🟢 Login response data:', JSON.stringify(response.data, null, 2))
      
      // Handle different response formats
      // API might return data directly or nested in response.data
      const responseData = response.data
      
      // Extract token and user data from response
      // Try multiple possible paths for token
      let token = 
        responseData?.token || 
        responseData?.accessToken || 
        responseData?.jwtToken ||
        responseData?.data?.token ||
        responseData?.data?.accessToken ||
        responseData?.result?.token ||
        responseData?.result?.accessToken ||
        null
      
      // Try multiple possible paths for user data
      let user = 
        responseData?.user ||
        responseData?.data?.user ||
        responseData?.data ||
        responseData?.result?.user ||
        responseData?.result ||
        null
      
      // Extract permissions if available
      let permissions = 
        user?.permissions ||
        responseData?.permissions ||
        responseData?.data?.permissions ||
        responseData?.result?.permissions ||
        []
      
      console.log('🟢 Extracted token:', token ? 'Found' : 'Not found')
      console.log('🟢 Extracted user:', user ? 'Found' : 'Not found')
      
      // If no token found but response is successful, log warning
      if (!token && response.status >= 200 && response.status < 300) {
        console.warn('⚠️ Warning: Successful response but no token found in response structure')
        console.warn('⚠️ Response structure:', Object.keys(responseData))
        
        // Try to extract from any nested structure
        const deepToken = JSON.stringify(responseData).match(/"token"\s*:\s*"([^"]+)"/)?.[1] ||
                          JSON.stringify(responseData).match(/"accessToken"\s*:\s*"([^"]+)"/)?.[1]
        if (deepToken) {
          console.log('🟢 Found token in deep structure:', deepToken.substring(0, 20) + '...')
          token = deepToken
        }
      }
      
      // If token found, store it
      if (token) {
        localStorage.setItem('token', token)
        console.log('✅ Token stored in localStorage')
      } else {
        console.error('❌ No token found in response')
      }
      
      // Build user object with fallbacks
      const finalUser = user || {
        id: responseData?.id || responseData?.userId || 'unknown',
        name: responseData?.name || 
              responseData?.fullName || 
              responseData?.username || 
              credentials.email?.split('@')[0] || 
              'کاربر',
        email: responseData?.email || 
               responseData?.emailAddress || 
               credentials.email,
        role: responseData?.role || 
              responseData?.userRole || 
              'user',
        avatar: responseData?.avatar || 
                responseData?.profilePicture || 
                getPlaceholderImage(40, 40)
      }
      
      // Return in expected format for authSlice
      const result = {
        data: {
          user: finalUser,
          token: token || null,
          refreshToken: responseData?.refreshToken || 
                       responseData?.data?.refreshToken || 
                       null,
          permissions: permissions
        }
      }
      
      console.log('✅ Returning auth data:', { 
        hasUser: !!result.data.user, 
        hasToken: !!result.data.token 
      })
      
      return result
    } catch (error) {
      console.error('❌ Login error:', error)
      console.error('❌ Error response:', error.response?.data)
      console.error('❌ Error status:', error.response?.status)
      
      // Extract error message from API response
      let errorMessage = 'ایمیل یا رمز عبور نادرست است.'
      
      if (error.userMessage) {
        errorMessage = error.userMessage
      } else if (error.response?.data) {
        // Try different error message paths
        errorMessage = 
          error.response.data.message || 
          error.response.data.error?.message ||
          error.response.data.errorMessage ||
          error.response.data.title ||
          error.response.data.error?.title ||
          (Array.isArray(error.response.data.errors) 
            ? error.response.data.errors.join(', ') 
            : null) ||
          error.response.data.error ||
          errorMessage
      } else if (error.request) {
        // No response received
        errorMessage = 'عدم پاسخ از سرور. لطفاً اتصال اینترنت و آدرس API را بررسی کنید.'
        console.error('❌ No response received. Check if API server is running at:', 'https://localhost:7271')
      } else {
        errorMessage = error.message || errorMessage
      }
      
      console.error('❌ Final error message:', errorMessage)
      
      // Create new error with user-friendly message
      const authError = new Error(errorMessage)
      authError.response = error.response
      authError.originalError = error
      throw authError
    }
  }

  // Register new user
  async register(userData) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockResponse = {
          user: {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            role: 'user',
            avatar: getPlaceholderImage(40, 40),
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

  // Logout user (Sign out)
  async logout() {
    try {
      // Mock API فقط در صورت تنظیم صریح
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        console.log('⚠️ Using MOCK API - skipping real API call for logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return { data: { success: true } }
      }

      console.log('🔵 Sending sign-out request to real API')
      console.log('🔵 Endpoint:', '/api/Authentication/sign-out')
      
      try {
        const response = await api.post('/api/Authentication/sign-out')
        console.log('✅ Sign-out successful:', response.status)
        
        // Clear token and user from localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        return response
      } catch (apiError) {
        // حتی اگر API خطا داد، token را پاک کن
        console.warn('⚠️ Sign-out API error, but clearing local data anyway:', apiError.message)
        
        // Clear token and user from localStorage anyway
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        // اگر خطای 401 یا 403 بود، طبیعی است (token قبلاً منقضی شده)
        if (apiError.response?.status === 401 || apiError.response?.status === 403) {
          console.log('ℹ️ Token already invalid/expired, sign-out completed locally')
          return { data: { success: true } }
        }
        
        // برای سایر خطاها، خطا را پرتاب کن (اما token قبلاً پاک شده)
        throw apiError
      }
    } catch (error) {
      // اطمینان حاصل کن که token حتماً پاک شده
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      throw error
    }
  }

  // Get user profile
  async getProfile() {
    try {
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