const initialState = false

const reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case 'SIGNUP_REQUESTING':
      return false

    default:
      return state
  }
}

export default reducer
