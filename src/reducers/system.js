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
  GET_EXP_TYPES_REQUESTING,
  GET_EXP_TYPES_SUCCESS,
  GET_EXP_TYPES_ERROR,
  GET_EXP_TAGS_REQUESTING,
  GET_EXP_TAGS_SUCCESS,
  GET_EXP_TAGS_ERROR, GET_EXP_UNIC_TAGS_REQUESTING, GET_EXP_UNIC_TAGS_SUCCESS, GET_EXP_UNIC_TAGS_ERROR
} from "../actions/constants";

const initialState = {
  productTypes: [],
  serviceTags: [],
  specialityTags: [],
  productTags: [],
  expTypes: [],
  expUnicTags: [],
  cities: [],
  countries: [],
  requesting: false,
  error: '',
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_TYPES_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_PRODUCT_TYPES_SUCCESS:
      return {
        ...state,
        productTypes: action.data,
        requesting: false,
        error: '',
      }
    case GET_PRODUCT_TYPES_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_SERVICE_TAGS_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case GET_SERVICE_TAGS_SUCCESS:
      return {
        ...state,
        serviceTags: action.data,
        requesting: false,
        error: '',
      }

    case GET_SERVICE_TAGS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_SPECIALITY_TAGS_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }

    case GET_SPECIALITY_TAGS_SUCCESS:
      return {
        ...state,
        specialityTags: action.data,
        requesting: false,
        error: '',
      }

    case GET_SPECIALITY_TAGS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case GET_PRODUCT_TAGS_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_PRODUCT_TAGS_SUCCESS:
      return {
        ...state,
        productTags: action.data,
        requesting: false,
        error: '',
      }
    case GET_PRODUCT_TAGS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case GET_CITIES_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.data,
        requesting: false,
        error: '',
      }
    case GET_CITIES_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case GET_COUNTRIES_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.data,
        requesting: false,
        error: '',
      }
    case GET_COUNTRIES_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case GET_EXP_TYPES_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_EXP_TYPES_SUCCESS:
      return {
        ...state,
        expTypes: action.data,
        requesting: false,
        error: '',
      }
    case GET_EXP_TYPES_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case GET_EXP_TAGS_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_EXP_TAGS_SUCCESS:
      return {
        ...state,
        expTags: action.data,
        requesting: false,
        error: '',
      }
    case GET_EXP_TAGS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_EXP_UNIC_TAGS_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_EXP_UNIC_TAGS_SUCCESS:
      return {
        ...state,
        expUnicTags: action.data,
        requesting: false,
        error: '',
      }
    case GET_EXP_UNIC_TAGS_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }


    default:
      return state
  }
}

export default reducer
