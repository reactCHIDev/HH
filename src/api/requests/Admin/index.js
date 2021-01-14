import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getUsersListReq = () => apiClient.get(PATHS.getUsersList)
export const getShopsListReq = () => apiClient.get(PATHS.getShopsList)
export const getWithdrawListReq = (options) => {
  const { startIndex, limit, status } = options
  const qty =
    Number(startIndex) >= 0 && Number(limit) >= 0 ? `?startIndex=${startIndex}&limit=${limit}` : ''
  const type = status ? `&status=${status}` : ''
  return apiClient.get(PATHS.getWithdrawList + qty + type)
} // ?startIndex=0&limit=100&status=Pending
export const approveWithdrawReq = (data) => apiClient.patch(PATHS.approveWithdraw, { data })
