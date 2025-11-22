import React from 'react'
import Dashboard from '@/pages/dashboard/Dashboard'
import KanbanBoard from '@/pages/kanban/KanbanBoard'
import Tasks from '@/pages/tasks/Tasks'
import Projects from '@/pages/projects/Projects'
import Calendar from '@/pages/Calendar'
import Team from '@/pages/Team'
import Reports from '@/pages/Reports'
import Settings from '@/pages/Settings'

const appRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    meta: { layout: 'vertical', title: 'داشبورد', requiresAuth: true },
  },
  {
    path: '/kanban',
    element: <KanbanBoard />,
    meta: { layout: 'vertical', title: 'کانبان', requiresAuth: true },
  },
  {
    path: '/tasks',
    element: <Tasks />,
    meta: { layout: 'vertical', title: 'وظایف', requiresAuth: true },
  },
  {
    path: '/projects',
    element: <Projects />,
    meta: { layout: 'vertical', title: 'پروژه‌ها', requiresAuth: true },
  },
  {
    path: '/calendar',
    element: <Calendar />,
    meta: { layout: 'vertical', title: 'تقویم', requiresAuth: true },
  },
  {
    path: '/team',
    element: <Team />,
    meta: { layout: 'vertical', title: 'تیم', requiresAuth: true },
  },
  {
    path: '/reports',
    element: <Reports />,
    meta: { layout: 'horizontal', title: 'گزارش‌ها', requiresAuth: true },
  },
  {
    path: '/settings',
    element: <Settings />,
    meta: { layout: 'vertical', title: 'تنظیمات', requiresAuth: true },
  },
]

export default appRoutes
