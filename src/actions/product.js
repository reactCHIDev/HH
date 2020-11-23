import {
  CREATE_PRODUCT_REQUESTING,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_PRODUCT_INFO_REQUESTING,
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_ERROR,
  GET_PRODUCT_TAGS_REQUESTING,
  GET_PRODUCT_TAGS_SUCCESS,
  GET_PRODUCT_TAGS_ERROR,
} from './constants'

export const createProductRequestAC = (payload) => ({
  type: CREATE_PRODUCT_REQUESTING,
  payload,
})

export const createProductSuccess = () => ({
  type: CREATE_PRODUCT_SUCCESS,
})

export const createProductError = (error) => ({
  type: CREATE_PRODUCT_ERROR,
  error,
})

export const getProductInfoRequestAC = (id) => ({
  type: GET_PRODUCT_INFO_REQUESTING,
  id,
})

export const getProductInfoSuccess = () => ({
  type: GET_PRODUCT_INFO_SUCCESS,
})

export const getProductInfoError = (error) => ({
  type: GET_PRODUCT_INFO_ERROR,
  error,
})

export const getProductTagsRequestAC = () => ({
  type: GET_PRODUCT_TAGS_REQUESTING,
})

export const getProductTagsSuccess = () => ({
  type: GET_PRODUCT_TAGS_SUCCESS,
})

export const getProductTagsError = (error) => ({
  type: GET_PRODUCT_TAGS_ERROR,
  error,
})
