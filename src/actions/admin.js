import {
  GET_USERS_LIST_REQUESTING,
  GET_SHOPS_LIST_REQUESTING,
  GET_WITHDRAW_LIST_REQUESTING,
  APPROVE_WITHDRAW_REQUESTING,
  GET_FAQ_LIST_REQUESTING,
  CREATE_FAQ_REQUESTING,
  DELETE_FAQ_REQUESTING,
  EDIT_FAQ_REQUESTING,
  CREATE_CITY_REQUESTING,
  DELETE_CITY_REQUESTING,
  EDIT_CITY_REQUESTING,
} from './constants'

export const getUsersListAC = () => ({
  type: GET_USERS_LIST_REQUESTING,
})

export const getShopsListAc = () => ({
  type: GET_SHOPS_LIST_REQUESTING,
})

export const getWithdrawListAC = (params) => ({
  type: GET_WITHDRAW_LIST_REQUESTING,
  payload: params,
})

export const approveWithdrawAC = (id) => ({
  type: APPROVE_WITHDRAW_REQUESTING,
  payload: id,
})

export const getFaqAC = () => ({
  type: GET_FAQ_LIST_REQUESTING,
})

export const createFaqAC = (data) => ({
  type: CREATE_FAQ_REQUESTING,
  payload: data,
})

export const deleteFaqAC = (id) => ({
  type: DELETE_FAQ_REQUESTING,
  payload: id,
})

export const editFaqAC = (data) => ({
  type: EDIT_FAQ_REQUESTING,
  payload: data,
})

export const createCityAC = (data) => ({
  type: CREATE_CITY_REQUESTING,
  payload: data,
})

export const deleteCityAC = (id) => ({
  type: DELETE_CITY_REQUESTING,
  payload: id,
})

export const editCityAC = (data) => ({
  type: EDIT_CITY_REQUESTING,
  payload: data,
})
