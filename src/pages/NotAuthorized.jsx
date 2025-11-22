import React from 'react'
import { Alert } from 'reactstrap'
import { useTranslation } from 'react-i18next'

const NotAuthorized = () => {
  const { t } = useTranslation()
  return (
    <Alert color="danger" className="text-center">
      {t('accessDenied')}
    </Alert>
  )
}

export default NotAuthorized
