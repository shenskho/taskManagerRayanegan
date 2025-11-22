import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '@api'
import { defineAbilityFor } from '@configs/ability'

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || 'guest',
  status: 'idle',
  error: null,
}

export const loginThunk = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const data = await authApi.loginRequest(payload)
    return data
  } catch (error) {
    return rejectWithValue(error?.response?.data || error.message)
  }
})

export const fetchProfileThunk = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const data = await authApi.fetchProfile()
    return data
  } catch (error) {
    return rejectWithValue(error?.response?.data || error.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    forceLogout: (state) => {
      state.token = null
      state.user = null
      state.role = 'guest'
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload?.token
        state.user = action.payload?.user
        state.role = action.payload?.user?.role || 'user'
        if (state.token) {
          localStorage.setItem('token', state.token)
        }
        if (state.role) {
          localStorage.setItem('role', state.role)
        }
        defineAbilityFor(state.role)
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.role = action.payload?.role || state.role
      })
  },
})

export const { forceLogout } = authSlice.actions
export default authSlice.reducer
