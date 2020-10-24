import { SIGNUP_REQUESTING, SIGNUP_FLAG_RESET } from './constants'

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
