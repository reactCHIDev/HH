/* eslint-disable no-param-reassign */
import {
  ADD_PRODUCT_TO_BASKET,
  SET_ITEM_TO_PRODUCTS,
  DELETE_ITEM_FROM_PRODUCTS,
  SET_SHOP_TO_SHOPS,
  SET_ITEM_IN_ORDERS,
} from '../actions/constants'

const initialState = {
  shops: [],
  products: [],
  orders: {},
}

const gc = (state) => {
  const shopToDelete = Object.keys(state.orders).find((key) => state.orders[key].length === 0)

  state.shops = state.shops.filter((i) => i !== shopToDelete)
  delete state.orders[shopToDelete]

  return state
}

const reducer = function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET:
      return {
        ...state,
      }

    case SET_SHOP_TO_SHOPS:
      return {
        ...state,
        shops: state.shops.concat(action.shop.title),
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
          [action.data.shop.title]: state.orders[action.data.shop.title].filter(
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

    default:
      return state
  }
}

export default reducer
