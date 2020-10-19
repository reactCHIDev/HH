import { all } from 'redux-saga/effects'
import TestSaga from './test-saga'

export default function* rootSaga() {
  yield all([TestSaga()])
}
