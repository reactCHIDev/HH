import { SET_CONNECTION_STATE } from '../actions/constants'

const initialState = {
  isConnected: true,
}

const reducer = function connectionStateReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONNECTION_STATE:
      return {
        ...state,
        isConnected: action.connectionState,
      }

    default:
      return state
  }
}

export default reducer
