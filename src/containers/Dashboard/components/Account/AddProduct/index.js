import React, { useState, useEffect } from 'react'
import T, { shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import { Steps, Popover } from 'antd'
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
    account,
    types,
    tags,
    getProductTypes,
    createProductRequestAC,
    getProductTagsRequestAC,
    replaceRoute,
  } = props
  // let { step } = useParams()
  // console.log('%c   shopId   ', 'color: darkgreen; background: palegreen;', shopId)
  // console.log('%c   step   ', 'color: darkgreen; background: palegreen;', step)
  // if (shopId && Number(step) === 0) step = 1
  const [step, setStep] = useState(null)
  const [firstStep, setFirstStep] = useState(null)
  const [progress, setProgress] = useState(null)
  const [stepper, setStepper] = useState(false)

  useEffect(() => {
    getProductTypes()
    getProductTagsRequestAC()
  }, [])

  useEffect(() => {
    if (step > progress) setProgress(step)
  }, [step])

  useEffect(() => {
    const firstStep = account && Number(account?.shop?.id) > 0 ? 3 : 3
    setFirstStep(firstStep)
    setStep(firstStep)
    setProgress(firstStep)
  }, [account])

  const content = (
    <div>
      <p>Please, apply changes.</p>
    </div>
  )

  const { Step } = Steps

  const onChange = (current) => {
    if (current >= firstStep && current <= progress) setStep(current)
  }

  const onClick = (s) => setStep(s)
  // replaceRoute(`/addproduct/${s}`)
  const publish = () => console.log('%c   published   ', 'color: darkgreen; background: palegreen;')

  if (step === null) return <></>
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <div className={styles.stepper}>
          {/* <Popover content={content} visible={popover}> */}
          <Steps progressDot current={Number(step)} onChange={onChange} direction="vertical">
            <Step title="STEP 1" disabled={stepper} />
            <Step title="STEP 2" disabled={stepper} />
            <Step title="STEP 3" disabled={stepper} />
            <Step title="STEP 4" disabled={stepper} />
          </Steps>
          {/*  </Popover> */}
          <div className={styles.btn_preview}>
            <Button title="Preview" dark={false} onClick={() => {}} />
          </div>
        </div>
        <div className={styles.main_block}>
          <div className={styles.section}>
            {Number(step) === 0 && (
              <Step1 setStep={onClick} setStepper={setStepper} stepper={stepper} />
            )}
            {Number(step) === 1 && (
              <Step2 setStep={onClick} types={types} setStepper={setStepper} stepper={stepper} />
            )}
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
  shopId: T.number,
  getProductTypes: T.func,
  createProductRequestAC: T.func,
  getProductTagsRequestAC: T.func,
  replaceRoute: T.func,
}

AddProduct.defaultProperties = {
  types: [],
  tags: [],
}

export default connect(
  ({ system: { specialityTags: tags, productTypes }, account }) => ({
    tags,
    types: productTypes,
    account,
  }),
  {
    getProductTypes,
    createProductRequestAC,
    getProductTagsRequestAC,
    replaceRoute: replace,
  },
)(AddProduct)
