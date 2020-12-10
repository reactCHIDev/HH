import {
  GET_USER_ACCOUNT_REQUESTING,
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_ERROR,
  GET_USER_BY_LINK_REQUESTING,
  GET_USER_BY_LINK_SUCCESS,
  GET_USER_BY_LINK_ERROR,
  UPDATE_ACCOUNT_REQUESTING,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_ERROR,
  UPDATE_PHOTO_NAME_REQUESTING,
  UPDATE_PHOTO_NAME_SUCCESS,
  UPDATE_PHOTO_NAME_ERROR,
  RESET_CONFIRMATION,
  EMAIL_CONFIRM,
  EMAIL_CONFIRM_SUCCESS,
  EMAIL_CONFIRM_ERROR,
} from './constants'

export const getUserByLinkAC = (url) => ({
  type: GET_USER_BY_LINK_REQUESTING,
  url,
})

export const getUserAccount = (id) => ({
  type: GET_USER_ACCOUNT_REQUESTING,
  id,
})

export const getUserAccountSuccess = (payload) => ({
  type: GET_USER_ACCOUNT_SUCCESS,
  payload,
})

export const getUserAccountError = (payload) => ({
  type: GET_USER_ACCOUNT_ERROR,
  payload,
})

export const updateAccount = (data) => ({
  type: UPDATE_ACCOUNT_REQUESTING,
  payload: data,
})

export const updateAccountSuccess = (payload) => ({
  type: UPDATE_ACCOUNT_SUCCESS,
  payload,
})

export const updateAccountError = (payload) => ({
  type: UPDATE_ACCOUNT_ERROR,
  payload,
})

export const updatePhotoNameAC = (data) => ({
  type: UPDATE_PHOTO_NAME_REQUESTING,
  payload: data,
})

export const updatePhotoNameSuccessAC = (payload) => ({
  type: UPDATE_PHOTO_NAME_SUCCESS,
  payload,
})

export const updatePhotoNameErrorAC = (payload) => ({
  type: UPDATE_PHOTO_NAME_ERROR,
  payload,
})

export const resetConfirmation = () => ({
  type: RESET_CONFIRMATION,
})

export const emailConfirm = (payload) => ({
  type: EMAIL_CONFIRM,
  payload,
})

export const emailConfirmSuccess = (data) => ({
  type: EMAIL_CONFIRM_SUCCESS,
  data,
})

export const emailConfirmFailed = (payload) => ({
  type: EMAIL_CONFIRM_ERROR,
  payload,
})
