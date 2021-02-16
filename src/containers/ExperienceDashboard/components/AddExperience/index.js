import React, { useState, useEffect } from 'react'
import T, { shape } from 'prop-types'
import { connect } from 'react-redux'
import { Steps, Button } from 'antd'
import Modal from 'components/UniversalModal'
import Message from './components/Message'
import { removeKey } from 'utils/localStorage'
import { createProductRequestAC, updateProductRequestAC, duplicateAC } from 'actions/product'
import {
  getProductTypes,
  getProductTagsRequestAC,
  getCountriesAC,
  getExpTypesAC,
  getExpTagsAC,
} from 'actions/system'
import SubHeader from 'components/SubHeader'
import { getItem, setItem } from 'utils/localStorage'
import Eye from 'assets/icons/svg/eye-preview.svg'
import Copy from 'assets/icons/svg/copy-icon.svg'
import Step1 from './components/Steps/Step1'
import Step2 from './components/Steps/Step2'
import Step3 from './components/Steps/Step3'
import Step4 from './components/Steps/Step4'
import styles from './add_experience.module.scss'
import './add_experience.less'

const currentExperience = {
  id: 71,
  shopId: 43,
  shopName: 'My shop',
  title: 'Alco - Discoteque - Next',
  typeIds: [1, 2, 3],
  tagIds: [1, 2],
  duration: 40,
  priceAdult: 100,
  priceChild: 30,
  currency: 'HKD',
  isAdult: false,
  guests: {
    adults: 5,
    children: 5,
  },
  guestsTotal: 10,
  languages: ['English', 'Spanish'],
  discount: { quantity: 5, discount: 10 },
  coverPhoto:
    'https://hungryhugger-space.fra1.digitaloceanspaces.com/72cb3de3-61ef-4149-afae-75f9bf1be702_1611831571066.jpg',
  otherPhotos: [
    'https://hungryhugger-space.fra1.digitaloceanspaces.com/72cb3de3-61ef-4149-afae-75f9bf1be702_1612528894745.jpg',
    'https://hungryhugger-space.fra1.digitaloceanspaces.com/72cb3de3-61ef-4149-afae-75f9bf1be702_1612528912562.jpg',
  ],
  summary:
    'Lorem ipsum about Lorem ipsum about Lorem ipsum about Lorem ipsum about Lorem ipsum about Lorem ipsum about',
  thingsToTake: 'spoon, knife, fork, plate',
  additionalInfo: 'Lorem ipsum about Lorem ipsum about Lorem ipsum ',
  cancellationPolicy: 'HALF_REFUND',

  notes: 'ipsum about Lorem ipsum about Lorem ipsum about',
  address: 'Pivdennyi vokzal',
  location: '49.9878502,36.199552',
  startDate: '2021-02-10T09:27:12.667Z',
  endDate: '2021-03-11T09:27:12.667Z',
  time: [
    '2021-02-10T09:27:12.667Z',
    '2021-02-17T09:27:12.667Z',
    '2021-02-24T09:27:12.667Z',
    '2021-03-03T09:27:12.667Z',
    '2021-03-10T09:27:12.667Z',
  ],
  periodicity: 'Weekly',
  experienceUrl: 'localhost/experience/alco_-_discoteque_-_next',
  status: 'PUBLISHED',
  type: 'PUBLIC',
  rating: 0,
  votes: '0',
  visits: '0',
  updatedAt: '2021-02-10T06:51:06.406Z',
  createdAt: '2021-02-10T06:51:06.406Z',
}

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
    createProductRequestAC,
    updateProductRequestAC,
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
    // if (!edit) removeKey('addExperience')
    if (getItem('addExperience')) {
      const { id } = getItem('addExperience')
      setId(id)
    }
  }, [])

  useEffect(() => {
    if (step > progress) setProgress(step)
  }, [step])

  useEffect(() => {
    const firstS = account && account?.shop?.id ? 0 : 0
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
                  create={edit ? updateProductRequestAC : createProductRequestAC}
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
  createProductRequestAC: T.func,
  updateProductRequestAC: T.func,
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
    createProductRequestAC,
    updateProductRequestAC,
    getProductTagsRequestAC,
    duplicateAC,
  },
)(AddExperience)
