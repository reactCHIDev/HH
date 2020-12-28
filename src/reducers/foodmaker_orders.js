import {
  GET_FOODMAKER_ORDERS_REQUESTING,
  GET_FOODMAKER_ORDERS_SUCCESS,
  GET_FOODMAKER_ORDERS_ERROR,
} from '../actions/constants'

const mockdata = [
  {
    id: '113212',
    productName: 'Pie with carrots, apple and cinnamon',
    items: 1,
    amount: 143,
    price: '$ 24.20',
    delivery: 'Standart',
    status: 'Delivered',
    date: 'Jul, 23',
    time: '10:25',
    client: 'Sasha',
    clientNumber: '+232323232',
    clientAddress: '36 Sin mig Industrial Est Sector A',
    total: '$212.6',
    paymentMethod: 'VISA - CREDIT CARD',
    priceOption: 'Refund',
    payment: 'VISA *4383 JUL, 25 10:25',
  },
  {
    id: '113213',
    productName: 'Pie with carrots, apple and cinnamon',
    items: 2,
    amount: 243,
    price: '$ 34.20',
    delivery: 'Express',
    status: 'Shipped',
    date: 'Jul, 24',
    time: '11:25',
    client: 'Masha',
    clientNumber: '+432342423',
    clientAddress: '36 Sin mig Industrial Est Sector A',
    total: '$312.6',
    paymentMethod: 'VISA - CREDIT CARD',
    priceOption: 'Refund',
    payment: 'VISA *4383 JUL, 26 10:25',
  },
  {
    id: '113215',
    productName: 'Pie with carrots, apple and cinnamon',
    items: 3,
    amount: 343,
    price: '$ 44.20',
    delivery: 'Free',
    status: 'Delivered',
    date: 'Jul, 25',
    time: '12:25',
    client: 'Pasha',
    clientNumber: '+42424342',
    clientAddress: '36 Sin mig Industrial Est Sector A',
    total: '$412.6',
    paymentMethod: 'VISA - CREDIT CARD',
    priceOption: 'Refund',
    payment: 'VISA *4383 JUL, 27 10:25',
  },
]

const initialState = {
  requesting: false,
  eroror: '',
  orders: mockdata,
}

const reducer = function foodmakerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOODMAKER_ORDERS_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_FOODMAKER_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.data,
        requesting: false,
      }
    case GET_FOODMAKER_ORDERS_ERROR:
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
