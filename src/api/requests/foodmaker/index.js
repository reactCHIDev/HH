import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getFoodmakerInfoReq = (id) => apiClient.get(PATHS.getFoodmakerInfo + id)
export const getFoodmakerInfoByNameReq = (name) =>
  apiClient.get(PATHS.getFoodmakerInfoByName + name)
export const updateFoodmakerAccountReq = (data) =>
  apiClient.patch(PATHS.updateFoodmakerAccount, { data })

// foodmaker orders
export const getFoodmakerOrdersReq = ({ startD = '2021-01-01', endD = '2021-12-31' }) => {
  const startDate = `startDate=${startD}`
  const endDate = `endDate=${endD}`

  const params = `?${startDate}&${endDate}`

  return apiClient.get(PATHS.fm_orders + params)
}

export const getFoodmakerOrderInfoReq = (id) => apiClient.get(PATHS.fmOrderInfo + id)

export const createWithdrawReq = (data) => apiClient.post(PATHS.createWithdraw, { data })

export const updateBankDataReq = (data) => apiClient.post(PATHS.updateBankData, { data })

export const changeDeliveryStatusReq = (data) => apiClient.patch(PATHS.changeDelStatus, { data })
