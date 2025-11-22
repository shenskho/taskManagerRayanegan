import React from 'react'
import { Outlet } from 'react-router-dom'
import LayoutWrapper from '../components/LayoutWrapper'

const HorizontalLayout = () => (
  <div className="horizontal-layout d-flex flex-column">
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  </div>
)

export default HorizontalLayout
