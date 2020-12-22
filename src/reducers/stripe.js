import {
  GET_STRIPE_TOKEN_REQUESTING,
  GET_STRIPE_TOKEN_SUCCESS,
  GET_STRIPE_TOKEN_ERROR,
} from 'actions/constants'

const initialState = {
  token: '',
  requesting: false,
  success: false,
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STRIPE_TOKEN_REQUESTING:
      return {
        ...state,
        requesting: true,
        success: false,
        error: false,
      }
    case GET_STRIPE_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.token,
        requesting: false,
        error: false,
      }

    case GET_STRIPE_TOKEN_ERROR:
      return {
        ...state,
        requesting: false,
        error: true,
      }

    default:
      return state
  }
}

export default reducer
