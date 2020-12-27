import {
  GET_BILLING_HISTORY_REQUESTING,
  GET_BILLING_HISTORY_SUCCESS,
  GET_BILLING_HISTORY_ERROR,
} from '../actions/constants'

const mockdata = [
  {
    id: '113212',
    date: 'Jul, 23',
    status: 'Successful',
    amount: '$112.6',
    method: 'VISA *4383',
  },
  {
    id: '113212',
    date: 'Jul, 25',
    status: 'Successful',
    amount: '$212.6',
    method: 'VISA *4733',
  },
  {
    id: '113212',
    date: 'Jul, 27',
    status: 'In Progress',
    amount: '$312.6',
    method: 'VISA *8756',
  },
]

const initialState = {
  requesting: false,
  eroror: '',
  orders: mockdata,
}

const reducer = function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BILLING_HISTORY_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_BILLING_HISTORY_SUCCESS:
      return {
        ...state,
        orders: action.data,
        requesting: false,
      }
    case GET_BILLING_HISTORY_ERROR:
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
