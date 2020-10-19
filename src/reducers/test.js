const initialState = {
  data: '',
}

const reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case 'SET_TEST_DATA':
      return {
        ...state,
        data: payload,
      }

    default:
      return state
  }
}

export default reducer
