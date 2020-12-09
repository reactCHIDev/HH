import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getHomePageProductsReq = ({ startIdx, lim, city }) => {
  const startIndex = startIdx >= 0 ? `startIndex=${startIdx}` : ''
  const limit = lim >= 0 ? `&limit=${lim}` : ''
  const cityId = city ? `&cityId=${city}` : ''

  const params = '?' + startIndex + limit + cityId

  return apiClient.get(PATHS.getHomePageProducts + params)
} // ?startIndex=0&limit=6&cityId=1

export const getFoodmakesForHomePageReq = ({ startIdx, lim, city }) => {
  const startIndex = startIdx >= 0 ? `startIndex=${startIdx}` : ''
  const limit = lim >= 0 ? `&limit=${lim}` : ''
  const cityId = city ? `&cityId=${city}` : ''

  const params = '?' + startIndex + limit + cityId

  return apiClient.get(PATHS.listFoodmakersForHome + params)
} // ?startIndex=0&limit=6&cityId=1
