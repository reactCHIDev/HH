import {
  GET_USERS_LIST_REQUESTING,
  GET_SHOPS_LIST_REQUESTING,
  GET_WITHDRAW_LIST_REQUESTING,
  APPROVE_WITHDRAW_REQUESTING,
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
