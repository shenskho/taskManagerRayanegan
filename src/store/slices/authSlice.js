import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/authService'

const storedToken = localStorage.getItem('token')
const storedUserRaw = localStorage.getItem('user')
let storedUser = null

if (storedUserRaw) {
  try {
    storedUser = JSON.parse(storedUserRaw)
  } catch (error) {
    console.error('Failed to parse stored user data:', error)
    localStorage.removeItem('user')
  }
}

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
  user: storedUser,
  isAuthenticated: Boolean(storedToken && storedUser),
  loading: false,
  error: null,
  token: storedToken,
  permissions: Array.isArray(storedUser?.permissions) ? storedUser.permissions : []
}

const persistUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    localStorage.removeItem('user')
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateUserProfile: (state, action) => {
      if (!state.user) return
      state.user = { ...state.user, ...action.payload }
      persistUser(state.user)
    },
    updatePreferences: (state, action) => {
      if (!state.user) return
      const currentPreferences = state.user.preferences || {}
      state.user = {
        ...state.user,
        preferences: { ...currentPreferences, ...action.payload }
      }
      persistUser(state.user)
    },
    clearAuthData: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      state.permissions = []
      persistUser(null)
      localStorage.removeItem('token')
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
        state.permissions = action.payload.permissions || []
        localStorage.setItem('token', action.payload.token)
        persistUser(action.payload.user)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'ورود ناموفق بود.'
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
        state.permissions = action.payload.permissions || []
        localStorage.setItem('token', action.payload.token)
        persistUser(action.payload.user)
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'ثبت‌نام ناموفق بود.'
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.token = null
        state.permissions = []
        localStorage.removeItem('token')
        persistUser(null)
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'خروج از حساب ناموفق بود.'
      })
      // Fetch Profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload
        persistUser(action.payload)
      })
  }
})

export const { clearError, updateUserProfile, updatePreferences, clearAuthData } = authSlice.actions

export default authSlice.reducer
