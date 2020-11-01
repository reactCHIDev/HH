const initialState = {
  requesting: false,
  error: false,
}

const reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case 'SIGNUP_REQUESTING':
      return {
        ...state,
        requesting: true,
        error: false,
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        requesting: false,
      }

    case 'SIGNUP_ERROR':
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
