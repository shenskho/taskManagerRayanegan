import { baseAPI, downloadAPI, uploadAPI } from '@configs/axios'
import API_URLS from './urls'

export const fetchReports = async () => {
  const { data } = await baseAPI.get(API_URLS.reports.list)
  return data
}

export const uploadReport = async (formData) => {
  const { data } = await uploadAPI.post(API_URLS.reports.upload, formData)
  return data
}

export const downloadReport = async (params) => {
  const { data } = await downloadAPI.post(API_URLS.reports.download, params)
  return data
}
