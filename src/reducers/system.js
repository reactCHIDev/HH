import {
  GET_SPECIALITY_TAGS_REQUESTING,
  GET_SPECIALITY_TAGS_SUCCESS,
  GET_SPECIALITY_TAGS_ERROR,
} from '../actions/constants'

const initialState = {}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state
  }
}

export default reducer
