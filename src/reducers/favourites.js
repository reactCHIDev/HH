import { TOGGLE_FAVOURITE } from 'actions/constants'

const initialState = {}

const reducer = function favouritesReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      return state

    default:
      return state
  }
}

export default reducer
