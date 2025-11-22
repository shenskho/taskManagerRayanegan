import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { loginThunk } from '@store/slices/authSlice'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  username: yup.string().required('نام کاربری اجباری است').min(3, 'حداقل ۳ کاراکتر'),
  password: yup.string().required('رمز عبور اجباری است').min(6, 'حداقل ۶ کاراکتر'),
})

const Login = () => {
  const { control, handleSubmit, formState } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { username: '', password: '' },
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, token } = useSelector((state) => state.auth)
  const { t } = useTranslation()

  useEffect(() => {
    if (token) {
      navigate('/dashboard')
    }
  }, [token, navigate])

  const onSubmit = async (values) => {
    if (!values.username || !values.password) return
    const resultAction = await dispatch(loginThunk(values))
    if (loginThunk.fulfilled.match(resultAction)) {
      toast.success(t('welcome'))
      navigate('/dashboard')
    }
  }

  return (
    <Card className="shadow-sm animate__animated animate__fadeInUp w-100" style={{ maxWidth: 420 }}>
      <CardBody>
        <CardTitle tag="h4" className="mb-3 text-center">
          {t('loginTitle')}
        </CardTitle>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormGroup className="mb-3">
            <Label for="username">{t('username')}</Label>
            <Controller
              name="username"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input id="username" placeholder="admin" invalid={!!fieldState.error} {...field} />
                  {fieldState.error ? <FormFeedback>{fieldState.error.message}</FormFeedback> : null}
                </>
              )}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="password">{t('password')}</Label>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input id="password" type="password" invalid={!!fieldState.error} {...field} />
                  {fieldState.error ? <FormFeedback>{fieldState.error.message}</FormFeedback> : null}
                </>
              )}
            />
          </FormGroup>
          <Button color="primary" type="submit" block disabled={status === 'loading'}>
            {t('submit')}
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}

export default Login
