import React, { useState, useEffect } from 'react'
import T, { shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { Steps, Divider } from 'antd'
import { setItem, getItem, removeKey } from 'utils/localStorage'
import { getProductTypes } from 'actions/listing'
import { createProductRequest } from 'actions/product'

import Button from 'components/Button'
import Step1 from './components/Steps/Step1'
import Step2 from './components/Steps/Step2'
import Step3 from './components/Steps/Step3'
import Step4 from './components/Steps/Step4'
import Header from './components/Header'
import styles from './add_product.module.scss'
import './add_product.less'

const AddProduct = (props) => {
  const { types, getProductTypes, createProductRequest } = props
  const [step, setStep] = useState(0)

  useEffect(() => {
    getProductTypes()
  }, [])

  const { Step } = Steps

  const onClick = () => setStep((s) => s + 1)
  const publish = () => console.log('%c   published   ', 'color: darkgreen; background: palegreen;')

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <div className={styles.stepper}>
          <Steps progressDot current={step} direction="vertical">
            <Step title="STEP 1" />
            <Step title="STEP 2" />
            <Step title="STEP 3" />
            <Step title="STEP 4" />
          </Steps>
          <div className={styles.btn_preview}>
            <Button title="Preview" dark={false} onClick={() => {}} />
          </div>
        </div>
        <div className={styles.main_block}>
          <div className={styles.section}>
            {step === 0 && <Step1 setStep={onClick} />}
            {step === 1 && <Step2 setStep={onClick} types={types} />}
            {step === 2 && <Step3 setStep={onClick} />}
            {step === 3 && <Step4 setStep={onClick} create={createProductRequest} />}
          </div>
        </div>
      </div>
    </div>
  )
}

AddProduct.propTypes = {
  types: T.arrayOf(shape()),
  getProductTypes: T.func,
  createProductRequest: T.func,
}

export default connect(({ listing: { types } }) => ({ types }), {
  getProductTypes,
  createProductRequest,
})(AddProduct)
