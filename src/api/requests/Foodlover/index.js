import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

// eslint-disable-next-line import/prefer-default-export
export const getFoodloverOrdersReq = ({ startD = '2021-01-01', endD = '2021-12-31' }) => {
  const startDate = `startDate=${startD}`
  const endDate = `endDate=${endD}`

  const params = `?${startDate}&${endDate}`

  return apiClient.get(PATHS.fl_orders + params)
}

export const getFoodloverOrderInfoReq = (id) => apiClient.get(PATHS.flOrderInfo + id)

export const toggleFavouriteProductReq = (id) => apiClient.post(PATHS.toggleFavouriteProduct + id)

export const toggleFavouriteFoodmakerReq = (id) =>
  apiClient.post(PATHS.toggleFavouriteFoodmaker + id)

export const toggleFavouriteShopReq = (id) => apiClient.post(PATHS.toggleFavouriteShop + id)
