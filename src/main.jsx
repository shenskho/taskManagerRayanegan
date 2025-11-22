// Suppress console warnings - MUST be first import
import './utils/suppressWarnings'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { store, persistor } from '@store'
import '@styles/index.scss'
import './configs/i18n'
// Initialize DevExtreme theme
import 'devextreme/dist/css/dx.light.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
