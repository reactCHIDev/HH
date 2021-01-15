import { takeEvery } from 'redux-saga/effects'
import {
  toggleFavouriteProduct,
  toggleFavouriteFoodmaker,
  toggleFavouriteShop,
} from 'api/requests/Account'

import { TOGGLE_FAVOURITE } from '../actions/constants'

function* toggleFavouriteSaga(data) {
  const { type, id } = data
  yield console.log(type, id)
}

function* toggleFavouriteWatcher() {
  yield takeEvery(TOGGLE_FAVOURITE, toggleFavouriteSaga)
}

export default toggleFavouriteWatcher
