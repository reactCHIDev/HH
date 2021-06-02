import cloneDeep from 'lodash/cloneDeep'
import { getItem, setItem } from 'utils/localStorage'
import {
  ADD_ITEM_TO_ORDER,
  ADD_PRODUCT_TO_BASKET,
  CHANGE_DELIVERY_TYPE,
  CLEAR_CART,
  CREATE_ORDER_SUCCESS,
  DELETE_ITEM_FROM_PRODUCTS,
  DELETE_PRODUCT_AND_SHOP_FROM_LIST,
  DELETE_PRODUCT_FROM_LIST,
  SET_ITEM_IN_ORDERS,
  SET_ITEM_TO_PRODUCTS,
  SET_SHOP_DATA,
  UPDATE_CART,
} from '../actions/constants'

const initialState = {
  products: getItem('cart')?.products || [],
  shopsData: getItem('cart')?.shopsData || {},
  orders: getItem('cart')?.orders || {},
  totalPrice: getItem('cart')?.totalPrice || 0,
  isRequesting: false,
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
  if (newState.products.length === 0) {
    newState.totalPrice = 0
  }
  setItem('cart', newState)
  return newState
}

const deleteDataAfterError = (state, elementToDelete) => {
  const stateAfterDelete = cloneDeep(state)
  stateAfterDelete.isRequesting = false
  stateAfterDelete.products.pop()
  stateAfterDelete.totalPrice =
    stateAfterDelete.totalPrice -
    stateAfterDelete.shopsData[elementToDelete].price -
    stateAfterDelete.shopsData[elementToDelete].delivery.price
  delete stateAfterDelete.shopsData[elementToDelete]
  setItem('cart', stateAfterDelete)
  return stateAfterDelete
}

const totalPriceCounter = (state) => {
  newState = cloneDeep(state)
  newState.totalPrice = Object.values(newState.shopsData).reduce(
    (c, p) => c + (p.price + p.delivery.price),
    0,
  )
  setItem('cart', newState)
  return newState
}

const reducer = function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      newState = {
        ...state,
        isRequesting: true,
      }
      setItem('cart', newState)
      return newState

    case SET_ITEM_TO_PRODUCTS:
      newState = {
        ...state,
        products: state.products.concat(action.id),
      }
      setItem('cart', newState)
      return newState

    case DELETE_ITEM_FROM_PRODUCTS:
      newState = {
        ...state,
        products: state.products.filter((element) => element !== action.data.id),
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
        isRequesting: false,
      }
      return gc(newState)

    case SET_ITEM_IN_ORDERS:
      newState = {
        ...state,
        orders: action.newState,
        isRequesting: false,
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
        isRequesting: false,
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

    case DELETE_PRODUCT_FROM_LIST:
      newState = {
        ...state,
        products: state.products.filter((element) => element !== action.id),
        isRequesting: false,
      }
      setItem('cart', newState)
      return newState

    case DELETE_PRODUCT_AND_SHOP_FROM_LIST:
      return deleteDataAfterError(state, action.data.shopTitle)

    case CLEAR_CART:
      return {
        ...state,
        ...initialState,
      }

    case UPDATE_CART:
      newState = {
        ...action.data.newState,
        shopsData: {
          ...action.data.newState.shopsData,
          [action.data.shop]: {
            ...action.data.newState.shopsData[action.data.shop],
            price: Object.values(action.data.newState.orders[action.data.shop]).reduce(
              (c, p) => c + p.totalPrice,
              0,
            ),
          },
        },
        totalPrice: Object.values(action.data.newState.shopsData).reduce(
          (c, p) => c + (p.price + p.delivery.price),
          0,
        ),
      }
      return totalPriceCounter(newState)

    default:
      return state
  }
}

export default reducer
