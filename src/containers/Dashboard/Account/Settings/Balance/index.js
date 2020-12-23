import React, { useState } from 'react'
import T from 'prop-types'
import { useForm } from 'react-hook-form'
import { Button } from 'antd'
import Info from 'assets/icons/svg/info-green.svg'
import _ from 'lodash/fp'

import styles from './balance.module.scss'
import './balance.less'

const Balance = (props) => {
  const [withdraw, setWithdraw] = useState(false)

  const { register, handleSubmit, control, setValue, errors } = useForm({
    mode: 'onBlur',
  })

  const onWithdraw = () => {
    setWithdraw((w) => !w)
  }

  const onSubmit = (data) => {
    console.log('%c   data   ', 'color: white; background: salmon;', data)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.description}>
            <img src={Info} alt="icon" />
            Payment is process every Monday after each booking occurred. It may take 3-5 business
            days to reach days to reach your nominated account.
          </div>
          <div className={styles.form_item}>
            <div className={styles.label}>Bank name</div>
            <input
              className={styles.input}
              name="title"
              type="text"
              placeholder="Enter bank name"
              autoComplete="off"
              ref={register({
                required: false,
              })}
            />
          </div>

          <div className={styles.form_item}>
            <div className={styles.label}>Account number</div>
            <input
              className={styles.input}
              name="accnumber"
              type="text"
              placeholder="Enter account number"
              autoComplete="off"
              ref={register({
                required: false,
                pattern: {
                  value: /^(?=.*\d).{12,12}$/,
                },
              })}
            />
            {_.get('accnumber.type', errors) === 'pattern' && (
              <p className={styles.errmsg}>12 digits</p>
            )}
          </div>

          <div className={styles.form_item}>
            <div className={styles.label}>Bank code</div>
            <input
              className={styles.input}
              name="code"
              type="text"
              placeholder="Code"
              autoComplete="off"
              ref={register({
                required: false,
                pattern: {
                  value: /^(?=.*\d).{8,12}$/,
                },
              })}
            />
            {_.get('code.type', errors) === 'pattern' && (
              <p className={styles.errmsg}>8-12 digits</p>
            )}
          </div>

          <div className={styles.form_item}>
            <div className={styles.label}>Payme phone number</div>
            <input
              className={styles.input}
              name="phone"
              type="text"
              placeholder="Enter payme phone number"
              autoComplete="off"
              ref={register({
                required: false,
                pattern: {
                  value: /^(?=.*\d).{8,12}$/,
                },
              })}
            />
            {_.get('phone.type', errors) === 'pattern' && (
              <p className={styles.errmsg}>Should be phone number</p>
            )}
          </div>

          <div className={styles.btn_container}>
            <Button type="primary" block size="large" loading={false} htmlType="submit">
              SAVE CHANGES
            </Button>
          </div>
        </form>
        <div className={styles.balance_container}>
          <div className={styles.sub_content}>
            <div className={styles.balance}>Balance</div>
            {!withdraw ? (
              <div className={styles.sum}>
                <span className={styles.dollar}>$</span>
                <span className={styles.qty}>2500.56</span>
                <span className={styles.hkd}>HKD</span>
              </div>
            ) : (
              <>
                <span className={styles.sum}>$</span>
                <input
                  className={styles.input_withdraw}
                  name="withdraw"
                  type="number"
                  placeholder={2500.56}
                  autoComplete="off"
                />
                <span className={styles.hkd}>HKD</span>
              </>
            )}
          </div>
          <div className={withdraw ? styles.req_withdraw : styles.withdraw} onClick={onWithdraw}>
            {withdraw ? 'REQUEST WITHDRAW' : 'WITHDRAW'}
          </div>
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