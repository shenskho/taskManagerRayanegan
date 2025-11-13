import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { projectService } from '../../services/projectService'

// Async thunks for API calls
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await projectService.getProjects()
  return response.data
})

export const createProject = createAsyncThunk('projects/createProject', async (projectData) => {
  const response = await projectService.createProject(projectData)
  return response.data
})

export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, data }) => {
  const response = await projectService.updateProject(id, data)
  return response.data
})

export const deleteProject = createAsyncThunk('projects/deleteProject', async (id) => {
  await projectService.deleteProject(id)
  return id
})

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  // Sample static data for demonstration
  sampleProjects: [
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
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push({
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
        status: 'active'
      })
    },
    updateProjectLocal: (state, action) => {
      const index = state.projects.findIndex(project => project.id === action.payload.id)
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...action.payload, updatedAt: new Date().toISOString() }
      }
    },
    deleteProjectLocal: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload)
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload
    },
    updateProjectProgress: (state, action) => {
      const { projectId, progress } = action.payload
      const project = state.projects.find(project => project.id === projectId)
      if (project) {
        project.progress = progress
        project.updatedAt = new Date().toISOString()
      }
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload)
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(project => project.id === action.payload.id)
        if (index !== -1) {
          state.projects[index] = action.payload
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload)
      })
  }
})

export const { 
  addProject, 
  updateProjectLocal, 
  deleteProjectLocal, 
  setCurrentProject, 
  updateProjectProgress, 
  clearError 
} = projectsSlice.actions

export default projectsSlice.reducer