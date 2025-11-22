import React, { useEffect } from 'react'
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import authRoutes from './auth'
import dashboardRoutes from './dashboard'
import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@pages/NotFound'

const RouterView = () => {
  const routes = useRoutes([...dashboardRoutes, ...authRoutes, { path: '*', element: <BlankLayout><NotFound /></BlankLayout> }])
  const location = useLocation()
  const { locale } = useSelector((state) => state.ui)

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
  }, [locale])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return routes
}

const RoutesIndex = () => (
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <RouterView />
  </BrowserRouter>
)

export default RoutesIndex
