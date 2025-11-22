export const getRoleHomePath = (role) => {
  switch (role) {
    case 'admin':
    case 'manager':
      return '/dashboard'
    default:
      return '/tasks'
  }
}

export const withMetaTitle = (title) => {
  if (title) {
    document.title = title
  }
}
