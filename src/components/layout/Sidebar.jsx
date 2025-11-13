import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { toggleSidebar } from '@/store/slices/uiSlice'
import { logout } from '@/store/slices/authSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { sidebarCollapsed } = useSelector(state => state.ui)
  const { user } = useSelector(state => state.auth)

  const menuItems = [
    {
      id: 'dashboard',
      title: 'داشبورد',
      icon: 'fas fa-tachometer-alt',
      path: '/',
      exact: true
    },
    {
      id: 'kanban',
      title: 'میزکار رایانگان',
      icon: 'fas fa-columns',
      path: '/kanban'
    },
    {
      id: 'tasks',
      title: 'وظایف',
      icon: 'fas fa-tasks',
      path: '/tasks'
    },
    {
      id: 'projects',
      title: 'پروژه‌ها',
      icon: 'fas fa-project-diagram',
      path: '/projects'
    },
    {
      id: 'calendar',
      title: 'تقویم',
      icon: 'fas fa-calendar-alt',
      path: '/calendar'
    },
    {
      id: 'team',
      title: 'تیم',
      icon: 'fas fa-users',
      path: '/team'
    },
    {
      id: 'reports',
      title: 'گزارش‌ها',
      icon: 'fas fa-chart-bar',
      path: '/reports'
    },
    {
      id: 'settings',
      title: 'تنظیمات',
      icon: 'fas fa-cog',
      path: '/settings'
    }
  ]

  return (
    <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-th-large"></i>
          {!sidebarCollapsed && <span>میزکار رایانگان</span>}
        </div>
        <button 
          className="btn btn-link sidebar-toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="sidebar-user">
        <img 
          src={user?.avatar || '/api/placeholder/48/48'} 
          alt={user?.name}
          className="user-avatar"
        />
        {!sidebarCollapsed && (
          <div className="user-info">
            <div className="user-name">{user?.name || 'کاربر'}</div>
            <div className="user-role">{user?.role || 'کاربر عادی'}</div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map(item => (
            <li key={item.id} className="nav-item">
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                end={item.exact}
              >
                <i className={item.icon}></i>
                {!sidebarCollapsed && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button
          className="btn btn-link logout-btn"
          onClick={async () => {
            await dispatch(logout())
            navigate('/signup', { replace: true })
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          {!sidebarCollapsed && <span>خروج</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar