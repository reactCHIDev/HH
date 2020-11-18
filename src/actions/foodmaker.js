import {
  GET_FOODMAKER_INFO_REQUESTING,
  GET_FOODMAKER_INFO_SUCCESS,
  GET_FOODMAKER_INFO_ERROR,
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
