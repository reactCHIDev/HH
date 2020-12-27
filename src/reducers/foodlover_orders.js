import {
  GET_FOODLOVER_ORDERS_REQUESTING,
  GET_FOODLOVER_ORDERS_SUCCESS,
  GET_FOODLOVER_ORDERS_ERROR,
} from '../actions/constants'

const mockData = [
  {
    id: '113213',
    shopName: 'Annett’s fairytale shop',
    items: 3,
    amount: '164',
    delivery: 'express',
    status: 'delivered',
    date: 'Jul, 25',
    time: '10:25',
    deliveryPrice: '20.00',
    orderInfo: [
      {
        id: '3123123',
        productName: 'Pie with carrots, apple and cinnamon',
        quantity: 3,
        price: '24.00',
        total: '72.00',
      },
      {
        id: '43534543',
        productName: 'Pie with carrots, apple and cinnamon',
        quantity: 1,
        price: '24.00',
        total: '24.00',
      },
      {
        id: '7897887',
        productName: 'Pie with carrots, apple and cinnamon',
        quantity: 2,
        price: '24.00',
        total: '48.00',
      },
    ],
    foodmakerInfo: {
      id: '32322',
      name: 'Annette P',
      info:
        'I’m a nutritionist ,and baking cooking instructor. When I was younger I went to England for a year.',
      description: 'Your foodmaker',
    },
  },
  {
    id: '113322',
    shopName: 'Annett’s fairytale shop',
    items: 2,
    amount: '126',
    delivery: 'free',
    status: 'delivered',
    date: 'Jul, 30',
    time: '10:00',
    deliveryPrice: '30.00',
    orderInfo: [
      {
        id: '3123123',
        productName: 'Pie with carrots, apple and cinnamon',
        quantity: 3,
        price: '24.00',
        total: '72.00',
      },
      {
        id: '43534543',
        productName: 'Pie with carrots, apple and cinnamon',
        quantity: 1,
        price: '24.00',
        total: '24.00',
      },
    ],
    foodmakerInfo: {
      id: '32322',
      name: 'Annette P',
      info:
        'I’m a nutritionist ,and baking cooking instructor. When I was younger I went to England for a year.',
      description: 'Your foodmaker',
    },
  },
  {
    id: '111122',
    shopName: 'Annett’s fairytale shop',
    items: 1,
    amount: '112',
    delivery: 'free',
    status: 'delivered',
    date: 'Jul, 1',
    time: '20:00',
    deliveryPrice: '40.00',
    orderInfo: [
      {
        id: '3123123',
        productName: 'Pie with carrots, apple and cinnamon',
        quantity: 3,
        price: '24.00',
        total: '72.00',
      },
    ],
    foodmakerInfo: {
      id: '32322',
      name: 'Annette P',
      info:
        'I’m a nutritionist ,and baking cooking instructor. When I was younger I went to England for a year.',
      description: 'Your foodmaker',
    },
  },
]

const initialState = {
  requesting: false,
  eroror: '',
  orders: mockData,
}

const reducer = function foodloverReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FOODLOVER_ORDERS_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: '',
      }
    case GET_FOODLOVER_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.data,
        requesting: false,
      }
    case GET_FOODLOVER_ORDERS_ERROR:
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
