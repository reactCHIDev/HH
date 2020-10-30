import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_ERROR_RESET,
  LOGOUT,
} from './constants'

export const loginRequest = (creds, resolve, reject) => ({
  type: LOGIN_REQUESTING,
  creds,
  resolve,
  reject,
})

export const succesfullLogin = () => ({
  type: LOGIN_SUCCESS,
})

export const loginFailed = (payload) => ({
  type: LOGIN_ERROR,
  payload,
})

export const logout = () => ({
  type: LOGOUT,
})

export const loginErrorReset = () => ({
  type: LOGIN_ERROR_RESET,
})
