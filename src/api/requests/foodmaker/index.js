import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getFoodmakerInfoReq = (id) => apiClient.get(PATHS.getFoodmakerInfo + id)
export const updateFoodmakerAccountReq = (data) =>
  apiClient.patch(PATHS.updateFoodmakerAccount, { data })
