/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import T, { shape } from 'prop-types'
import { connect } from 'react-redux'
import { Steps, Button } from 'antd'
import Modal from 'components/UniversalModal'
import { removeKey, getItem } from 'utils/localStorage'
import { createExperienceAC, updateExperienceAC, duplicateAC } from 'actions/experience'
import {
  getProductTypes,
  getProductTagsRequestAC,
  getCountriesAC,
  getExpTypesAC,
  getExpTagsAC,
} from 'actions/system'
import SubHeader from 'components/SubHeader'

import Eye from 'assets/icons/svg/eye-preview.svg'
import Copy from 'assets/icons/svg/copy-icon.svg'
import Message from './components/Message'
import Step1 from './components/Steps/Step1'
import Step2 from './components/Steps/Step2'
import Step3 from './components/Steps/Step3'
import Step4 from './components/Steps/Step4'
import styles from './add_experience.module.scss'
import './add_experience.less'

const AddExperience = (props) => {
  const {
    account,
    expTypes,
    expTags,
    requesting,
    success,
    getExpTypesAC,
    getExpTagsAC,
    getCountriesAC,
    getProductTypes,
    getProductTagsRequestAC,
    duplicateAC,
    location: { state: edit },
  } = props

  // setItem('addExperience', currentExperience)

  const [step, setStep] = useState(0)
  const [firstStep, setFirstStep] = useState(null)
  const [progress, setProgress] = useState(0)
  const [stepper, setStepper] = useState(false)
  const [id, setId] = useState(null)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    getProductTypes()
    getProductTagsRequestAC()
    getCountriesAC()
    getExpTypesAC()
    getExpTagsAC()
    if (!edit) removeKey('addExperience')
    if (getItem('addExperience')) {
      const { id } = getItem('addExperience')
      setId(id)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (step > progress) setProgress(step)
    // eslint-disable-next-line
  }, [step])

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
    removeKey('addExperience')
  }

  const closeModal = (e) => {
    setModal(false)
    duplicateAC(id)
  }

  const reset = () => {
    setModal(false)
  }

  if (firstStep === null || !expTypes || !expTags) return <></>
  return (
    <>
      <div className={styles.container}>
        <SubHeader
          linkTo="/experience_dashboard/listings"
          onBack={goBack}
          title={edit ? 'Edit Experience' : 'Add Experience'}
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
            {false && (
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
            )}
          </div>
          <div className={styles.mobile_stepper}>
            <div className={styles.info_container}>
              {success && <div className={styles.success}>Copied successfully</div>}
              <div className={styles.mobile_step}>{`Step ${step + 1} of ${4 - firstStep}`}</div>
              {step > 0 && (
                <div className={styles.mobile_preview} onClick={prevStep}>
                  {/* <img className={styles.eye} src={Eye} alt="eye" /> */}
                  <div className={styles.preview}>Back</div>
                </div>
              )}
              {false && (
                <div>
                  <img src={Copy} className={styles.copy_btn} onClick={duplicate} alt="copy" />
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
                <Step2
                  setStep={onClick}
                  expTypes={expTypes}
                  expTags={expTags}
                  setStepper={setStepper}
                  stepper={stepper}
                />
              )}
              {Number(step + firstStep) === 2 && (
                <Step3 setStep={onClick} setStepper={setStepper} stepper={stepper} />
              )}
              {Number(step + firstStep) === 3 && (
                <Step4
                  create={edit ? updateExperienceAC : createExperienceAC}
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

AddExperience.propTypes = {
  account: T.shape(),
  expTypes: T.arrayOf(shape()),
  expTags: T.arrayOf(shape()),
  requesting: T.bool,
  getCountriesAC: T.func,
  getProductTypes: T.func,
  getProductTagsRequestAC: T.func,
}

AddExperience.defaultProperties = {
  expTypes: [],
  expTags: [],
}

export default connect(
  ({ system: { expTypes, expTags }, account, product: { requesting, success } }) => ({
    expTypes,
    expTags,
    account,
    requesting,
    success,
  }),
  {
    getProductTypes,
    getCountriesAC,
    getExpTypesAC,
    getExpTagsAC,
    createExperienceAC,
    updateExperienceAC,
    getProductTagsRequestAC,
    duplicateAC,
  },
)(AddExperience)
