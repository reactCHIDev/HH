import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const login = (data) => apiClient.post(PATHS.login, { data })
export const logout = () => apiClient.delete(PATHS.logout)
export const registration = (data) => apiClient.post(PATHS.registration, { data })

export const signUp = (data) => apiClient.post(PATHS.signUp, { data })
export const checkName = (data) => apiClient.post(PATHS.checkName, { data })
export const uploadUnregisterProfileImage = (data) =>
  apiClient.post(PATHS.uploadUnregisterProfileImage, {
    headers: {
      'Content-Type': 'multipart/form-data;',
      Accept: 'application/json',
      type: 'formData',
    },
    data,
  })
export const refreshToken = (token) =>
  apiClient.post(PATHS.authToken, {
    headers: {
      'Refresh-Token': token,
    },
  })
