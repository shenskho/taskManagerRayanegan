import React from 'react'
import Login from '@pages/auth/Login'
import BlankLayout from '@layouts/BlankLayout'
import PublicRoute from './guards/PublicRoute'

const authRoutes = [
  {
    element: <BlankLayout />,
    children: [
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
        meta: {
          layout: 'blank',
          publicRoute: true,
          title: 'Login',
        },
      },
    ],
  },
]

export default authRoutes
