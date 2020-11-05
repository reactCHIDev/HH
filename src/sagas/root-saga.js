import { all } from 'redux-saga/effects'
import signUpUser from './signUpUser'
import login from './login'
import forgot from './forgot'
import account from './account'

export default function* rootSaga() {
  yield all([signUpUser(), login(), forgot(), account()])
}
