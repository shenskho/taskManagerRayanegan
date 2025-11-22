import React, { useEffect } from 'react'
import { Navigate, useLocation, useRoutes } from 'react-router-dom'
import appRoutes from './modules/appRoutes'
import authRoutes from './modules/authRoutes'
import VerticalLayout from '@/layouts/VerticalLayout'
import HorizontalLayout from '@/layouts/HorizontalLayout'
import BlankLayout from '@/layouts/BlankLayout'
import PrivateRoute from './guards/PrivateRoute'
import PublicRoute from './guards/PublicRoute'
import useAuth from '@/hooks/useAuth'
import { getRoleHomePath, withMetaTitle } from './utils'

const layoutMap = {
  vertical: VerticalLayout,
  horizontal: HorizontalLayout,
  blank: BlankLayout,
}

const RouteWrapper = ({ route }) => {
  const Layout = layoutMap[route.meta?.layout] || VerticalLayout
  const Guard = route.meta?.public ? PublicRoute : PrivateRoute

  useEffect(() => {
    if (route.meta?.title) {
      withMetaTitle(route.meta.title)
    }
  }, [route.meta])

  return (
    <Guard>
      <Layout>{route.element}</Layout>
    </Guard>
  )
}

const mapRoutes = (routes) =>
  routes.map((route) => {
    const wrapped = { ...route }
    wrapped.element = <RouteWrapper route={route} />
    if (route.children) {
      wrapped.children = mapRoutes(route.children)
    }
    return wrapped
  })

const RootRedirect = () => {
  const { role } = useAuth()
  return <Navigate to={getRoleHomePath(role)} replace />
}

const RoutesIndex = () => {
  const location = useLocation()
  const routeConfig = [
    ...mapRoutes(appRoutes),
    ...mapRoutes(authRoutes),
    { path: '/', element: <RouteWrapper route={{ element: <RootRedirect />, meta: { layout: 'blank' } }} /> },
    { path: '*', element: <Navigate to="/dashboard" replace state={{ from: location }} /> },
  ]

  return useRoutes(routeConfig)
}

export default RoutesIndex
