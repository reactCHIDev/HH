import {
  GET_USERS_LIST_REQUESTING,
  GET_SHOPS_LIST_REQUESTING,
  GET_WITHDRAW_LIST_REQUESTING,
} from './constants'

export const getUsersListAC = () => ({
  type: GET_USERS_LIST_REQUESTING,
})

export const getShopsListAc = () => ({
  type: GET_SHOPS_LIST_REQUESTING,
})

export const getWithdrawListAC = () => ({
  type: GET_WITHDRAW_LIST_REQUESTING,
})
