/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState, useRef, useEffect } from 'react'
import T from 'prop-types'

import { connect } from 'react-redux'
import _ from 'lodash/fp'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import { useForm } from 'react-hook-form'
import * as jwt from 'jsonwebtoken'
import { Button } from 'antd'

import { getUserByEmail } from 'api/requests/Auth'
import { getUserAccount, updateAccount, resetConfirmation, emailConfirm } from 'actions/account'
import { invalidLink, loginErrorReset, logout } from 'actions/login'

import Modal from 'components/UniversalModal'
import Error from 'components/Error'
import EyeOpen from 'assets/icons/svg/eye-open.svg'
import EyeClosed from 'assets/icons/svg/eye-closed.svg'
import EditIcon from 'assets/icons/svg/editor-icon.svg'
import check from 'assets/icons/svg/check.svg'
import info from 'assets/icons/svg/info.svg'
import ChkBox from 'components/ChkBox'
import PATHS from 'api/paths'
import CheckMail from './components/CheckMail'

import styles from './security.module.scss'
import './security.less'

const Security = ({
  userData,
  getUserAccount,
  updateAccount,
  resetConfirmation,
  loginErrorReset,
  emailConfirm,
  invalidLink,
  replace,
  authorized,
  url,
}) => {
  const [emailDisabled, setEmailDisabled] = useState(true)
  const [phoneDisabled, setPhoneDisabled] = useState(true)

  const [type, setType] = useState('password')

  const togglePassword = () => {
    setType(type === 'password' ? 'text' : 'password')
  }

  const { awaitingConfirmation, newEmail, requesting, error, success } = userData

  const { confirmation } = useParams()

  const isСhangeMailRoute = confirmation ? confirmation.substring(0, 12) === 'change_email' : false

  useEffect(() => {
    if (isСhangeMailRoute) {
      const token = confirmation.substring(12)
      const jwtData = token ? jwt.decode(token, process.env.REACT_APP_JWT_SECRET_KEY) : null
      const valid = jwtData ? new Date().getTime() < new Date(jwtData?.exp * 1000) : false

      if (!valid) {
        invalidLink('Your email link is expired !')
        replace('/settings/security')
      }

      if (valid && authorized) {
        const payload = {
          updateEmailLink: PATHS.url + url,
          newEmail: jwtData.newEmail,
        }

        emailConfirm(payload)
      }
    }
    // eslint-disable-next-line
  }, [isСhangeMailRoute])

  const resend = () => {
    const payload = {
      newEmail,
    }

    updateAccount(payload)
  }

  const mailEl = useRef()
  const phoneEl = useRef()
  const chkBoxEl = useRef()

  useEffect(() => {
    getUserAccount()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (userData && userData?.notifications) {
      chkBoxEl.current.checked = userData?.notifications.includes('email') ? 'checked' : ''
      if (userData?.notifications.length === 1) chkBoxEl.current.disabled = 'disabled'
    }
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
    loginErrorReset()
  }

  const onApply = (data) => {
    const formData = {}

    if (data.email) formData.newEmail = data.email.toLowerCase()
    if (data.phone) formData.phone = data.phone
    if (data.newPassword) {
      formData.oldPassword = data.oldPassword
      formData.newPassword = data.newPassword
    }

    if (Object.keys(formData).length) {
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
              {!newEmail ? (
                <div className={styles.verificated}>
                  <img className={styles.check} src={check} alt="checked" />
                  VERIFIED
                </div>
              ) : (
                <div className={styles.checklink} onClick={resend}>
                  <img className={styles.check} src={info} alt="info" />
                  CHECK LINK IN THE E-MAIL {'  '} <span>Resend</span>
                </div>
              )}
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
          <div className={styles.psw_wrapper}>
            <input
              name="oldPassword"
              type={type}
              ref={register({
                required: false,
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
                },
              })}
            />
            <button type="button" className={styles.psw_eye} onClick={togglePassword}>
              <img src={type === 'password' ? EyeOpen : EyeClosed} alt="eye" />
            </button>
          </div>
          {_.get('oldPassword.type', errors) === 'required' && <p>This field is required</p>}
          {_.get('oldPassword.type', errors) === 'pattern' && (
            <p>Letters, numbers, length 8 symbols</p>
          )}
          <label className={styles.label}>New password</label>
          <input
            name="newPassword"
            type={type}
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
            type={type}
            ref={register({
              validate: (value) => value === watch('newPassword'),
            })}
          />
          {_.get('confirm.type', errors) === 'required' && <p>This field is required</p>}
          {_.get('confirm.type', errors) === 'validate' && <p>Passwords don't match</p>}

          <div className={styles.submit_wrapper}>
            <Button type="primary" block size="large" loading={requesting} htmlType="submit">
              SAVE
            </Button>
          </div>
        </form>
      </section>

      {awaitingConfirmation && (
        <Modal closeFunc={modalClose} mode="dark">
          <CheckMail close={modalClose} />
        </Modal>
      )}
      {error && <Error msg={error} close={modalClose} />}
      {success && <div className={styles.success}>Saved successful</div>}
      {error && (
        <div className={styles.error}>
          There was an error while saving changes, please try again
        </div>
      )}
    </div>
  )
}

Security.propTypes = {
  id: T.number,
  userData: T.object,
  getUserAccount: T.func,
  updateAccount: T.func,
  resetConfirmation: T.func,
  logout: T.func,
  loginErrorReset: T.func,
  invalidLink: T.func,
  authorized: T.bool,
  emailConfirm: T.func,
  replace: T.func,
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
    loginErrorReset,
    emailConfirm,
    replace,
  },
)(Security)
