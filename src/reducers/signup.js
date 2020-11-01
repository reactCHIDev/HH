const initialState = {
  error: false,
}

const reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case 'SIGNUP_REQUESTING':
      return {
        ...state,
        error: true,
      }

    case 'SIGNUP_ERROR':
      return {
        ...state,
        error: false,
      }

    case 'USER':
      return {
        ...state,
        error: false,
      }

    default:
      return state
  }
}

export default reducer
