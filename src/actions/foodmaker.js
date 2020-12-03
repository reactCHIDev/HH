import {
  GET_FOODMAKER_INFO_REQUESTING,
  GET_FOODMAKER_INFO_SUCCESS,
  GET_FOODMAKER_INFO_ERROR,
  UPDATE_FOODMAKER_ACCOUNT_REQUESTING,
  UPDATE_FOODMAKER_ACCOUNT_SUCCESS,
  UPDATE_FOODMAKER_ACCOUNT_ERROR,
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
