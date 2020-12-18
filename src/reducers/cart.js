import cloneDeep from 'lodash/cloneDeep'
import {
  ADD_PRODUCT_TO_BASKET,
  SET_ITEM_TO_PRODUCTS,
  DELETE_ITEM_FROM_PRODUCTS,
  SET_ITEM_IN_ORDERS,
  SET_SHOP_DATA,
  INC_PRODUCT_AMOUNT,
  DEC_PRODUCT_AMOUNT,
} from '../actions/constants'

const initialState = {
  products: [],
  shopsData: {},
  orders: {},
  totalPrice: 0,
}

const gc = (state) => {
  const shopToDelete = Object.keys(state.orders).find((key) => state.orders[key].length === 0)
  const newState = cloneDeep(state)
  newState.totalPrice -= newState.shopsData[shopToDelete].price
  delete newState.orders[shopToDelete]
  delete newState.shopsData[shopToDelete]
  return newState
}

const reducer = function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      return {
        ...state,
      }

    case SET_ITEM_TO_PRODUCTS:
      return {
        ...state,
        products: state.products.concat(action.title),
      }
    case DELETE_ITEM_FROM_PRODUCTS:
      const newState = {
        ...state,
        products: state.products.filter((element) => element !== action.data.title),
        orders: {
          ...state.orders,
          [action.data.shopTitle]: state.orders[action.data.shopTitle].filter(
            (e) => e.title !== action.data.title,
          ),
        },
      }
      return gc(newState)

    case SET_ITEM_IN_ORDERS:
      return {
        ...state,
        orders: action.newState,
      }

    case SET_SHOP_DATA:
      return {
        ...state,
        shopsData: {
          ...state.shopsData,
          [action.data.shopTitle]: {
            methods: action.data.deliveryMethods,
            price: action.data.price,
          },
        },
        totalPrice: state.totalPrice + action.data.price,
      }

    case INC_PRODUCT_AMOUNT:
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.data.shop]: state.orders[action.data.shop].map((item) =>
            item.id === action.data.id ? { ...item, total: item.total + 1 } : item,
          ),
        },
        shopsData: {
          ...state.shopsData,
          [action.data.shop]: {
            ...state.shopsData[action.data.shop],
            price: state.shopsData[action.data.shop].price + action.data.price,
          },
        },
        totalPrice: state.totalPrice + action.data.price,
      }

    case DEC_PRODUCT_AMOUNT:
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.data.shop]: state.orders[action.data.shop].map((item) =>
            item.id === action.data.id ? { ...item, total: item.total - 1 } : item,
          ),
        },
        shopsData: {
          ...state.shopsData,
          [action.data.shop]: {
            ...state.shopsData[action.data.shop],
            price: state.shopsData[action.data.shop].price - action.data.price,
          },
        },
        totalPrice: state.totalPrice - action.data.price,
      }

    default:
      return state
  }
}

export default reducer
