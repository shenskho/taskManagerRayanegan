import api, { createMockResponse } from './api'

// Task Service
class TaskService {
  // Get all tasks (with optional project filter)
  async getTasks(projectId = null) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        // Mock data for demonstration
        const mockTasks = [
          {
            id: '1',
            title: 'طراحی رابط کاربری جدید',
            description: 'ایجاد طراحی جدید برای صفحه اصلی برنامه',
            status: 'todo',
            priority: 'high',
            assignee: 'علی احمدی',
            dueDate: '2024-11-15',
            projectId: '1',
            tags: ['design', 'ui'],
            createdAt: '2024-11-01T08:00:00Z',
            updatedAt: '2024-11-01T08:00:00Z'
          },
          {
            id: '2',
            title: 'پیاده‌سازی سیستم احراز هویت',
            description: 'توسعه سیستم لاگین و ثبت‌نام کاربران',
            status: 'inprogress',
            priority: 'high',
            assignee: 'مریم محمدی',
            dueDate: '2024-11-20',
            projectId: '1',
            tags: ['backend', 'security'],
            createdAt: '2024-11-02T09:00:00Z',
            updatedAt: '2024-11-03T10:00:00Z'
          },
          {
            id: '3',
            title: 'نوشتن مستندات API',
            description: 'تکمیل مستندات مربوط به APIهای پروژه',
            status: 'done',
            priority: 'medium',
            assignee: 'رضا رضایی',
            dueDate: '2024-11-10',
            projectId: '1',
            tags: ['documentation'],
            createdAt: '2024-10-28T07:00:00Z',
            updatedAt: '2024-11-04T14:00:00Z'
          }
        ]

        const filteredTasks = projectId 
          ? mockTasks.filter(task => task.projectId === projectId)
          : mockTasks

        const mockResponse = await createMockResponse(filteredTasks)
        return { data: filteredTasks } // Return just the data, not the full response object
      }

      const response = await api.get('/tasks', {
        params: { projectId }
      })
      return response
    } catch (error) {
      throw error
    }
  }

  // Get single task by ID
  async getTask(id) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockTask = {
          id: id,
          title: 'نمونه وظیفه',
          description: 'این یک وظیفه نمونه برای نمایش است',
          status: 'todo',
          priority: 'medium',
          assignee: 'کاربر نمونه',
          dueDate: '2024-11-20',
          projectId: '1',
          tags: ['sample'],
          createdAt: '2024-11-01T08:00:00Z',
          updatedAt: '2024-11-01T08:00:00Z'
        }
        await createMockResponse(mockTask)
        return { data: mockTask } // Return just the data, not the full response object
      }

      const response = await api.get(`/tasks/${id}`)
      return response
    } catch (error) {
      throw error
    }
  }

  // Create new task
  async createTask(taskData) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const newTask = {
          ...taskData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        await createMockResponse(newTask)
        return { data: newTask } // Return just the data, not the full response object
      }

      const response = await api.post('/tasks', taskData)
      return response
    } catch (error) {
      throw error
    }
  }

  // Update task
  async updateTask(id, taskData) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const updatedTask = {
          ...taskData,
          id: id,
          updatedAt: new Date().toISOString()
        }
        await createMockResponse(updatedTask)
        return { data: updatedTask } // Return just the data, not the full response object
      }

      const response = await api.put(`/tasks/${id}`, taskData)
      return response
    } catch (error) {
      throw error
    }
  }

  // Delete task
  async deleteTask(id) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        return await createMockResponse({ id })
      }

      const response = await api.delete(`/tasks/${id}`)
      return response
    } catch (error) {
      throw error
    }
  }

  // Move task to different status/column
  async moveTask(id, newStatus) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        await createMockResponse({ id, status: newStatus })
        return { data: { id, status: newStatus } } // Return just the data, not the full response object
      }

      const response = await api.patch(`/tasks/${id}/move`, { status: newStatus })
      return response
    } catch (error) {
      throw error
    }
  }

  // Assign task to user
  async assignTask(id, userId) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        await createMockResponse({ id, assignee: userId })
        return { data: { id, assignee: userId } } // Return just the data, not the full response object
      }

      const response = await api.patch(`/tasks/${id}/assign`, { assignee: userId })
      return response
    } catch (error) {
      throw error
    }
  }

  // Add comment to task
  async addComment(id, comment) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const newComment = {
          id: Date.now().toString(),
          taskId: id,
          text: comment,
          author: 'Current User',
          createdAt: new Date().toISOString()
        }
        await createMockResponse(newComment)
        return { data: newComment } // Return just the data, not the full response object
      }

      const response = await api.post(`/tasks/${id}/comments`, { text: comment })
      return response
    } catch (error) {
      throw error
    }
  }

  // Get task statistics
  async getTaskStats(projectId = null) {
    try {
      if (import.meta.env.VITE_USE_MOCK_API === 'true') {
        const mockStats = {
          total: 12,
          todo: 4,
          inprogress: 5,
          done: 3,
          overdue: 2,
          completionRate: 25
        }
        return await createMockResponse(mockStats)
      }

      const response = await api.get('/tasks/stats', {
        params: { projectId }
      })
      return response
    } catch (error) {
      throw error
    }
  }
}

export const taskService = new TaskService()
export default TaskService