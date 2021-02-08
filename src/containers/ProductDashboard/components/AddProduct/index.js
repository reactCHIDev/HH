import React, { useState, useEffect } from 'react'
import T, { shape } from 'prop-types'
import { connect } from 'react-redux'
import { Steps, Button } from 'antd'
import Modal from 'components/UniversalModal'
import Message from './components/Message'
import { removeKey } from 'utils/localStorage'
import { createProductRequestAC, updateProductRequestAC, duplicateAC } from 'actions/product'
import { getProductTypes, getProductTagsRequestAC, getCountriesAC } from 'actions/system'
import SubHeader from 'components/SubHeader'
import { getItem } from 'utils/localStorage'
import Eye from 'assets/icons/svg/eye-preview.svg'
import Copy from 'assets/icons/svg/copy-icon.svg'
import Btn from 'components/Button'
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
    requesting,
    success,
    getCountriesAC,
    getProductTypes,
    createProductRequestAC,
    updateProductRequestAC,
    getProductTagsRequestAC,
    duplicateAC,
    location: { state: edit },
  } = props

  const [step, setStep] = useState(0)
  const [firstStep, setFirstStep] = useState(null)
  const [progress, setProgress] = useState(0)
  const [stepper, setStepper] = useState(false)
  const [tagsCollection, setTagsCollection] = useState(false)
  const [id, setId] = useState(null)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    getProductTypes()
    getProductTagsRequestAC()
    getCountriesAC()
    if (!edit) removeKey('addProduct')
    if (getItem('addProduct')) {
      const { id } = getItem('addProduct')
      setId(id)
    }
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

  const duplicate = () => {
    setModal(true)
  }

  const goBack = () => {
    removeKey('addProduct')
  }

  const closeModal = (e) => {
    setModal(false)
    duplicateAC(id)
  }

  const reset = () => {
    setModal(false)
  }

  if (step === null || types.length === 0) return <></>
  return (
    <>
      <div className={styles.container}>
        <SubHeader
          linkTo="/product_dashboard/listings"
          onBack={goBack}
          title={edit ? 'Edit Product' : 'Add Product'}
        />
        <div className={styles.main}>
          <div id="stepper" className={styles.stepper}>
            <Steps progressDot current={Number(step)} onChange={onChange} direction="vertical">
              {firstStep === 0 && <Step title="Create shop" disabled={stepper} />}
              <Step title="STEP 1" disabled={stepper} />
              <Step title="STEP 2" disabled={stepper} />
              <Step title="STEP 3" disabled={stepper} />
            </Steps>
            <div className={styles.btn_preview}>
              <Button size="large" block disabled>
                Preview
              </Button>
            </div>
            <div className={styles.btn_preview}>
              {success && <div className={styles.success}>Copied successfully</div>}
              <Button
                type="default"
                block
                // icon={() => <img src={Copy} width="20px" height="20px" />}
                size="large"
                onClick={duplicate}
              >
                Duplicate Listing
              </Button>
            </div>
          </div>
          <div className={styles.mobile_stepper}>
            <div className={styles.info_container}>
              {success && <div className={styles.success}>Copied successfully</div>}
              <div className={styles.mobile_step}>{`Step ${step + 1} of ${4 - firstStep}`}</div>
              {step > 0 && (
                <div className={styles.mobile_preview} onClick={prevStep}>
                  <img className={styles.eye} src={Eye} alt="eye" />
                  <div className={styles.preview}>PREVIEW</div>
                </div>
              )}
              <div>
                <img src={Copy} className={styles.copy_btn} onClick={duplicate} alt="copy" />
              </div>
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
                  create={edit ? updateProductRequestAC : createProductRequestAC}
                  tags={tagsCollection}
                  countries={countries}
                  edit={edit}
                  requesting={requesting}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal closeFunc={closeModal} option>
          <Message reset={reset} />
        </Modal>
      )}
    </>
  )
}

AddProduct.propTypes = {
  account: T.arrayOf(shape()),
  types: T.arrayOf(shape()),
  tags: T.arrayOf(shape()),
  countries: T.arrayOf(shape()),
  requesting: T.bool,
  getCountriesAC: T.func,
  getProductTypes: T.func,
  createProductRequestAC: T.func,
  updateProductRequestAC: T.func,
  getProductTagsRequestAC: T.func,
}

AddProduct.defaultProperties = {
  types: [],
  tags: [],
}

export default connect(
  ({
    system: { productTags: tags, productTypes, countries },
    account,
    product: { requesting, success },
  }) => ({
    tags,
    types: productTypes,
    account,
    countries,
    requesting,
    success,
  }),
  {
    getProductTypes,
    getCountriesAC,
    createProductRequestAC,
    updateProductRequestAC,
    getProductTagsRequestAC,
    duplicateAC,
  },
)(AddProduct)
