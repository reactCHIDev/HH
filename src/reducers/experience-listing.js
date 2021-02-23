import {
  GET_MY_EXPERIENCES_LIST_REQUESTING,
  GET_MY_EXPERIENCES_LIST_SUCCESS,
  GET_MY_EXPERIENCES_LIST_ERROR,
  GET_EXPERIENCE_BY_DATE_REQUESTING,
  GET_EXPERIENCE_BY_DATE_SUCCESS,
  GET_EXPERIENCE_BY_DATE_ERROR,
} from '../actions/constants'

const initialState = {
  myExperiences: [],
  monthExperiences: [],
  requesting: false,
  error: '',
}

const reducer = function experiencesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_EXPERIENCES_LIST_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_MY_EXPERIENCES_LIST_SUCCESS:
      return {
        ...state,
        myExperiences: action.data,
        requesting: false,
        error: '',
      }
    case GET_MY_EXPERIENCES_LIST_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }
    case GET_EXPERIENCE_BY_DATE_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_EXPERIENCE_BY_DATE_SUCCESS:
      return {
        ...state,
        monthExperiences: action.payload,
        requesting: false,
        error: '',
      }
    case GET_EXPERIENCE_BY_DATE_ERROR:
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
