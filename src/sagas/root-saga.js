import { all } from 'redux-saga/effects'
import signUpUser from './signUpUser'
import login from './login'
import forgot from './forgot'
import TestSaga from './test-saga'

export default function* rootSaga() {
  yield all([TestSaga(), signUpUser(), login(), forgot()])
}
