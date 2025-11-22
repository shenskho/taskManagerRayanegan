import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import authReducer from './slices/authSlice'
import reportReducer from './slices/reportSlice'
import uiReducer from './slices/uiSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  reports: reportReducer,
  ui: uiReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
})

export const persistor = persistStore(store)
export default store
