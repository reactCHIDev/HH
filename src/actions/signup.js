import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_FOODMAKER_REQUESTING,
  SIGNUP_FOODMAKER_SUCCESS,
  SIGNUP_FOODMAKER_ERROR,
  SIGNUP_LOVER_AS_MAKER_REQUESTING,
  SIGNUP_LOVER_AS_MAKER_SUCCESS,
  SIGNUP_LOVER_AS_MAKER_ERROR,
  SIGNUP_FLAG_RESET,
  GET_USER_BY_NAME,
} from './constants'

export const signupRequest = (credentials, resolve, reject) => {
  return {
    type: SIGNUP_REQUESTING,
    credentials,
    resolve,
    reject,
  }
}

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
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

export const signupFoodmakerAC = (credentials) => {
  return {
    type: SIGNUP_FOODMAKER_REQUESTING,
    credentials,
  }
}

export const signupFoodmakerSuccessAC = () => {
  return {
    type: SIGNUP_FOODMAKER_SUCCESS,
  }
}

export const signupLoverAsMakerAC = (credentials) => {
  return {
    type: SIGNUP_LOVER_AS_MAKER_REQUESTING,
    credentials,
  }
}
