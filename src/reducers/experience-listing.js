import {
  GET_MY_EXPERIENCES_LIST_REQUESTING,
  GET_MY_EXPERIENCES_LIST_SUCCESS,
  GET_MY_EXPERIENCES_LIST_ERROR,
  TOGGLE_EXPERIENCE_STATUS_ERROR,
} from '../actions/constants'

const initialState = {
  myExperiences: [],
  requesting: false,
  error: '',
  counter: 0,
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
        myExperiences: action.data.experiences,
        counter: action.data.counter,
        requesting: false,
        error: '',
      }
    case GET_MY_EXPERIENCES_LIST_ERROR:
      return {
        ...state,
        requesting: false,
        error: action.error,
      }

    case TOGGLE_EXPERIENCE_STATUS_ERROR:
      return {
        ...state,
        error: action.error,
      }

    default:
      return state
  }
}

export default reducer
