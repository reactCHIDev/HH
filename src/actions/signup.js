import { SIGNUP_REQUESTING, SIGNUP_FLAG_RESET, GET_USER_BY_NAME } from './constants'

export const signupRequest = (credentials, resolve, reject) => {
  return {
    type: SIGNUP_REQUESTING,
    credentials,
    resolve,
    reject,
  }
}

export const signupFlagReset = () => {
  return {
    type: SIGNUP_FLAG_RESET,
  }
}

export const getUserByName = (name) => {
  return {
    type: GET_USER_BY_NAME,
    name,
  }
}
