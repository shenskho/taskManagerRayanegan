import { apiClient } from './http/instances'
import urls from './http/urls'

export const projectService = {
  getProjects() {
    return apiClient.get(urls.projects.list)
  },
  getProject(id) {
    return apiClient.get(urls.projects.detail(id))
  },
  createProject(data) {
    return apiClient.post(urls.projects.list, data)
  },
  updateProject(id, data) {
    return apiClient.put(urls.projects.detail(id), data)
  },
  deleteProject(id) {
    return apiClient.delete(urls.projects.detail(id))
  },
  getProjectStats() {
    return apiClient.get(urls.projects.stats)
  },
}

export default projectService
