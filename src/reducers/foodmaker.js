import {
  GET_FOODMAKER_INFO_REQUESTING,
  GET_FOODMAKER_INFO_SUCCESS,
  GET_FOODMAKER_INFO_ERROR,
} from '../actions/constants'

const initialState = {
  id: '',
  profileName: '',
  email: '',
  newEmail: null,
  role: '',
  reffering: null,
  languages: null,
  userPhoto: null,
  reward: 0,
  notifications: [],
  requesting: false,
  error: '',
  awaitingConfirmation: false,
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOODMAKER_INFO_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_FOODMAKER_INFO_SUCCESS:
      return {
        ...state,
        ...action.data,
        requesting: false,
        error: '',
      }
    case GET_FOODMAKER_INFO_ERROR:
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
