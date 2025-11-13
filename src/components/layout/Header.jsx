import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '@/store/slices/uiSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { notifications } = useSelector(state => state.ui)
  
  const unreadNotifications = notifications.filter(n => !n.isRead).length

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="btn btn-link sidebar-toggle"
          onClick={() => dispatch(toggleSidebar())}
        >
          <i className="fas fa-bars"></i>
        </button>
        
        <div className="search-container">
          <input 
            type="text" 
            className="form-control search-input"
            placeholder="جستجو..."
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>

      <div className="header-right">
        <div className="notification-dropdown">
          <button className="btn btn-link notification-btn">
            <i className="fas fa-bell"></i>
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span>
            )}
          </button>
        </div>

        <div className="user-dropdown">
          <button className="btn btn-link user-btn">
            <img 
              src={user?.avatar || '/api/placeholder/32/32'} 
              alt={user?.name}
              className="user-avatar"
            />
            <span className="user-name">{user?.name || 'کاربر'}</span>
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header