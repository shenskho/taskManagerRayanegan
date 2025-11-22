import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = ({ children }) => {
  const { sidebarCollapsed } = useSelector(state => state.ui)

  return (
    <div className="layout-container">
      <Sidebar />
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header />
        <div className="content-wrapper">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  )
}

export default Layout