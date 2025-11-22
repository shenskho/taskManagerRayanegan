export const urls = {
  auth: {
    login: '/api/Authentication/sign-in',
    register: '/api/Authentication/sign-up',
    profile: '/api/Authentication/profile',
    logout: '/api/Authentication/sign-out',
  },
  tasks: {
    list: '/tasks',
    detail: (id) => `/tasks/${id}`,
    move: (id) => `/tasks/${id}/move`,
  },
  projects: {
    list: '/projects',
    detail: (id) => `/projects/${id}`,
    stats: '/projects/stats',
  },
  notifications: {
    list: '/notifications',
    markRead: (id) => `/notifications/${id}/read`,
  },
  files: {
    upload: '/files/upload',
    download: (id) => `/files/${id}`,
  },
}

export default urls
