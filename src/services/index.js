// Services index file
export { default as api } from './api'
export { default as taskService, TaskService } from './taskService'
export { default as projectService, ProjectService } from './projectService'
export { default as authService, AuthService } from './authService'
export { default as notificationService, NotificationService } from './notificationService'

// Export all services as a single object for easy import
export const services = {
  api: require('./api').default,
  taskService: require('./taskService').taskService,
  projectService: require('./projectService').projectService,
  authService: require('./authService').authService,
  notificationService: require('./notificationService').notificationService
}

// API connection examples and documentation
/*

API CONNECTION EXAMPLES AND DOCUMENTATION
=========================================

## نحوه استفاده از سرویس‌ها

### 1. استفاده از TaskService (مدیریت وظایف)
```javascript
import { taskService } from '@/services'

// دریافت لیست وظایف
const fetchTasks = async () => {
  try {
    const response = await taskService.getTasks()
    console.log('وظایف:', response.data)
  } catch (error) {
    console.error('خطا در دریافت وظایف:', error)
  }
}

// ایجاد وظیفه جدید
const createTask = async () => {
  try {
    const taskData = {
      title: 'وظیفه جدید',
      description: 'توضیحات وظیفه',
      status: 'todo',
      priority: 'high',
      assigneeId: '1',
      projectId: '1'
    }
    const response = await taskService.createTask(taskData)
    console.log('وظیفه ایجاد شد:', response.data)
  } catch (error) {
    console.error('خطا در ایجاد وظیفه:', error)
  }
}

// به‌روزرسانی وظیفه
const updateTask = async (taskId) => {
  try {
    const updateData = {
      title: 'عنوان جدید',
      status: 'in-progress'
    }
    const response = await taskService.updateTask(taskId, updateData)
    console.log('وظیفه به‌روزرسانی شد:', response.data)
  } catch (error) {
    console.error('خطا در به‌روزرسانی وظیفه:', error)
  }
}

// جابجایی وظیفه بین ستون‌ها
const moveTask = async (taskId, newStatus) => {
  try {
    const response = await taskService.moveTask(taskId, newStatus)
    console.log('وظیفه جابجا شد:', response.data)
  } catch (error) {
    console.error('خطا در جابجایی وظیفه:', error)
  }
}
```

### 2. استفاده از ProjectService (مدیریت پروژه‌ها)
```javascript
import { projectService } from '@/services'

// دریافت لیست پروژه‌ها
const fetchProjects = async () => {
  try {
    const response = await projectService.getProjects()
    console.log('پروژه‌ها:', response.data)
  } catch (error) {
    console.error('خطا در دریافت پروژه‌ها:', error)
  }
}

// ایجاد پروژه جدید
const createProject = async () => {
  try {
    const projectData = {
      name: 'پروژه جدید',
      description: 'توضیحات پروژه',
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      manager: 'مدیر پروژه',
      priority: 'high'
    }
    const response = await projectService.createProject(projectData)
    console.log('پروژه ایجاد شد:', response.data)
  } catch (error) {
    console.error('خطا در ایجاد پروژه:', error)
  }
}

// افزودن عضو به پروژه
const addMember = async (projectId, memberData) => {
  try {
    const response = await projectService.addProjectMember(projectId, memberData)
    console.log('عضو افزوده شد:', response.data)
  } catch (error) {
    console.error('خطا در افزودن عضو:', error)
  }
}
```

### 3. استفاده از AuthService (احراز هویت)
```javascript
import { authService } from '@/services'

// ورود کاربر
const login = async () => {
  try {
    const credentials = {
      email: 'user@example.com',
      password: 'password123'
    }
    const response = await authService.login(credentials)
    
    // ذخیره توکن در localStorage
    if (response.data?.data?.token) {
      localStorage.setItem('token', response.data.data.token)
    }
    
    console.log('ورود موفق:', response.data)
  } catch (error) {
    console.error('خطا در ورود:', error)
  }
}

// دریافت پروفایل کاربر
const getProfile = async () => {
  try {
    const response = await authService.getProfile()
    console.log('پروفایل کاربر:', response.data)
  } catch (error) {
    console.error('خطا در دریافت پروفایل:', error)
  }
}

// خروج کاربر
const logout = async () => {
  try {
    await authService.logout()
    // پاک کردن توکن از localStorage
    localStorage.removeItem('token')
    // هدایت به صفحه ورود
    window.location.href = '/login'
  } catch (error) {
    console.error('خطا در خروج:', error)
  }
}
```

### 4. استفاده از NotificationService (مدیریت اعلانات)
```javascript
import { notificationService } from '@/services'

// دریافت اعلانات
const fetchNotifications = async () => {
  try {
    const response = await notificationService.getNotifications()
    console.log('اعلانات:', response.data)
  } catch (error) {
    console.error('خطا در دریافت اعلانات:', error)
  }
}

// علامت‌گذاری اعلان به عنوان خوانده‌شده
const markAsRead = async (notificationId) => {
  try {
    const response = await notificationService.markAsRead(notificationId)
    console.log('اعلان علامت‌گذاری شد:', response.data)
  } catch (error) {
    console.error('خطا در علامت‌گذاری اعلان:', error)
  }
}
```

## نحوه استفاده از API Mock

برای استفاده از داده‌های تست، فایل `.env` را ایجاد کرده و متغیر زیر را اضافه کنید:

```
VITE_USE_MOCK_API=true
```

## نکات مهم

1. **مدیریت خطاها**: تمام سرویس‌ها خطاها را به بالا منتقل می‌کنند تا در کامپوننت‌ها مدیریت شوند
2. **توکن احراز هویت**: به‌طور خودکار به درخواست‌ها اضافه می‌شود
3. **زبان فارسی**: تمام پیام‌ها و داده‌های نمونه به زبان فارسی هستند
4. **ساختار یکسان**: تمام سرویس‌ها از ساختار یکسان برای پاسخ استفاده می‌کنند

## مثال کامل استفاده در کامپوننت React

```javascript
import React, { useEffect, useState } from 'react'
import { taskService } from '@/services'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await taskService.getTasks()
      setTasks(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>در حال بارگذاری...</div>
  if (error) return <div>خطا: {error}</div>

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <span>وضعیت: {task.status}</span>
        </div>
      ))}
    </div>
  )
}

export default TaskList
```

*/