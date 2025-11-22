import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { reportApi } from '@api'

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

export const loadReportsThunk = createAsyncThunk('reports/load', async (_, { rejectWithValue }) => {
  try {
    const data = await reportApi.fetchReports()
    return data
  } catch (error) {
    return rejectWithValue(error?.response?.data || error.message)
  }
})

export const uploadReportThunk = createAsyncThunk('reports/upload', async (formData, { rejectWithValue }) => {
  try {
    const data = await reportApi.uploadReport(formData)
    return data
  } catch (error) {
    return rejectWithValue(error?.response?.data || error.message)
  }
})

export const downloadReportThunk = createAsyncThunk('reports/download', async (params, { rejectWithValue }) => {
  try {
    const blob = await reportApi.downloadReport(params)
    return blob
  } catch (error) {
    return rejectWithValue(error?.response?.data || error.message)
  }
})

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadReportsThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadReportsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload?.items || []
      })
      .addCase(loadReportsThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(uploadReportThunk.fulfilled, (state, action) => {
        if (action.payload?.item) {
          state.items = [action.payload.item, ...state.items]
        }
      })
  },
})

export default reportSlice.reducer
