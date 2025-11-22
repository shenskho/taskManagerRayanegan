import React, { useEffect } from 'react'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Row, Col, Button } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { loadReportsThunk } from '@store/slices/reportSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(loadReportsThunk())
  }, [dispatch])

  return (
    <Row className="gy-3">
      <Col md={8}>
        <Card className="shadow-sm">
          <CardBody>
            <CardTitle tag="h4">{t('dashboard')}</CardTitle>
            <CardSubtitle className="text-muted mb-2">{t('welcome')}</CardSubtitle>
            <CardText>
              این نمونه مطابق ساختار Vuexy با Reactstrap، Redux Toolkit و i18next آماده شده و مسیرهای خصوصی/عمومی را بر اساس
              نقش کاربر کنترل می‌کند.
            </CardText>
            <Button color="primary" onClick={() => dispatch(loadReportsThunk())}>
              {t('refresh')}
            </Button>
          </CardBody>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="shadow-sm h-100">
          <CardBody>
            <CardTitle tag="h5">{t('reports')}</CardTitle>
            <CardText className="text-muted">جدول گزارش‌ها در صفحه مربوطه در دسترس است.</CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Home
