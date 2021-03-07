import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getFavExperiencesReq = ({ startIdx, lim }) => {
  const startIndex = startIdx >= 0 ? `startIndex=${startIdx}` : ''
  const limit = lim >= 0 ? `&limit=${lim}` : ''

  const params = `?${startIndex}${limit}`

  return apiClient.get(PATHS.getFavExperiences + params)
} // ?startIndex=0&limit=6&cityId=1

export const getFavProductsReq = ({ startIdx, lim }) => {
  const startIndex = startIdx >= 0 ? `startIndex=${startIdx}` : ''
  const limit = lim >= 0 ? `&limit=${lim}` : ''

  const params = `?${startIndex}${limit}`

  return apiClient.get(PATHS.getFavProducts + params)
} // ?startIndex=0&limit=6&cityId=1

export const getFavMakersReq = ({ startIdx, lim }) => {
  const startIndex = startIdx >= 0 ? `startIndex=${startIdx}` : ''
  const limit = lim >= 0 ? `&limit=${lim}` : ''

  const params = `?${startIndex}${limit}`

  return apiClient.get(PATHS.getFavMakers + params)
} // ?startIndex=0&limit=6&cityId=1

export const getFavShopsReq = ({ startIdx, lim }) => {
  const startIndex = startIdx >= 0 ? `startIndex=${startIdx}` : ''
  const limit = lim >= 0 ? `&limit=${lim}` : ''

  const params = `?${startIndex}${limit}`

  return apiClient.get(PATHS.getFavShops + params)
} // ?startIndex=0&limit=6&cityId=1
