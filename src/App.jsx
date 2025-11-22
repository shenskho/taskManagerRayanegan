import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RoutesIndex from './routes'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <RoutesIndex />
      <Toaster />
    </BrowserRouter>
  )
}

export default App
