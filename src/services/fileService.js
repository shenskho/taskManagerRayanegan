import { downloadClient, uploadClient } from './http/instances'
import urls from './http/urls'

export const fileService = {
  uploadFile(formData) {
    return uploadClient.post(urls.files.upload, formData)
  },
  downloadFile(id) {
    return downloadClient.get(urls.files.download(id))
  },
}

export default fileService
