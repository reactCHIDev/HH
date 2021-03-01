import { takeEvery } from 'redux-saga/effects'
import {
  toggleFavouriteProductReq,
  toggleFavouriteFoodmakerReq,
  toggleFavouriteShopReq,
  toggleFavouriteExperienceReq,
} from 'api/requests/Foodlover'

import { TOGGLE_FAVOURITE } from '../actions/constants'

function* toggleFavouriteSaga({ data }) {
  const { type, id } = data
  if (type === 'product') yield toggleFavouriteProductReq({ productId: id })
  if (type === 'foodmaker') yield toggleFavouriteFoodmakerReq({ foodmakerId: id })
  if (type === 'shop') yield toggleFavouriteShopReq({ shopId: id })
  if (type === 'exp') yield toggleFavouriteExperienceReq({ id })
}

function* toggleFavouriteWatcher() {
  yield takeEvery(TOGGLE_FAVOURITE, toggleFavouriteSaga)
}

export default toggleFavouriteWatcher
