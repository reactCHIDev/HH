import cloneDeep from 'lodash/cloneDeep'
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
  products: [],
  shopsData: {},
  orders: {},
  totalPrice: 0,
}

const gc = (state) => {
  const shopToDelete = Object.keys(state.orders).find((key) => state.orders[key].length === 0)
  const newState = cloneDeep(state)
  if (shopToDelete) {
    newState.totalPrice =
      newState.totalPrice -
      newState.shopsData[shopToDelete].price -
      newState.shopsData[shopToDelete].delivery.price
    delete newState.orders[shopToDelete]
    delete newState.shopsData[shopToDelete]
  }
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
            delivery: {
              type: action.data.delivery.type,
              price: action.data.delivery.price,
            },
          },
        },
        totalPrice: state.totalPrice + action.data.price + action.data.delivery.price,
      }

    case INC_PRODUCT_AMOUNT:
      return {
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

    case DEC_PRODUCT_AMOUNT:
      return {
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

    case CHANGE_DELIVERY_TYPE:
      return {
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

    case ADD_ITEM_TO_ORDER:
      return {
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

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        products: [],
        shopsData: {},
        orders: {},
        totalPrice: 0,
      }

    default:
      return state
  }
}

export default reducer
