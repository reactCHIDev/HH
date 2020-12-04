import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

const { emailValidation, userNameValidation, phoneNumberValidation } = PATHS

export const validateEmail = (data) => apiClient.post(emailValidation, { data })
export const validateUserName = (data) => apiClient.post(userNameValidation, { data })
export const validatePhoneNumber = (data) => apiClient.get(phoneNumberValidation, { data })
