import React, { useState, useEffect } from 'react'
import T, { shape } from 'prop-types'
import { connect } from 'react-redux'
import { Steps } from 'antd'
import { removeKey } from 'utils/localStorage'
import { createProductRequestAC } from 'actions/product'
import { getProductTypes, getProductTagsRequestAC, getCountriesAC } from 'actions/system'
import SubHeader from 'components/SubHeader'
import Eye from 'assets/icons/svg/eye-preview.svg'
import Button from 'components/Button'
import Step1 from './components/Steps/Step1'
import Step2 from './components/Steps/Step2'
import Step3 from './components/Steps/Step3'
import Step4 from './components/Steps/Step4'
import styles from './add_product.module.scss'
import './add_product.less'

const AddProduct = (props) => {
  const {
    account,
    countries,
    types,
    tags,
    getCountriesAC,
    getProductTypes,
    createProductRequestAC,
    getProductTagsRequestAC,
    location: { state: edit },
  } = props

  const [step, setStep] = useState(0)
  const [firstStep, setFirstStep] = useState(null)
  const [progress, setProgress] = useState(0)
  const [stepper, setStepper] = useState(false)
  const [tagsCollection, setTagsCollection] = useState(false)

  useEffect(() => {
    getProductTypes()
    getProductTagsRequestAC()
    getCountriesAC()
  }, [])

  useEffect(() => {
    if (step > progress) setProgress(step)
  }, [step])

  useEffect(() => {
    if (types && tags) {
      const newTags = types.reduce((acc, e) => {
        return acc.concat(e.productCategories.map((c) => c.title))
      }, [])
      setTagsCollection(tags)
    }
  }, [types, tags])

  useEffect(() => {
    const firstS = account && account?.shop?.id ? 1 : 0
    setFirstStep(firstS)
  }, [account])

  const { Step } = Steps

  const onChange = (current) => {
    if (current <= progress) setStep(current)
  }

  const onClick = () => setStep((s) => s + 1)

  const prevStep = () => (step > 0 ? setStep((s) => s - 1) : null)

  const goBack = () => {
    removeKey('addProduct')
  }

  if (step === null || types.length === 0) return <></>
  return (
    <div className={styles.container}>
      <SubHeader linkTo="/profile" onBack={goBack} title={edit ? 'Edit Product' : 'Add Product'} />
      <div className={styles.main}>
        <div id="stepper" className={styles.stepper}>
          <Steps progressDot current={Number(step)} onChange={onChange} direction="vertical">
            {firstStep === 0 && <Step title="Create shop" disabled={stepper} />}
            <Step title="STEP 1" disabled={stepper} />
            <Step title="STEP 2" disabled={stepper} />
            <Step title="STEP 3" disabled={stepper} />
          </Steps>
          <div className={styles.btn_preview}>
            <Button title="Preview" dark={false} onClick={prevStep} />
          </div>
        </div>
        <div className={styles.mobile_stepper}>
          <div className={styles.info_container}>
            <div className={styles.mobile_step}>{`Step ${step + 1} of ${4 - firstStep}`}</div>
            {step > 0 && (
              <div className={styles.mobile_preview} onClick={prevStep}>
                <img className={styles.eye} src={Eye} alt="eye" />
                <div className={styles.preview}>PREVIEW</div>
              </div>
            )}
          </div>
          <div className={styles.mobile_progress}>
            <div
              className={styles.mobile_bar}
              style={{ width: `${(step + 1) * (firstStep === 1 ? 33.33 : 25)}%` }}
            />
          </div>
        </div>
        <div className={styles.main_block}>
          <div className={styles.section}>
            {Number(step + firstStep) === 0 && (
              <Step1 setStep={onClick} setStepper={setStepper} stepper={stepper} />
            )}
            {Number(step + firstStep) === 1 && (
              <Step2 setStep={onClick} types={types} setStepper={setStepper} stepper={stepper} />
            )}
            {Number(step + firstStep) === 2 && <Step3 setStep={onClick} />}
            {Number(step + firstStep) === 3 && (
              <Step4
                create={createProductRequestAC}
                tags={tagsCollection}
                countries={countries}
                edit={edit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

AddProduct.propTypes = {
  account: T.arrayOf(shape()),
  types: T.arrayOf(shape()),
  tags: T.arrayOf(shape()),
  countries: T.arrayOf(shape()),
  getCountriesAC: T.func,
  getProductTypes: T.func,
  createProductRequestAC: T.func,
  getProductTagsRequestAC: T.func,
}

AddProduct.defaultProperties = {
  types: [],
  tags: [],
}

export default connect(
  ({ system: { productTags: tags, productTypes, countries }, account }) => ({
    tags,
    types: productTypes,
    account,
    countries,
  }),
  {
    getProductTypes,
    getCountriesAC,
    createProductRequestAC,
    getProductTagsRequestAC,
  },
)(AddProduct)
