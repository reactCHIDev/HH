import {
  GET_FOODMAKER_INFO_REQUESTING,
  GET_FOODMAKER_INFO_SUCCESS,
  GET_FOODMAKER_INFO_ERROR,
  GET_FOODMAKER_INFO_BY_NAME_REQUESTING,
  GET_FOODMAKER_INFO_BY_NAME_SUCCESS,
  GET_FOODMAKER_INFO_BY_NAME_ERROR,
  UPDATE_FOODMAKER_ACCOUNT_REQUESTING,
  UPDATE_FOODMAKER_ACCOUNT_SUCCESS,
  UPDATE_FOODMAKER_ACCOUNT_ERROR,
  CREATE_WITHDRAW_REQUESTING,
} from './constants'

export const getFoodmakerInfoAC = (id) => ({
  type: GET_FOODMAKER_INFO_REQUESTING,
  id,
})

export const getFoodmakerInfoSuccess = () => ({
  type: GET_FOODMAKER_INFO_SUCCESS,
})

export const getFoodmakerInfoError = (payload) => ({
  type: GET_FOODMAKER_INFO_ERROR,
  payload,
})

export const getFoodmakerInfoByNameAC = (name) => ({
  type: GET_FOODMAKER_INFO_BY_NAME_REQUESTING,
  name,
})

export const getFoodmakerInfoByNameSuccess = () => ({
  type: GET_FOODMAKER_INFO_BY_NAME_SUCCESS,
})

export const getFoodmakerInfoByNameError = (payload) => ({
  type: GET_FOODMAKER_INFO_BY_NAME_ERROR,
  payload,
})

export const updateFoodmakerAccountAC = (data) => ({
  type: UPDATE_FOODMAKER_ACCOUNT_REQUESTING,
  payload: data,
})

export const updateFoodmakerAccountSuccessAC = (payload) => ({
  type: UPDATE_FOODMAKER_ACCOUNT_SUCCESS,
  payload,
})

export const updateFoodmakerAccountErrorAC = (payload) => ({
  type: UPDATE_FOODMAKER_ACCOUNT_ERROR,
  payload,
})

export const createWithdrawAC = (payload) => ({
  type: CREATE_WITHDRAW_REQUESTING,
  payload,
})
