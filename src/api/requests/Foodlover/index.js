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

export const toggleFavouriteProductReq = (data) =>
  apiClient.post(PATHS.toggleFavouriteProduct, { data })

export const toggleFavouriteFoodmakerReq = (data) =>
  apiClient.post(PATHS.toggleFavouriteFoodmaker, { data })

export const toggleFavouriteShopReq = (data) => apiClient.post(PATHS.toggleFavouriteShop, { data })
export const toggleFavouriteExperienceReq = (data) =>
  apiClient.post(PATHS.toggleFavouriteExp, { data })
