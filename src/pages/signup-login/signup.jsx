import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '@assets/images/logo/logo2.png'
import { clearError, login, register } from '@store/slices/authSlice'

const initialFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector(state => state.auth)

  const registrationEnabled = import.meta.env.VITE_ENABLE_SIGNUP === 'true'

  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [formData, setFormData] = useState(initialFormState)
  const [localError, setLocalError] = useState('')

  const isRegisterMode = useMemo(() => mode === 'register', [mode])

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (isAuthenticated && storedToken) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleModeSwitch = nextMode => {
    if (nextMode === mode) return
    if (nextMode === 'register' && !registrationEnabled) {
      setLocalError('ثبت‌نام در حال حاضر فعال نیست.')
      return
    }

    setMode(nextMode)
    setFormData(initialFormState)
    setLocalError('')
    if (error) {
      dispatch(clearError())
    }
  }

  const handleChange = event => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    setLocalError('')

    if (!formData.email.trim() || !formData.password.trim()) {
      setLocalError('وارد کردن ایمیل و رمز عبور الزامی است.')
      return
    }

    if (isRegisterMode) {
      if (!registrationEnabled) {
        setLocalError('ثبت‌نام در حال حاضر فعال نیست.')
        return
      }
      if (!formData.name.trim()) {
        setLocalError('نام و نام‌خانوادگی خود را وارد کنید.')
        return
      }
      if (formData.password.length < 6) {
        setLocalError('طول رمز عبور باید حداقل ۶ کاراکتر باشد.')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setLocalError('رمز عبور و تکرار آن یکسان نیست.')
        return
      }

      dispatch(
        register({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        })
      )
      return
    }

    dispatch(
      login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      })
    )
  }

  return (
    <div
      className="auth-page d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fb 0%, #dee3f3 100%)',
        padding: '2rem'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <img
                    src={logo}
                    alt="لوگوی رایانگان"
                    style={{ width: '72px', height: '72px', objectFit: 'contain' }}
                  />
                  <h1 className="h4 fw-bold mt-3 mb-1">مدیریت وظایف رایانگان</h1>
                  <p className="text-muted mb-0">
                    برای دسترسی به داشبورد، ورود یا ثبت‌نام الزامی است.
                  </p>
                </div>

                <div className="d-flex gap-2 mb-4">
                  <button
                    type="button"
                    className={`btn w-50 ${!isRegisterMode ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleModeSwitch('login')}
                  >
                    ورود
                  </button>
                  <button
                    type="button"
                    className={`btn w-50 ${isRegisterMode ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleModeSwitch('register')}
                    disabled={!registrationEnabled}
                    title={registrationEnabled ? undefined : 'ثبت‌نام به‌زودی فعال می‌شود.'}
                  >
                    ثبت‌نام
                  </button>
                </div>

                {!registrationEnabled && (
                  <div className="alert alert-info py-2" role="alert">
                    ثبت‌نام کاربران جدید به‌زودی از طریق سامانه فعال خواهد شد.
                  </div>
                )}

                {(localError || error) && (
                  <div className="alert alert-danger py-2" role="alert">
                    {localError || error}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {isRegisterMode && (
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        نام و نام‌خانوادگی
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="مثال: علی احمدی"
                        value={formData.name}
                        onChange={handleChange}
                        required={isRegisterMode}
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      ایمیل
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      رمز عبور
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="حداقل ۶ کاراکتر"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                  </div>

                  {isRegisterMode && (
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        تکرار رمز عبور
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        placeholder="رمز عبور را تکرار کنید"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required={isRegisterMode}
                        minLength={6}
                      />
                    </div>
                  )}

                  {!isRegisterMode && (
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          name="rememberMe"
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                          مرا به خاطر بسپار
                        </label>
                      </div>
                      <a href="/forgot-password" className="small">
                        فراموشی رمز عبور؟
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading
                      ? 'لطفاً صبر کنید...'
                      : isRegisterMode
                        ? 'ایجاد حساب کاربری'
                        : 'ورود به حساب'}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    با ورود یا ثبت‌نام، با شرایط استفاده و سیاست حفظ حریم خصوصی موافقت می‌کنید.
                  </small>
                </div>
              </div>
            </div>

            <p className="text-center text-muted mt-3 mb-0">
              © {new Date().getFullYear()} رایانگان. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

