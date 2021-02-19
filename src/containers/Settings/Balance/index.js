import React, { useState } from 'react'
import T from 'prop-types'
import { useForm } from 'react-hook-form'
import { Button, Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyInput from 'react-currency-input-field'

import { createWithdrawAC, updateBankDataAc } from 'actions/foodmaker'
import Info from 'assets/icons/svg/info-green.svg'
import _ from 'lodash/fp'

import styles from './balance.module.scss'
import './balance.less'

const Balance = () => {
  const [withdraw, setWithdraw] = useState(false)
  const [moneyValue, setMoney] = useState(0)
  const [isBankDataActive, setisBankDataActive] = useState(true)

  const dispatch = useDispatch()
  const balance = useSelector((state) => state.account.balance)
  const isValid = useSelector((state) => state.foodmaker.isPaymentDataValid)
  const withdrawRequest = useSelector((state) => state.foodmaker.withdrawRequest)

  const isBankDataNotificationShown = useSelector(
    (state) => state.foodmaker.showBankDataNotification,
  )
  const isWithdrawNotificationShown = useSelector(
    (state) => state.foodmaker.showWithdrawNotification,
  )

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: balance?.bankName || '',
      code: balance?.bankCode || '',
      accnumber: balance?.accountNumber || '',
      accName: balance?.accountName || '',
      phone: balance?.paymentPhone || '',
    },
  })

  const onMoneyChange = (v) => setMoney(v)

  const onWithdraw = () => {
    setWithdraw((w) => !w)
    if (withdraw)
      dispatch(
        createWithdrawAC({
          amount: Number(moneyValue > balance?.hkd ? balance?.hkd : moneyValue),
          currency: 'HKD',
        }),
      )
    setMoney(0)
  }

  const onSubmit = (data) => {
    dispatch(
      updateBankDataAc({
        isBankDataActive,
        bankName: data.title,
        bankCode: data.code,
        accountNumber: data.accnumber,
        accountName: data.accName,
        paymentPhone: data.phone,
      }),
    )
  }

  const isPending = () => withdrawRequest.status === 'Pending'

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} id="hook-form">
          <div className={styles.description}>
            <img src={Info} alt="icon" />
            Payment is process every Monday after each booking occurred. It may take 3-5 business
            days to reach days your nominated account.
          </div>
          <div className={styles.form_item}>
            <div className={styles.label}>Bank name</div>
            <input
              className={styles.input}
              name="title"
              disabled={!isBankDataActive}
              type="text"
              placeholder="Enter bank name"
              autoComplete="off"
              ref={register({
                required: isBankDataActive,
              })}
            />
            {_.get('title.type', errors) === 'required' && isBankDataActive && (
              <p className={styles.errmsg}>This field is required</p>
            )}
          </div>

          <div className={styles.form_item}>
            <div className={styles.label}>Bank code</div>
            <input
              className={styles.input}
              name="code"
              type="text"
              disabled={!isBankDataActive}
              placeholder="Code"
              autoComplete="off"
              ref={register({
                required: isBankDataActive,
                pattern: {
                  value: /^(?=.*\d).{8,12}$/,
                },
              })}
            />
            {_.get('code.type', errors) === 'required' && isBankDataActive && (
              <p className={styles.errmsg}>This field is required</p>
            )}
            {_.get('code.type', errors) === 'pattern' && isBankDataActive && (
              <p className={styles.errmsg}>8-12 digits</p>
            )}
          </div>

          <div className={styles.form_item}>
            <div className={styles.label}>Account Name</div>
            <input
              className={styles.input}
              name="accName"
              type="text"
              disabled={!isBankDataActive}
              placeholder="Enter account name"
              autoComplete="off"
              ref={register({
                required: isBankDataActive,
              })}
            />
            {_.get('accName.type', errors) === 'required' && isBankDataActive && (
              <p className={styles.errmsg}>This field is required</p>
            )}
          </div>

          <div className={styles.form_item}>
            <div className={styles.label}>Account number</div>
            <input
              className={styles.input}
              name="accnumber"
              type="text"
              disabled={!isBankDataActive}
              placeholder="Enter account number"
              autoComplete="off"
              ref={register({
                required: isBankDataActive,
                pattern: {
                  value: /^(?=.*\d).{12,12}$/,
                },
              })}
            />
            {_.get('accnumber.type', errors) === 'required' && isBankDataActive && (
              <p className={styles.errmsg}>This field is required</p>
            )}
            {_.get('accnumber.type', errors) === 'pattern' && isBankDataActive && (
              <p className={styles.errmsg}>12 digits</p>
            )}
          </div>

          <div className={styles.form_item}>
            <div className={styles.checkboxLabel}>
              <Checkbox onChange={() => setisBankDataActive((b) => !b)} />
              <div style={{ marginLeft: '10px' }}>Pay via Payme</div>
            </div>
            <div className={styles.label}>NumberActive</div>
            <input
              className={styles.input}
              name="phone"
              type="text"
              disabled={isBankDataActive}
              placeholder="Enter Payme phone number"
              autoComplete="off"
              ref={register({
                required: !isBankDataActive,
                pattern: {
                  value: /^(?=.*\d).{8,12}$/,
                },
              })}
            />
            {_.get('phone.type', errors) === 'required' && !isBankDataActive && (
              <p className={styles.errmsg}>This field is required</p>
            )}
            {_.get('phone.type', errors) === 'pattern' && !isBankDataActive && (
              <p className={styles.errmsg}>Should be phone number</p>
            )}
            <div className={styles.btn_container}>
              {isBankDataNotificationShown && (
                <div className={styles.bank_data_notification}>Saved successfully</div>
              )}
              <button type="submit" form="hook-form">
                SAVE CHANGES
              </button>
            </div>
          </div>
        </form>
        <div className={styles.balance_container}>
          {isWithdrawNotificationShown && (
            <div className={styles.withdraw_notification}>
              You already have one pending withdrawal request, please wait untill it is processed
            </div>
          )}
          <div className={styles.sub_content}>
            <div className={styles.balance}>Balance</div>
            {!withdraw ? (
              <div className={styles.sum}>
                <span className={styles.dollar}>$</span>
                <span className={styles.qty}>{balance?.hkd.toFixed(2)}</span>
                <span className={styles.hkd}>HKD</span>
              </div>
            ) : (
              <>
                <CurrencyInput
                  id="money-input"
                  name="money"
                  allowNegativeValue={false}
                  className={styles.amountInput}
                  allowDecimals={false}
                  defaultValue={0}
                  prefix="$ "
                  value={moneyValue}
                  onValueChange={onMoneyChange}
                />
              </>
            )}
          </div>
          <button
            className={withdraw ? styles.req_withdraw : styles.withdraw}
            style={(balance?.bankName || isValid) && !isPending ? {} : { cursor: 'default' }}
            onClick={
              !balance?.pending && (balance?.bankName || isValid) && !isPending ? onWithdraw : null
            }
            type="button"
          >
            {isPending
              ? 'Pending'
              : !balance?.pending
              ? withdraw
                ? 'REQUEST WITHDRAW'
                : 'WITHDRAW'
              : null}
          </button>
        </div>
        {false && (
          <div className={styles.success}>Wait a few seconds, your request is being processed</div>
        )}
      </div>
    </div>
  )
}

Balance.propTypes = {}

export default Balance
