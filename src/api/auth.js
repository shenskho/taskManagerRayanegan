import { baseAPI } from '@configs/axios'
import API_URLS from './urls'

export const loginRequest = async (payload) => {
  const { data } = await baseAPI.post(API_URLS.auth.login, payload)
  return data
}

export const fetchProfile = async () => {
  const { data } = await baseAPI.get(API_URLS.auth.me)
  return data
}
