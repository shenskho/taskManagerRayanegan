import axios from 'axios'
import NProgress from 'nprogress'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const startLoading = () => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()
}

const endLoading = () => {
  NProgress.done()
}

const withAuth = (config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

const handleError = (error) => {
  endLoading()
  const status = error?.response?.status
  const message = error?.response?.data?.message || error.message || 'خطای ناشناخته'

  if (status === 302) {
    window.dispatchEvent(new CustomEvent('redirectMaintenance'))
  }

  if (status === 401) {
    window.dispatchEvent(new CustomEvent('forceLogout'))
  }

  if (status === 409) {
    toast.error(message || 'تداخل درخواست')
  } else {
    toast.error(message)
  }

  return Promise.reject(error)
}

const configureInstance = (instance, { skipSuccessToast = false } = {}) => {
  instance.interceptors.request.use((config) => {
    config = withAuth(config)
    startLoading()
    return config
  })

  instance.interceptors.response.use(
    (response) => {
      endLoading()
      if (response?.config?.method && response.config.method.toLowerCase() !== 'get' && !skipSuccessToast) {
        const successMessage = response?.data?.message
        if (successMessage) {
          toast.success(successMessage)
        }
      }
      return response
    },
    handleError
  )
}

export const baseAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const uploadAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export const downloadAPI = axios.create({
  baseURL: API_BASE_URL,
  responseType: 'blob',
  headers: {
    accept: '*/*',
  },
})

configureInstance(baseAPI)
configureInstance(uploadAPI)
configureInstance(downloadAPI, { skipSuccessToast: true })
