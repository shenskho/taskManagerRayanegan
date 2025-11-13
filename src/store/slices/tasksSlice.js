import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { taskService } from '../../services/taskService'

// Async thunks for API calls
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (projectId) => {
  const response = await taskService.getTasks(projectId)
  return response.data
})

export const createTask = createAsyncThunk('tasks/createTask', async (taskData) => {
  const response = await taskService.createTask(taskData)
  return response.data
})

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, data }) => {
  const response = await taskService.updateTask(id, data)
  return response.data
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await taskService.deleteTask(id)
  return id
})

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  currentTask: null,
  // Sample static data for demonstration
  sampleTasks: [
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
    },
    {
      id: '4',
      title: 'بهینه‌سازی عملکرد',
      description: 'بررسی و بهبود عملکرد برنامه',
      status: 'todo',
      priority: 'medium',
      assignee: 'سارا سارایی',
      dueDate: '2024-11-25',
      projectId: '2',
      tags: ['performance', 'optimization'],
      createdAt: '2024-11-05T08:30:00Z',
      updatedAt: '2024-11-05T08:30:00Z'
    }
  ]
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    },
    updateTaskLocal: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload, updatedAt: new Date().toISOString() }
      }
    },
    deleteTaskLocal: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    moveTask: (state, action) => {
      const { taskId, newStatus } = action.payload
      const task = state.tasks.find(task => task.id === taskId)
      if (task) {
        task.status = newStatus
        task.updatedAt = new Date().toISOString()
      }
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload)
      })
  }
})

export const { addTask, updateTaskLocal, deleteTaskLocal, moveTask, setCurrentTask, clearError } = tasksSlice.actions
export default tasksSlice.reducer