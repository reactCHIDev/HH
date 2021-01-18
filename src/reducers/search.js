import {
  SEARCH_REQUESTING,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  CLEAR_SEARCH_DATA,
} from 'actions/constants'

const initialState = {
  data: [],
  requesting: false,
  success: false,
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUESTING:
      return {
        ...state,
        requesting: true,
        success: false,
        error: false,
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        data: action.searchedData,
        requesting: false,
        error: false,
      }

    case SEARCH_ERROR:
      return {
        ...state,
        requesting: false,
        error: true,
      }

    case CLEAR_SEARCH_DATA:
      return {
        ...state,
        data: [],
      }

    default:
      return state
  }
}

export default reducer
