import React from 'react'
import { Outlet } from 'react-router-dom'

const HorizontalLayout = ({ children }) => {
  return (
    <div className="horizontal-layout">
      <header className="p-3 shadow-sm bg-white">ناوبری افقی</header>
      <main className="p-3">
        {children || <Outlet />}
      </main>
    </div>
  )
}

export default HorizontalLayout
