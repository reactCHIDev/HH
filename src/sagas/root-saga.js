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
  ])
}
