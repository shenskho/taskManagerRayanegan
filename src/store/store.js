import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice.js'
import projectsReducer from './slices/projectsSlice.js'
import uiReducer from './slices/uiSlice.js'
import authReducer from './slices/authSlice.js'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
    ui: uiReducer,
    auth: authReducer,
  },
})