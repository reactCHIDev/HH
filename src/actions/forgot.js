import {
  PASSWORD_REQUESTING,
  PASSWORD_REQUESTING_SUCCESS,
  PASSWORD_REQUESTING_ERROR,
} from './constants'

export const passwordRequest = (email) => ({
  type: PASSWORD_REQUESTING,
  email,
})

export const passwordRequestSuccess = (data) => ({
  type: PASSWORD_REQUESTING_SUCCESS,
  data,
})

export const passwordRequestFailed = (payload) => ({
  type: PASSWORD_REQUESTING_ERROR,
  payload,
})
