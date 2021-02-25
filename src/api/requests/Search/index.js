import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const searchByProductsReq = ({
  searchedValue,
  city,
  isExplore,
  prodTypeId,
  prodCategoryId,
  prodPrice,
  startIdx,
  lim,
}) => {
  const title = searchedValue ? `title=${searchedValue}` : ''
  const cityId = city ? `&cityId=${city}` : ''
  const explore = isExplore ? '&explore=true' : ''
  const productTypeId = prodTypeId ? `&productTypeId=${prodTypeId}` : ''
  const productCategoryId = prodCategoryId ? `&productCategoryId=${prodCategoryId}` : ''
  const price = prodPrice ? `&price=${prodPrice}` : ''
  const startIndex = startIdx >= 0 ? `&startIndex=${startIdx}` : ''
  const limit = lim >= 0 ? `&limit=${lim}` : ''

  const params = `?${title}${explore}${cityId}${productTypeId}${productCategoryId}${price}${startIndex}${limit}`

  return apiClient.get(PATHS.searchInProducts + params)
} // ?title=new&cityId=2&explore=true&productTypeId=1&&productCategoryId=1&price=0,1000&startIndex=0&limit=12

export const searchByFoodmakersReq = ({ searchedValue, city, isExplore, fmTags }) => {
  const name = searchedValue ? `name=${searchedValue}` : ''
  const cityId = city ? `&cityId=${city}` : ''
  const explore = isExplore ? '&explore=true' : ''
  const foodmakerTags = fmTags ? `&foodmakerTags=${fmTags}` : ''

  const params = `?${name}${cityId}${explore}${foodmakerTags}`
  return apiClient.get(PATHS.searchInFoodMakers + params)
} // ?name=serg&cityId=1&explore=true&foodmakerTags=Chef,Catering,Tour

export const searchByExperiencesReq = ({
  startIdx,
  lim,
  city,
  prodPrice,
  isExplore,
  guests,
  types,
}) => {
  const startIndex = startIdx >= 0 ? `startIndex=${startIdx}` : ''
  const limit = lim >= 0 ? `&limit=${lim}` : ''
  const cityId = city ? `&cityId=${city}` : ''
  const price = prodPrice ? `&price=${prodPrice}` : ''
  const explore = isExplore ? '&explore=true' : ''
  const guestsQ = guests ? `&guests=${guests}` : ''
  const typeId = types ? `&typeIds=${types}` : ''
  const params = `?${startIndex}${limit}${cityId}${price}${explore}${guestsQ}${typeId}`
  return apiClient.get(PATHS.searchInExperiences + params)
  // ?startIndex=0&limit=12&cityId=307&price=0,499&explore=true&guests=15&typeIds=1,2,3
}
