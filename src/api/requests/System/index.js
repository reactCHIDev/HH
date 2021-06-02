import apiClient from 'utils/apiClient'
import PATHS from 'api/paths'

export const getProductTypesReq = () => apiClient.get(PATHS.getProductTypes)
export const getServiceTags = () => apiClient.get(PATHS.getServiceTags)
export const getSpecialityTags = () => apiClient.get(PATHS.getSpecialityTags)
export const getProductTagsReq = () => apiClient.get(PATHS.getProductTags)
export const getCitiesReq = () => apiClient.get(PATHS.getCities)
export const getCountriesReq = () => apiClient.get(PATHS.getCountries)
export const getExpTypesReq = () => apiClient.get(PATHS.expTypes)
export const getExpTagsReq = () => apiClient.get(PATHS.expTags)
export const getExpUnicTagsReq = () => apiClient.get(PATHS.expUnicTags)
