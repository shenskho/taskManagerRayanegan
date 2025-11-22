import React from 'react'
import { Outlet } from 'react-router-dom'

const BlankLayout = ({ children }) => {
  return <>{children || <Outlet />}</>
}

export default BlankLayout
