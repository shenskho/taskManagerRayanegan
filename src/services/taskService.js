import { apiClient } from './http/instances'
import urls from './http/urls'

export const taskService = {
  getTasks(projectId = null) {
    return apiClient.get(urls.tasks.list, { params: projectId ? { projectId } : undefined })
  },
  getTask(id) {
    return apiClient.get(urls.tasks.detail(id))
  },
  createTask(taskData) {
    return apiClient.post(urls.tasks.list, taskData)
  },
  updateTask(id, taskData) {
    return apiClient.put(urls.tasks.detail(id), taskData)
  },
  deleteTask(id) {
    return apiClient.delete(urls.tasks.detail(id))
  },
  moveTask(id, status) {
    return apiClient.patch(urls.tasks.move(id), { status })
  },
}

export default taskService
