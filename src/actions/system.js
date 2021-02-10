import {
  GET_PRODUCT_TYPES_REQUESTING,
  GET_SERVICE_TAGS_REQUESTING,
  GET_SPECIALITY_TAGS_REQUESTING,
  GET_PRODUCT_TAGS_REQUESTING,
  GET_CITIES_REQUESTING,
  GET_COUNTRIES_REQUESTING,
  GET_EXP_TYPES_REQUESTING,
  GET_EXP_TAGS_REQUESTING,
} from './constants'

export const getCitiesAC = () => ({
  type: GET_CITIES_REQUESTING,
})

export const getCountriesAC = () => ({
  type: GET_COUNTRIES_REQUESTING,
})

export const getProductTypes = () => ({
  type: GET_PRODUCT_TYPES_REQUESTING,
})

export const getServiceTagsAC = () => ({
  type: GET_SERVICE_TAGS_REQUESTING,
})

export const getSpecialityTagsAC = () => ({
  type: GET_SPECIALITY_TAGS_REQUESTING,
})

export const getProductTagsRequestAC = () => ({
  type: GET_PRODUCT_TAGS_REQUESTING,
})

export const getExpTypesAC = () => ({
  type: GET_EXP_TYPES_REQUESTING,
})

export const getExpTagsAC = () => ({
  type: GET_EXP_TAGS_REQUESTING,
})
