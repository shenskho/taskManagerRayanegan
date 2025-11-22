import { apiClient } from './http/instances'
import urls from './http/urls'

export const notificationService = {
  getNotifications() {
    return apiClient.get(urls.notifications.list)
  },
  markAsRead(id) {
    return apiClient.patch(urls.notifications.markRead(id))
  },
  markAllAsRead() {
    return apiClient.patch(`${urls.notifications.list}/read-all`)
  },
  deleteNotification(id) {
    return apiClient.delete(urls.notifications.markRead(id))
  },
  getUnreadCount() {
    return apiClient.get(`${urls.notifications.list}/unread-count`)
  },
}

export default notificationService
