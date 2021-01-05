import React from 'react'
import T from 'prop-types'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createOrderRequestrinAc } from 'actions/order'

import _ from 'lodash/fp'
import styles from './adress.module.scss'

const AdressForm = ({ closeFunc }) => {
  const { register, handleSubmit, errors, watch } = useForm()
  const dispatch = useDispatch()

  const onSubmit = (adressData) => {
    console.log(adressData)
    dispatch(createOrderRequestrinAc())
    closeFunc()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1>Delivery adress</h1>
          <input
            name="firstName"
            placeholder="First Name"
            type="text"
            ref={register({
              required: true,
            })}
          />
          {_.get('firstName.type', errors) === 'required' && <p>This field is required</p>}

          <input
            name="lastName"
            placeholder="Last Name"
            type="text"
            ref={register({
              required: true,
            })}
          />
          {_.get('lastName.type', errors) === 'required' && <p>This field is required</p>}

          <textarea
            name="adress"
            placeholder="Adress"
            rows="3"
            ref={register({
              required: true,
            })}
          />
          {_.get('adress.type', errors) === 'required' && <p>This field is required</p>}

          <input
            name="phone"
            placeholder="Phone"
            type="text"
            ref={register({
              required: true,
            })}
          />
          {_.get('phone.type', errors) === 'required' && <p>This field is required</p>}

          <input type="submit" value="CONFIRM" />
          <input type="button" value="CANCEL" onClick={closeFunc} />
        </form>
      </div>
    </div>
  )
}

AdressForm.propTypes = {
  closeFunc: T.func,
}

export default AdressForm
