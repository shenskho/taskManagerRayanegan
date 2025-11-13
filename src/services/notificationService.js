import api, { createMockResponse } from './api'

// Notification Service
class NotificationService {
  // Get all notifications
  async getNotifications() {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockNotifications = [
          {
            id: '1',
            title: 'وظیفه جدید اختصاص داده شد',
            message: 'وظیفه "بررسی کد" به شما اختصاص داده شد',
            type: 'task_assigned',
            isRead: false,
            createdAt: '2024-11-05T10:30:00Z',
            userId: '1',
            taskId: '1',
            projectId: '1'
          },
          {
            id: '2',
            title: 'ضرب‌العجل نزدیک است',
            message: 'وظیفه "تست واحد" فردا به پایان می‌رسد',
            type: 'deadline_reminder',
            isRead: true,
            createdAt: '2024-11-04T15:45:00Z',
            userId: '1',
            taskId: '2',
            projectId: '1'
          },
          {
            id: '3',
            title: 'پروژه جدید ایجاد شد',
            message: 'پروژه "مدیریت وظایف" با موفقیت ایجاد شد',
            type: 'project_created',
            isRead: true,
            createdAt: '2024-11-03T09:15:00Z',
            userId: '1',
            projectId: '1'
          },
          {
            id: '4',
            title: 'کامنت جدید',
            message: 'کاربر جدیدی روی وظیفه شما کامنت گذاشته است',
            type: 'comment_added',
            isRead: false,
            createdAt: '2024-11-02T14:20:00Z',
            userId: '1',
            taskId: '1',
            projectId: '1'
          }
        ]
        await createMockResponse(mockNotifications)
        return { data: mockNotifications } // Return just the data, not the full response object
      }

      const response = await api.get('/notifications')
      return response
    } catch (error) {
      throw error
    }
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        await createMockResponse({ id: notificationId, isRead: true })
        return { data: { id: notificationId, isRead: true } } // Return just the data, not the full response object
      }

      const response = await api.patch(`/notifications/${notificationId}/read`)
      return response
    } catch (error) {
      throw error
    }
  }

  // Mark all notifications as read
  async markAllAsRead() {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        await createMockResponse({ success: true })
        return { data: { success: true } } // Return just the data, not the full response object
      }

      const response = await api.patch('/notifications/read-all')
      return response
    } catch (error) {
      throw error
    }
  }

  // Delete notification
  async deleteNotification(notificationId) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        await createMockResponse({ id: notificationId })
        return { data: { id: notificationId } } // Return just the data, not the full response object
      }

      const response = await api.delete(`/notifications/${notificationId}`)
      return response
    } catch (error) {
      throw error
    }
  }

  // Get unread notifications count
  async getUnreadCount() {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        await createMockResponse({ count: 2 })
        return { data: { count: 2 } } // Return just the data, not the full response object
      }

      const response = await api.get('/notifications/unread-count')
      return response
    } catch (error) {
      throw error
    }
  }

  // Update notification preferences
  async updatePreferences(preferences) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        await createMockResponse(preferences)
        return { data: preferences } // Return just the data, not the full response object
      }

      const response = await api.put('/notifications/preferences', preferences)
      return response
    } catch (error) {
      throw error
    }
  }

  // Get notification preferences
  async getPreferences() {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockPreferences = {
          email: true,
          push: true,
          taskAssigned: true,
          deadlineReminder: true,
          projectUpdates: true,
          commentAdded: true,
          dailyDigest: false,
          weeklyDigest: true
        }
        await createMockResponse(mockPreferences)
        return { data: mockPreferences } // Return just the data, not the full response object
      }

      const response = await api.get('/notifications/preferences')
      return response
    } catch (error) {
      throw error
    }
  }

  // Create notification
  async createNotification(notificationData) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const newNotification = {
          ...notificationData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          isRead: false
        }
        await createMockResponse(newNotification)
        return { data: newNotification } // Return just the data, not the full response object
      }

      const response = await api.post('/notifications', notificationData)
      return response
    } catch (error) {
      throw error
    }
  }

  // Send notification to multiple users
  async sendBulkNotification(notificationData) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        await createMockResponse({ success: true, count: notificationData.userIds.length })
        return { data: { success: true, count: notificationData.userIds.length } } // Return just the data, not the full response object
      }

      const response = await api.post('/notifications/bulk', notificationData)
      return response
    } catch (error) {
      throw error
    }
  }
}

export const notificationService = new NotificationService()
export default NotificationService