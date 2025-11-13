import axios from 'axios'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
const API_TIMEOUT = 10000 // 10 seconds

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log request for debugging
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response for debugging
    console.log(`API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('API Response Error:', error)
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('token')
      window.location.href = '/login'
    } else if (error.response?.status === 403) {
      // Forbidden - show error message
      console.error('Access forbidden')
    } else if (error.response?.status === 404) {
      // Not found
      console.error('Resource not found')
    } else if (error.response?.status >= 500) {
      // Server error
      console.error('Server error occurred')
    }
    
    return Promise.reject(error)
  }
)

export default api

// API Response Types
export class ApiResponse {
  constructor(success, data, message, errors = null) {
    this.success = success
    this.data = data
    this.message = message
    this.errors = errors
    this.timestamp = new Date().toISOString()
  }
}

export class ApiError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errors = errors
  }
}

// Helper functions
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response
    throw new ApiError(
      data?.message || 'An error occurred',
      status,
      data?.errors || null
    )
  } else if (error.request) {
    // Request made but no response received
    throw new ApiError('No response from server', 0)
  } else {
    // Something else happened
    throw new ApiError(error.message || 'An unexpected error occurred', 0)
  }
}

export const createMockResponse = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: new ApiResponse(true, data, 'Operation successful'),
        status: 200,
        statusText: 'OK'
      })
    }, delay)
  })
}