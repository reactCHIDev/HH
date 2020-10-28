import {
  PASSWORD_REQUESTING,
  PASSWORD_REQUESTING_SUCCESS,
  PASSWORD_REQUESTING_ERROR,
  PASSWORD_CREATING,
  PASSWORD_CREATING_SUCCESS,
  PASSWORD_CREATING_ERROR,
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

export const passwordCreate = (payload) => ({
  type: PASSWORD_CREATING,
  payload,
})

export const passwordCreateSuccess = (data) => ({
  type: PASSWORD_CREATING_SUCCESS,
  data,
})

export const passwordCreateFailed = (payload) => ({
  type: PASSWORD_CREATING_ERROR,
  payload,
})
