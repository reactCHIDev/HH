import cloneDeep from 'lodash/cloneDeep'
import { setItem, getItem } from 'utils/localStorage'
import {
  ADD_PRODUCT_TO_BASKET,
  SET_ITEM_TO_PRODUCTS,
  DELETE_ITEM_FROM_PRODUCTS,
  SET_ITEM_IN_ORDERS,
  SET_SHOP_DATA,
  INC_PRODUCT_AMOUNT,
  DEC_PRODUCT_AMOUNT,
  CHANGE_DELIVERY_TYPE,
  ADD_ITEM_TO_ORDER,
  CREATE_ORDER_SUCCESS,
} from '../actions/constants'

const initialState = {
  products: getItem('cart')?.products || [],
  shopsData: getItem('cart')?.shopsData || {},
  orders: getItem('cart')?.orders || {},
  totalPrice: getItem('cart')?.totalPrice || 0,
}

let newState = {}

const gc = (state) => {
  const shopToDelete = Object.keys(state.orders).find((key) => state.orders[key].length === 0)
  newState = cloneDeep(state)
  if (shopToDelete) {
    newState.totalPrice =
      newState.totalPrice -
      newState.shopsData[shopToDelete].price -
      newState.shopsData[shopToDelete].delivery.price
    delete newState.orders[shopToDelete]
    delete newState.shopsData[shopToDelete]
  }
  setItem('cart', newState)
  return newState
}

const reducer = function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      newState = {
        ...state,
      }
      setItem('cart', newState)
      return newState

    case SET_ITEM_TO_PRODUCTS:
      newState = {
        ...state,
        products: state.products.concat(action.title),
      }
      setItem('cart', newState)
      return newState

    case DELETE_ITEM_FROM_PRODUCTS:
      newState = {
        ...state,
        products: state.products.filter((element) => element !== action.data.title),
        orders: {
          ...state.orders,
          [action.data.shopTitle]: state.orders[action.data.shopTitle].filter(
            (e) => e.title !== action.data.title,
          ),
        },
        shopsData: {
          ...state.shopsData,
          [action.data.shopTitle]: {
            ...state.shopsData[action.data.shopTitle],
            price: state.shopsData[action.data.shopTitle].price - action.data.price,
          },
        },
        totalPrice: state.totalPrice - action.data.price,
      }
      return gc(newState)

    case SET_ITEM_IN_ORDERS:
      newState = {
        ...state,
        orders: action.newState,
      }
      setItem('cart', newState)
      return newState

    case SET_SHOP_DATA:
      newState = {
        ...state,
        shopsData: {
          ...state.shopsData,
          [action.data.shopTitle]: {
            methods: action.data.deliveryMethods,
            price: action.data.price,
            delivery: {
              type: action.data.delivery.type,
              price: action.data.delivery.price,
            },
          },
        },
        totalPrice: state.totalPrice + action.data.price + action.data.delivery.price,
      }
      setItem('cart', newState)
      return newState

    case INC_PRODUCT_AMOUNT:
      newState = {
        ...state,
        orders: {
          ...state.orders,
          [action.data.shop]: state.orders[action.data.shop].map((item) =>
            item.id === action.data.id
              ? { ...item, total: item.total + 1, totalPrice: item.totalPrice + action.data.price }
              : item,
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
      setItem('cart', newState)
      return newState

    case DEC_PRODUCT_AMOUNT:
      newState = {
        ...state,
        orders: {
          ...state.orders,
          [action.data.shop]: state.orders[action.data.shop].map((item) =>
            item.id === action.data.id
              ? { ...item, total: item.total - 1, totalPrice: item.totalPrice - action.data.price }
              : item,
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
      setItem('cart', newState)
      return newState

    case CHANGE_DELIVERY_TYPE:
      newState = {
        ...state,
        shopsData: {
          ...state.shopsData,
          [action.data.shop]: {
            ...state.shopsData[action.data.shop],
            delivery: {
              type: action.data.type,
              price: action.data.price,
            },
          },
        },
        totalPrice:
          state.totalPrice - state.shopsData[action.data.shop].delivery.price + action.data.price,
      }
      setItem('cart', newState)
      return newState

    case ADD_ITEM_TO_ORDER:
      newState = {
        ...state,
        shopsData: {
          ...state.shopsData,
          [action.data.shop]: {
            ...state.shopsData[action.data.shop],
            price: state.shopsData[action.data.shop].price + action.data.price,
          },
        },
        totalPrice: state.totalPrice + action.data.price,
      }
      setItem('cart', newState)
      return newState

    case CREATE_ORDER_SUCCESS:
      newState = {
        ...state,
        products: [],
        shopsData: {},
        orders: {},
        totalPrice: 0,
      }
      setItem('cart', newState)
      return newState

    default:
      setItem('cart', state)
      return state
  }
}

export default reducer
