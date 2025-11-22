import React from 'react'
import { Navigate } from 'react-router-dom'
import Home from '@pages/dashboard/Home'
import Reports from '@pages/reports/Reports'
import NotAuthorized from '@pages/NotAuthorized'
import LayoutWrapper from '@layouts/components/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import PrivateRoute from './guards/PrivateRoute'

const dashboardRoutes = [
  {
    path: '/',
    element: <VerticalLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <PrivateRoute meta={{ action: 'read', subject: 'Dashboard' }}>
            <LayoutWrapper meta={{ title: 'Dashboard', action: 'read', subject: 'Dashboard' }}>
              <Home />
            </LayoutWrapper>
          </PrivateRoute>
        ),
        meta: { title: 'Dashboard', layout: 'vertical', action: 'read', subject: 'Dashboard' },
      },
      {
        path: 'reports',
        element: (
          <PrivateRoute meta={{ action: 'read', subject: 'Report' }}>
            <LayoutWrapper meta={{ title: 'Reports', action: 'read', subject: 'Report' }}>
              <Reports />
            </LayoutWrapper>
          </PrivateRoute>
        ),
        meta: { title: 'Reports', layout: 'vertical', action: 'read', subject: 'Report' },
      },
      {
        path: 'not-authorized',
        element: <NotAuthorized />,
        meta: { layout: 'blank', publicRoute: true },
      },
    ],
  },
]

export default dashboardRoutes
