import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  layout: 'vertical',
  locale: localStorage.getItem('locale') || 'fa',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLayout: (state, action) => {
      state.layout = action.payload
    },
    setLocale: (state, action) => {
      state.locale = action.payload
      localStorage.setItem('locale', action.payload)
    },
  },
})

export const { setLayout, setLocale } = uiSlice.actions
export default uiSlice.reducer
