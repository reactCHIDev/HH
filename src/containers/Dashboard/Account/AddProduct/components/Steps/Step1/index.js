import React, { useState } from 'react'
import T from 'prop-types'
import { setItem, getItem } from 'utils/localStorage'
import { useForm, Controller } from 'react-hook-form'
import { isShopExist } from 'api/requests/Shop'
import cls from 'classnames'
import { Input, InputNumber, Checkbox, Button } from 'antd'
import _ from 'lodash/fp'
import open from 'assets/images/open-table.svg'
import addHint from 'assets/icons/svg/add_hint.svg'
import styles from './step1.module.scss'
import './step1.less'

const Step1 = (props) => {
  const { setStep, stepper, setStepper } = props

  let shopName = ''
  const allValues = getItem('addProduct')
  if (allValues?.shopName) shopName = allValues?.shopName
  /* const [standart, setStandart] = useState(true)
  const [freepick, setFreepick] = useState(false)
  const [express, setExpress] = useState(false)
  const [free, setFree] = useState(false)

  const onChangeStandartChkBox = (e) => setStandart(e.target.checked)
  const onChangeFreePickChkBox = (e) => setFreepick(e.target.checked)
  const onChangeExpressChkBox = (e) => setExpress(e.target.checked)
  const onChangeFreeChkBox = (e) => setFree(e.target.checked) */
  //const onChange = () => {}

  const { register, handleSubmit, control, watch, errors } = useForm({
    mode: 'onBlur',
    defaultValues: { shopName },
  })

  const onNext = (name) => {
    const values = getItem('addProduct')
    setItem('addProduct', { ...values, ...name })
    setStep(1)
    setStepper(false)
  }

  const onChangeForm = () => {
    if (!stepper) setStepper(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.open} src={open} alt="open" />
        <p className={styles.header}>Start setting up you shop now</p>
        <form className={styles.form} onChange={onChangeForm} onSubmit={handleSubmit(onNext)}>
          <label className={styles.label}>Shop name (you can change it later)</label>
          <input
            className={styles.input}
            id="step1"
            name="shopName"
            type="text"
            ref={register({
              required: true,
              validate: async (value) => {
                const name = await isShopExist(value)
                return !name.data
              },
              maxLength: {
                value: 66,
              },
            })}
          />
          {_.get('shopName.type', errors) === 'required' && (
            <p className={styles.errmsg}>This field is required</p>
          )}
          {_.get('shopName.type', errors) === 'validate' && (
            <p className={styles.errmsg}>This name is already exist</p>
          )}
          {_.get('shopName.type', errors) === 'maxLength' && (
            <p className={styles.errmsg}>Max length 66 symbols</p>
          )}
          {/* <div className={styles.hint_wrapper}>
            <img className={styles.hint_icon} src={addHint} alt="hint" />
            <p className={styles.hint}>You can create one experience for free forever.</p>
          </div> */}
          <input type="submit" value="Next" />
        </form>

        {/* <p className={styles.header}>Delivery policy</p>
        <div className={styles.delivery_layout}>
          <div className={styles.delivery_container}>
            <Checkbox id="standart" checked={standart} onChange={onChangeStandartChkBox}>
              Standart
            </Checkbox>
            <div className={styles.standart_block}>
              <div className={cls(styles.standart_cost, 'input_number')}>
                <label className={styles.label}>Cost of delivery</label>
                <InputNumber
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={onChange}
                />
              </div>
              <div className={cls(styles.standart_cost, 'input_number')}>
                <label className={styles.label}>Free for order over</label>
                <InputNumber
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.delivery_container}>
            <Checkbox id="1" checked={freepick} onChange={onChangeFreePickChkBox}>
              Free Pick-up
            </Checkbox>
            <div style={{ padding: '5px 0 0 24px' }}>
              <label className={styles.label}>Note</label>
              <Input />
            </div>
          </div>
          <div className={styles.delivery_container}>
            <Checkbox id="0" checked={express} onChange={onChangeExpressChkBox}>
              Express
            </Checkbox>
            <div className={styles.standart_block}>
              <div className={cls(styles.standart_cost, 'input_number')}>
                <label className={styles.label}>Cost of delivery</label>
                <InputNumber
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={onChange}
                />
              </div>
              <div className={cls(styles.standart_cost, 'input_number')}>
                <label className={styles.label}>Free for order over</label>
                <InputNumber
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.delivery_container}>
            <Checkbox id="3" checked={free} onChange={onChangeFreeChkBox}>
              Free Delivery
            </Checkbox>
            <div className={styles.standart_block}>
              <div className={cls(styles.standart_cost, 'input_number')}>
                <label className={styles.label}>Minimum spend to recieve</label>
                <InputNumber
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

Step1.propTypes = {
  setStep: T.func.isRequired,
}

export default Step1
