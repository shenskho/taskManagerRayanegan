import api, { createMockResponse } from './api'
import { getPlaceholderImage } from '../utils/imageUtils'

// Project Service
class ProjectService {
  // Get all projects
  async getProjects() {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockProjects = [
          {
            id: '1',
            name: 'پروژه مدیریت وظایف',
            description: 'سیستم مدیریت پروژه و وظایف با امکانات کامل',
            status: 'active',
            startDate: '2024-10-01',
            endDate: '2024-12-31',
            manager: 'علی احمدی',
            teamMembers: ['علی احمدی', 'مریم محمدی', 'رضا رضایی', 'سارا سارایی'],
            progress: 65,
            priority: 'high',
            color: '#007bff',
            createdAt: '2024-09-15T08:00:00Z',
            updatedAt: '2024-11-05T10:00:00Z'
          },
          {
            id: '2',
            name: 'طراحی سایت فروشگاهی',
            description: 'طراحی و توسعه فروشگاه اینترنتی جدید',
            status: 'active',
            startDate: '2024-11-01',
            endDate: '2025-02-28',
            manager: 'مریم محمدی',
            teamMembers: ['مریم محمدی', 'رضا رضایی'],
            progress: 30,
            priority: 'medium',
            color: '#28a745',
            createdAt: '2024-10-20T09:00:00Z',
            updatedAt: '2024-11-04T14:30:00Z'
          },
          {
            id: '3',
            name: 'بهینه‌سازی دیتابیس',
            description: 'بهینه‌سازی عملکرد دیتابیس و کوئری‌ها',
            status: 'completed',
            startDate: '2024-08-01',
            endDate: '2024-10-15',
            manager: 'رضا رضایی',
            teamMembers: ['رضا رضایی', 'سارا سارایی'],
            progress: 100,
            priority: 'high',
            color: '#6f42c1',
            createdAt: '2024-07-20T07:00:00Z',
            updatedAt: '2024-10-15T16:00:00Z'
          }
        ]
        await createMockResponse(mockProjects)
        return { data: mockProjects } // Return just the data, not the full response object
      }

      const response = await api.get('/projects')
      return response
    } catch (error) {
      throw error
    }
  }

  // Get single project by ID
  async getProject(id) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockProject = {
          id: id,
          name: 'پروژه نمونه',
          description: 'این یک پروژه نمونه برای نمایش است',
          status: 'active',
          startDate: '2024-11-01',
          endDate: '2024-12-31',
          manager: 'مدیر پروژه',
          teamMembers: ['عضو ۱', 'عضو ۲'],
          progress: 50,
          priority: 'medium',
          color: '#007bff',
          createdAt: '2024-11-01T08:00:00Z',
          updatedAt: '2024-11-05T10:00:00Z'
        }
        await createMockResponse(mockProject)
        return { data: mockProject } // Return just the data, not the full response object
      }

      const response = await api.get(`/projects/${id}`)
      return response
    } catch (error) {
      throw error
    }
  }

  // Create new project
  async createProject(projectData) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const newProject = {
          ...projectData,
          id: Date.now().toString(),
          progress: 0,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        await createMockResponse(newProject)
        return { data: newProject } // Return just the data, not the full response object
      }

      const response = await api.post('/projects', projectData)
      return response
    } catch (error) {
      throw error
    }
  }

  // Update project
  async updateProject(id, projectData) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const updatedProject = {
          ...projectData,
          id: id,
          updatedAt: new Date().toISOString()
        }
        await createMockResponse(updatedProject)
        return { data: updatedProject } // Return just the data, not the full response object
      }

      const response = await api.put(`/projects/${id}`, projectData)
      return response
    } catch (error) {
      throw error
    }
  }

  // Delete project
  async deleteProject(id) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        await createMockResponse({ id })
        return { data: { id } } // Return just the data, not the full response object
      }

      const response = await api.delete(`/projects/${id}`)
      return response
    } catch (error) {
      throw error
    }
  }

  // Get project statistics
  async getProjectStats() {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockStats = {
          total: 8,
          active: 5,
          completed: 3,
          overdue: 1,
          totalTasks: 45,
          completedTasks: 28
        }
        await createMockResponse(mockStats)
        return { data: mockStats } // Return just the data, not the full response object
      }

      const response = await api.get('/projects/stats')
      return response
    } catch (error) {
      throw error
    }
  }

  // Get project team members
  async getProjectMembers(projectId) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockMembers = [
          {
            id: '1',
            name: 'علی احمدی',
            email: 'ali@example.com',
            role: 'manager',
            avatar: getPlaceholderImage(32, 32),
            joinedAt: '2024-09-15T08:00:00Z'
          },
          {
            id: '2',
            name: 'مریم محمدی',
            email: 'maryam@example.com',
            role: 'developer',
            avatar: getPlaceholderImage(32, 32),
            joinedAt: '2024-09-20T09:00:00Z'
          }
        ]
        await createMockResponse(mockMembers)
        return { data: mockMembers } // Return just the data, not the full response object
      }

      const response = await api.get(`/projects/${projectId}/members`)
      return response
    } catch (error) {
      throw error
    }
  }

  // Add member to project
  async addProjectMember(projectId, memberData) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const newMember = {
          ...memberData,
          id: Date.now().toString(),
          joinedAt: new Date().toISOString()
        }
        return await createMockResponse(newMember)
      }

      const response = await api.post(`/projects/${projectId}/members`, memberData)
      return response
    } catch (error) {
      throw error
    }
  }

  // Remove member from project
  async removeProjectMember(projectId, memberId) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        return await createMockResponse({ memberId })
      }

      const response = await api.delete(`/projects/${projectId}/members/${memberId}`)
      return response
    } catch (error) {
      throw error
    }
  }

  // Update project progress
  async updateProjectProgress(projectId, progress) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        return await createMockResponse({ projectId, progress })
      }

      const response = await api.patch(`/projects/${projectId}/progress`, { progress })
      return response
    } catch (error) {
      throw error
    }
  }
}

export const projectService = new ProjectService()
export default ProjectService