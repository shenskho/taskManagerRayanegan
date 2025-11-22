import axios from 'axios'
import NProgress from 'nprogress'
import { toast } from 'react-hot-toast'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

const withInterceptors = (instance, { showSuccess = true } = {}) => {
  instance.interceptors.request.use(
    (config) => {
      NProgress.start()
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      NProgress.done()
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      NProgress.done()
      const message = response?.data?.message
      if (showSuccess && message) {
        toast.success(message)
      }
      return response
    },
    (error) => {
      NProgress.done()
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'خطایی رخ داد'
      toast.error(message)
      return Promise.reject(error)
    }
  )
  return instance
}

export const apiClient = withInterceptors(
  axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  })
)

export const uploadClient = withInterceptors(
  axios.create({
    baseURL,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
)

export const downloadClient = withInterceptors(
  axios.create({
    baseURL,
    responseType: 'blob',
    headers: { accept: '*/*' },
  }),
  { showSuccess: false }
)
