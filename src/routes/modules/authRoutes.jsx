import React from 'react'
import Signup from '@/pages/signup-login/signup'
import Register from '@/pages/signup-login/register'

const authRoutes = [
  {
    path: '/signup',
    element: <Signup />,
    meta: { layout: 'blank', public: true, title: 'ورود' },
  },
  {
    path: '/register',
    element: <Register />,
    meta: { layout: 'blank', public: true, title: 'ثبت نام' },
  },
]

export default authRoutes
