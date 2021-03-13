import { takeEvery, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as jwt from 'jsonwebtoken'
import PATHS from 'api/paths'

import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  GET_USER_BY_NAME,
  SIGNUP_ERROR,
  SIGNUP_FOODMAKER_REQUESTING,
  SIGNUP_FOODMAKER_SUCCESS,
  SIGNUP_FOODMAKER_ERROR,
  SIGNUP_LOVER_AS_MAKER_REQUESTING,
  SIGNUP_LOVER_AS_MAKER_SUCCESS,
  SIGNUP_LOVER_AS_MAKER_ERROR,
} from 'actions/constants'
import {
  getUserByName,
  signUpUser,
  signUpFoodmaker,
  signUpLoverAsFoodmaker,
} from 'api/requests/Auth'

import { loginRequest } from 'actions/login'
import { setItem } from '../utils/localStorage'

function* signUpProcess({ credentials }) {
  try {
    yield signUpUser(credentials)
    yield put({ type: SIGNUP_SUCCESS })
    const loginCreds = {
      email: credentials.email,
      password: credentials.password,
      redirect: 'true',
    }
    yield put(loginRequest(loginCreds))
    yield put(push('/'))
  } catch (error) {
    yield put({ type: SIGNUP_ERROR })
  }
}

function* signUpFoodmakerSaga({ credentials }) {
  const creds = { ...credentials }
  const { email } = creds
  const token = jwt.sign({ email }, process.env.REACT_APP_JWT_SECRET_KEY, { expiresIn: 3600 })
  const { url } = PATHS
  creds.registrationLink = `${url}/${token}`
  try {
    yield signUpFoodmaker(creds)
    yield put({ type: SIGNUP_FOODMAKER_SUCCESS })
    const loginCreds = { email: credentials.email, password: credentials.password }
    yield put(loginRequest(loginCreds))
  } catch (error) {
    yield put({ type: SIGNUP_FOODMAKER_ERROR, error: error.response.data })
  }
}

function* signUpLoverAsFoodmakerSaga({ credentials }) {
  try {
    const { headers } = yield signUpLoverAsFoodmaker(credentials)
    yield put({ type: SIGNUP_LOVER_AS_MAKER_SUCCESS })
    yield setItem('authorization-token', headers.authorization)
  } catch (error) {
    yield put({ type: SIGNUP_LOVER_AS_MAKER_ERROR, error: error.response.data })
  }
}

function* getUserByNameSaga({ name }) {
  try {
    const user = yield getUserByName(name)
    yield put({ type: 'QWEQWE', user: user.data.profileName })
  } catch (error) {
    yield put({ type: SIGNUP_ERROR })
  }
}

export default function* signUp() {
  yield takeEvery(SIGNUP_REQUESTING, signUpProcess)
  yield takeEvery(GET_USER_BY_NAME, getUserByNameSaga)
  yield takeEvery(SIGNUP_FOODMAKER_REQUESTING, signUpFoodmakerSaga)
  yield takeEvery(SIGNUP_LOVER_AS_MAKER_REQUESTING, signUpLoverAsFoodmakerSaga)
}
