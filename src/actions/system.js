import {
  GET_PRODUCT_TYPES_REQUESTING,
  GET_PRODUCT_TYPES_SUCCESS,
  GET_PRODUCT_TYPES_ERROR,
  GET_SERVICE_TAGS_REQUESTING,
  GET_SERVICE_TAGS_SUCCESS,
  GET_SERVICE_TAGS_ERROR,
  GET_SPECIALITY_TAGS_REQUESTING,
  GET_SPECIALITY_TAGS_SUCCESS,
  GET_SPECIALITY_TAGS_ERROR,
  GET_PRODUCT_TAGS_REQUESTING,
  GET_PRODUCT_TAGS_SUCCESS,
  GET_PRODUCT_TAGS_ERROR,
  GET_CITIES_REQUESTING,
  GET_CITIES_SUCCESS,
  GET_CITIES_ERROR,
  GET_COUNTRIES_REQUESTING,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR,
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

/* export const getProductTypesSuccess = () => ({
  type: GET_PRODUCT_TYPES_SUCCESS,
})

export const getProductTypesError = (error) => ({
  type: GET_PRODUCT_TYPES_ERROR,
  error,
}) */

export const getServiceTagsAC = () => ({
  type: GET_SERVICE_TAGS_REQUESTING,
})

/* export const getServiceTagsSuccessAC = (payload) => ({
  type: GET_SERVICE_TAGS_SUCCESS,
  payload,
})

export const getServiceTagsErrorAC = (payload) => ({
  type: GET_SERVICE_TAGS_ERROR,
  payload,
}) */

export const getSpecialityTagsAC = () => ({
  type: GET_SPECIALITY_TAGS_REQUESTING,
})

/* export const getSpecialityTagsSuccessAC = (payload) => ({
  type: GET_SPECIALITY_TAGS_SUCCESS,
  payload,
})

export const getSpecialityTagsErrorAC = (payload) => ({
  type: GET_SPECIALITY_TAGS_ERROR,
  payload,
}) */

export const getProductTagsRequestAC = () => ({
  type: GET_PRODUCT_TAGS_REQUESTING,
})

/* export const getProductTagsSuccess = () => ({
  type: GET_PRODUCT_TAGS_SUCCESS,
})

export const getProductTagsError = (error) => ({
  type: GET_PRODUCT_TAGS_ERROR,
  error,
}) */
