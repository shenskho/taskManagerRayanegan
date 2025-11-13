import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/authService'

// Async thunks for API calls
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await authService.login(credentials)
  return response.data
})

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await authService.register(userData)
  return response.data
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async () => {
  const response = await authService.getProfile()
  return response.data
})

const initialState = {
  user: {
    id: '1',
    name: 'علی احمدی',
    email: 'ali@example.com',
    role: 'admin',
    avatar: '/api/placeholder/40/40',
    preferences: {
      language: 'fa',
      timezone: 'Asia/Tehran',
      notifications: true
    }
  },
  isAuthenticated: true,
  loading: false,
  error: null,
  token: 'sample-jwt-token-for-demo',
  permissions: [
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
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    updatePreferences: (state, action) => {
      state.user.preferences = { ...state.user.preferences, ...action.payload }
      localStorage.setItem('userPreferences', JSON.stringify(state.user.preferences))
    },
    clearAuthData: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      state.permissions = []
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.permissions = action.payload.permissions
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.permissions = action.payload.permissions
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.token = null
        state.permissions = []
        localStorage.removeItem('token')
      })
      // Fetch Profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload
      })
  }
})

export const { clearError, updateUserProfile, updatePreferences, clearAuthData } = authSlice.actions

export default authSlice.reducer