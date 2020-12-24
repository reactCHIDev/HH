import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getFoodmakerInfoReq = (id) => apiClient.get(PATHS.getFoodmakerInfo + id)
export const getFoodmakerInfoByNameReq = (name) =>
  apiClient.get(PATHS.getFoodmakerInfoByName + name)
export const updateFoodmakerAccountReq = (data) =>
  apiClient.patch(PATHS.updateFoodmakerAccount, { data })

// foodmaker orders
export const getFoodmakerOrdersReq = (id) => apiClient.get(PATHS.getFoodmakerInfo + id)
