import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const signUpUser = (data) => apiClient.post(PATHS.signUpUser, { data })
export const login = (data) => apiClient.post(PATHS.loginUser, { data })
export const logout = () => apiClient.patch(PATHS.logout)
export const getSuperAdmin = () => apiClient.get(PATHS.superadmin)
export const forgotStep1 = (data) => apiClient.post(PATHS.forgotStep1, { data })
export const forgotStep2 = (data) => apiClient.post(PATHS.forgotStep2, { data })

//
//
//
// ====================================================================================================
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
