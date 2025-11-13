import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: true,
  theme: 'light',
  loading: false,
  notifications: [
    {
      id: '1',
      title: 'وظیفه جدید اختصاص داده شد',
      message: 'وظیفه "بررسی کدها" به شما اختصاص داده شد',
      type: 'info',
      read: false,
      createdAt: '2024-11-05T10:30:00Z'
    },
    {
      id: '2',
      title: 'ددلاین نزدیک است',
      message: 'ددلاین وظیفه "طراحی رابط کاربری" فردا است',
      type: 'warning',
      read: false,
      createdAt: '2024-11-05T09:00:00Z'
    },
    {
      id: '3',
      title: 'پروژه تکمیل شد',
      message: 'پروژه "بهینه‌سازی دیتابیس" با موفقیت تکمیل شد',
      type: 'success',
      read: true,
      createdAt: '2024-11-04T16:00:00Z'
    }
  ],
  modal: {
    isOpen: false,
    type: null,
    data: null
  },
  filters: {
    status: 'all',
    priority: 'all',
    assignee: 'all',
    project: 'all'
  },
  searchQuery: ''
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        read: false
      })
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true
      })
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    clearAllNotifications: (state) => {
      state.notifications = []
    },
    openModal: (state, action) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null
      }
    },
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        type: null,
        data: null
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    clearSearch: (state) => {
      state.searchQuery = ''
    }
  }
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setLoading,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearAllNotifications,
  openModal,
  closeModal,
  setFilters,
  clearFilters,
  setSearchQuery,
  clearSearch
} = uiSlice.actions

export default uiSlice.reducer