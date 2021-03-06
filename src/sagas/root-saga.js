import { all } from 'redux-saga/effects'
import signUpUser from './signUpUser'
import login from './login'
import forgot from './forgot'
import account from './account'
import listing from './listing'
import product from './product'
import foodmaker from './foodmaker'
import system from './system'
import shop from './shop'
import pages from './pages'
import cart from './cart'
import foodmakerOrders from './foodmaker_orders'
import foodloverOrders from './foodlover_orders'
import stripe from './stripe'
import billingHistory from './billing_history'
import order from './order'
import admin from './admin'
import toggleFavourite from './favourites'
import search from './search'
import chat from './chat'
import files from './files'
import experience from './experience'
import reviews from './reviews'
import fmBookingHistoryWatcher from './bookings_history'
import expListing from './experiences_listing'
import expReviews from './experiences_reviews'
import bookmarks from './bookmarks'

export default function* rootSaga() {
  yield all([
    signUpUser(),
    login(),
    forgot(),
    account(),
    listing(),
    product(),
    foodmaker(),
    system(),
    shop(),
    pages(),
    cart(),
    foodmakerOrders(),
    foodloverOrders(),
    stripe(),
    billingHistory(),
    order(),
    admin(),
    toggleFavourite(),
    search(),
    chat(),
    files(),
    experience(),
    reviews(),
    fmBookingHistoryWatcher(),
    expListing(),
    expReviews(),
    bookmarks(),
  ])
}
