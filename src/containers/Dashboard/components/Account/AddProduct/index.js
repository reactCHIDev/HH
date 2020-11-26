import React, { useState, useEffect } from 'react'
import T, { shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import { Steps, Divider } from 'antd'
import { setItem, getItem, removeKey } from 'utils/localStorage'
import { createProductRequestAC } from 'actions/product'
import { getProductTypes, getProductTagsRequestAC } from 'actions/system'

import Button from 'components/Button'
import Step1 from './components/Steps/Step1'
import Step2 from './components/Steps/Step2'
import Step3 from './components/Steps/Step3'
import Step4 from './components/Steps/Step4'
import Header from './components/Header'
import styles from './add_product.module.scss'
import './add_product.less'

const AddProduct = (props) => {
  const {
    types,
    tags,
    getProductTypes,
    createProductRequestAC,
    getProductTagsRequestAC,
    replaceRoute,
  } = props
  const { step } = useParams()
  // const [step, setStep] = useState(0)

  useEffect(() => {
    getProductTypes()
    getProductTagsRequestAC()
  }, [])

  const { Step } = Steps

  const onClick = (s) => replaceRoute(`/addproduct/${s}`)
  const publish = () => console.log('%c   published   ', 'color: darkgreen; background: palegreen;')

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <div className={styles.stepper}>
          <Steps progressDot current={Number(step)} direction="vertical">
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
            {Number(step) === 0 && <Step1 setStep={onClick} />}
            {Number(step) === 1 && <Step2 setStep={onClick} types={types} />}
            {Number(step) === 2 && <Step3 setStep={onClick} />}
            {Number(step) === 3 && (
              <Step4 pushRoute={replaceRoute} create={createProductRequestAC} tags={tags} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

AddProduct.propTypes = {
  types: T.arrayOf(shape()),
  tags: T.arrayOf(shape()),
  getProductTypes: T.func,
  createProductRequestAC: T.func,
  getProductTagsRequestAC: T.func,
  replaceRoute: T.func,
}

export default connect(
  ({ system: { specialityTags, productTypes } }) => ({ types: productTypes, tags: specialityTags }),
  {
    getProductTypes,
    createProductRequestAC,
    getProductTagsRequestAC,
    replaceRoute: replace,
  },
)(AddProduct)
