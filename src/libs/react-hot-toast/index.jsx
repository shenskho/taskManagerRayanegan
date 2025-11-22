import React, { useEffect, useMemo, useState } from 'react'

const subscribers = new Set()
let toastId = 0

const notify = (type, message, options = {}) => {
  toastId += 1
  const id = options.id || toastId
  const toast = { id, type, message, duration: options.duration || 2500 }
  subscribers.forEach((handler) => handler(toast))
  return id
}

const removeToast = (id) => {
  subscribers.forEach((handler) => handler({ id, dismiss: true }))
}

export const toast = {
  success: (message, options) => notify('success', message, options),
  error: (message, options) => notify('error', message, options),
  loading: (message, options) => notify('loading', message, options),
  promise: (promise, messages) => {
    const id = toast.loading(messages?.loading || 'در حال انجام...')
    return promise
      .then((value) => {
        toast.success(typeof messages?.success === 'function' ? messages.success(value) : messages?.success || 'موفقیت آمیز بود', { id })
        return value
      })
      .catch((error) => {
        toast.error(typeof messages?.error === 'function' ? messages.error(error) : messages?.error || 'با خطا مواجه شد', { id })
        throw error
      })
  },
  dismiss: (id) => removeToast(id),
  remove: (id) => removeToast(id),
}

const ToastItem = ({ toast }) => {
  const className = `rht-toast ${toast.type}`
  return (
    <div className={className} role="alert">
      {toast.message}
    </div>
  )
}

export const Toaster = ({ position = 'top-right' }) => {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handler = (incoming) => {
      if (incoming.dismiss) {
        setToasts((current) => (incoming.id ? current.filter((t) => t.id !== incoming.id) : []))
        return
      }
      setToasts((current) => [...current, incoming])
      if (incoming.duration !== Infinity) {
        setTimeout(() => removeToast(incoming.id), incoming.duration)
      }
    }
    subscribers.add(handler)
    return () => subscribers.delete(handler)
  }, [])

  const positionClass = useMemo(() => {
    switch (position) {
      case 'top-left':
        return 'rht-top rht-left'
      case 'bottom-left':
        return 'rht-bottom rht-left'
      case 'bottom-right':
        return 'rht-bottom rht-right'
      default:
        return 'rht-top rht-right'
    }
  }, [position])

  return (
    <div className={`rht-container ${positionClass}`}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

export default toast
