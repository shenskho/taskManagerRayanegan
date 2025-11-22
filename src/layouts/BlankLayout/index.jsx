import React from 'react'
import { Outlet } from 'react-router-dom'

const BlankLayout = () => (
  <div className="blank-layout d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <Outlet />
  </div>
)

export default BlankLayout
