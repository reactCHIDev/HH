import { SEND_CURRENT_DATE, UPD_CURRENT_DATE, SEND_CURRENT_INDEX } from 'actions/constants'

export const sendCurrDate = (date, mode) => ({
  type: SEND_CURRENT_DATE,
  date,
  mode,
})

export const sendCurrentIndex = (params) => ({
  type: SEND_CURRENT_INDEX,
  params,
})

export const updCurrentDate = (date) => ({
  type: UPD_CURRENT_DATE,
  date,
})
