import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fa from './locales/fa'
import en from './locales/en'

const resources = {
  fa,
  en,
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('locale') || 'fa',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
