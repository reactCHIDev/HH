import React, { useState, useRef, useEffect } from 'react'
import T from 'prop-types'

import { connect } from 'react-redux'
import _ from 'lodash/fp'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as jwt from 'jsonwebtoken'

import { getUserByEmail } from 'api/requests/Auth'
import { getUserAccount, updateAccount, resetConfirmation } from 'actions/account'
import { invalidLink } from 'actions/login'

import { logout } from 'actions/login'
import Modal from 'components/UniversalModal'
import Tint from 'components/Tint'
import Error from 'components/Error'
import { emailConfirm } from 'actions/account'
import { push, replace } from 'connected-react-router'

import EditIcon from 'assets/icons/svg/editor-icon.svg'
import check from 'assets/icons/svg/check.svg'
import ChkBox from 'components/ChkBox'
import CheckMail from './components/CheckMail'
import PATHS from 'api/paths'

import styles from './settings.module.scss'
import './settings.less'

const Settings = ({
  userData,
  getUserAccount,
  updateAccount,
  resetConfirmation,
  logout,
  invalidLink,
  authorized,
  url,
}) => {
  const [emailDisabled, setEmailDisabled] = useState(true)
  const [phoneDisabled, setPhoneDisabled] = useState(true)

  const { awaitingConfirmation, requesting, error } = userData

  const { confirmation } = useParams()

  console.log('confirmation', confirmation)

  const isСhangeMailRoute = confirmation.substring(0, 12) === 'change_email'
  // console.log('%c   url   ', 'color: white; background: salmon;', url)
  console.log('%c    isСhangeMailRoute  ', 'color: white; background: salmon;', isСhangeMailRoute)

  if (isСhangeMailRoute) {
    const token = confirmation.substring(12)

    console.log('%c   ChangeEmail process   ', 'color: darkgreen; background: palegreen;')

    const jwtData = token ? jwt.decode(token, process.env.REACT_APP_JWT_SECRET_KEY) : null
    const valid = jwtData ? new Date().getTime() < new Date(jwtData?.exp * 1000) : true

    console.log('%c   valid   ', 'color: white; background: salmon;', valid)
    console.log('%c   jwtData   ', 'color: white; background: salmon;', jwtData)
    console.log('%c   authorized   ', 'color: white; background: salmon;', authorized)
    console.log('%c   PATHS.url + url   ', 'color: white; background: salmon;', PATHS.url + url)
    console.log('%c   newEmail  ', 'color: white; background: salmon;', jwtData.newEmail)
    if (!valid) {
      invalidLink()
    }

    if (valid && authorized) {
      const payload = {
        updateEmailLink: PATHS.url + url,
        newEmail: jwtData.newEmail,
      }
      console.log('payload', payload)
      emailConfirm(payload)
    }

    replace('/settings/account')
  }

  const mailEl = useRef()
  const phoneEl = useRef()
  const chkBoxEl = useRef()

  useEffect(() => {
    getUserAccount()
  }, [])

  useEffect(() => {
    if (userData && userData.notifications)
      chkBoxEl.current.checked = userData.notifications.includes('email') ? 'checked' : ''
    if (userData.notifications.length === 1) chkBoxEl.current.disabled = 'disabled'
  }, [userData])

  useEffect(() => {
    mailEl.current.focus()
    phoneEl.current.focus()
  }, [emailDisabled, phoneDisabled])

  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onBlur',
  })

  const toggleEmailEdit = () => {
    setEmailDisabled(false)
    mailEl.current.focus()
  }
  const togglePhoneEdit = () => {
    setPhoneDisabled(false)
    phoneEl.current.focus()
  }

  const modalClose = () => {
    resetConfirmation()
  }

  const onSubmit = (credentials) => {}

  const onApply = (data) => {
    const formData = {}

    if (data.email) formData.newEmail = data.email
    if (data.phone) formData.phone = data.phone
    if (data.newPassword) {
      formData.oldPassword = data.oldPassword
      formData.newPassword = data.newPassword
    }

    if (Object.keys(formData).length) {
      console.log('%c   formData   ', 'color: white; background: salmon;', formData)
      updateAccount(formData)
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.info_section}>
        <div className={styles.header_section}>
          <div className={styles.content}>Info</div>
        </div>
        <div className={styles.input_section}>
          <div className={styles.content}>
            <p className={styles.label}>Contact e-mail</p>
            <div className={styles.input_wrapper}>
              <input
                className={styles.input_name}
                name="email"
                placeholder={userData.email || ' '}
                type="text"
                disabled={emailDisabled}
                ref={(el) => {
                  register(el, {
                    validate: async (value) => {
                      if (value) {
                        const name = await getUserByEmail(value.replace('@', '%40'))
                        return !name.data?.email
                      }
                    },
                    required: false,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })
                  mailEl.current = el
                }}
              />{' '}
              <div className={styles.verificated}>
                <img className={styles.check} src={check} alt="checked" />
                VERIFICATED
              </div>
            </div>
            {_.get('email.type', errors) === 'pattern' && (
              <p className={styles.errmsg}>Invalid e-mail adress</p>
            )}
            {_.get('email.type', errors) === 'validate' && (
              <p className={styles.errmsg}>E-mail adress already exist</p>
            )}
          </div>
          <div className={styles.edit_icon} onClick={toggleEmailEdit}>
            <img className={styles.edit_btn} src={EditIcon} alt="editEmail" />
          </div>
        </div>
        <div className={styles.input_section}>
          <div className={styles.content}>
            <p className={styles.label}>Contact phone</p>
            <div className={styles.input_wrapper}>
              <input
                className={styles.input_name}
                name="phone"
                placeholder={userData.phone || ' '}
                type="text"
                disabled={phoneDisabled}
                ref={(el) => {
                  register(el, {
                    required: false,
                    pattern: {
                      value: /([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/,
                      message: 'Invalid name symbols',
                    },
                  })
                  phoneEl.current = el
                }}
              />
            </div>
            {_.get('phone.type', errors) === 'pattern' && (
              <p className={styles.errmsg}>Invalid phone number</p>
            )}
          </div>
          <div className={styles.edit_icon} onClick={togglePhoneEdit}>
            <img className={styles.edit_btn} src={EditIcon} alt="editPhone" />
          </div>
        </div>
        <div className={styles.header_section}>
          <div className={styles.content}>Notification</div>
        </div>
        <div className={styles.bottom_section}>
          <div className={styles.content_bottom}>
            <ChkBox
              name="by_email"
              key="notification"
              labelText="To e-mail"
              register={(el) => {
                register(el)
                chkBoxEl.current = el
              }}
            />
          </div>
        </div>
      </section>
      <section className={styles.change_section}>
        <div className={styles.header_section}>
          <div className={styles.content}>Change password</div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onApply)}>
          <label className={styles.label}>Current password</label>
          <input
            name="oldPassword"
            ref={register({
              required: false,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
              },
            })}
          />
          {_.get('oldPassword.type', errors) === 'required' && <p>This field is required</p>}
          {_.get('oldPassword.type', errors) === 'pattern' && (
            <p>Letters, numbers, length 8 symbols</p>
          )}
          <label className={styles.label}>New password</label>
          <input
            name="newPassword"
            ref={register({
              required: false,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
              },
            })}
          />
          {_.get('newPassword.type', errors) === 'required' && <p>This field is required</p>}
          {_.get('newPassword.type', errors) === 'pattern' && (
            <p>Letters, numbers, length 8 symbols</p>
          )}

          <label className={styles.label}>Confirm password</label>
          <input
            name="confirm"
            ref={register({
              validate: (value) => value === watch('newPassword'),
            })}
          />
          {_.get('confirm.type', errors) === 'required' && <p>This field is required</p>}
          {_.get('confirm.type', errors) === 'validate' && <p>Passwords don't match</p>}

          <input type="submit" value="APPLY" />
        </form>
      </section>
      {requesting && <Tint />}
      {awaitingConfirmation && (
        <Modal closeFunc={modalClose} mode="dark">
          <CheckMail close={modalClose} />
        </Modal>
      )}
      {error && <Error msg={error} close={modalClose} />}
      <div className={styles.success}>Saved successfully</div>
      <div className={styles.error}>There was an error while saving changes, please try again</div>
    </div>
  )
}

Settings.propTypes = {
  id: T.number,
  userData: T.object,
  getUserAccount: T.func,
  updateAccount: T.func,
  resetConfirmation: T.func,
  logout: T.func,
  invalidLink: T.func,
  authorized: T.bool,
}

export default connect(
  ({
    account,
    login,
    router: {
      location: { pathname },
    },
  }) => ({ userData: account, authorized: login.authorized, url: pathname }),
  {
    getUserAccount,
    updateAccount,
    resetConfirmation,
    logout,
    invalidLink,
  },
)(Settings)
