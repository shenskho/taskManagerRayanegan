import { downloadAPI, uploadAPI } from '@configs/axios'
import API_URLS from './urls'

export const uploadFile = async (formData) => {
  const { data } = await uploadAPI.post(API_URLS.files.upload, formData)
  return data
}

export const downloadFile = async (params) => {
  const { data } = await downloadAPI.post(API_URLS.files.download, params)
  return data
}
