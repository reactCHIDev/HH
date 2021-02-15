import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import Uploader from 'components/Uploader'
import { Button, Radio, Checkbox, Divider } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { getItem, setItem } from 'utils/localStorage'
import _ from 'lodash/fp'
import styles from './step3.module.scss'
import './step3.less'

const Step3 = (props) => {
  const { setStep, stepper, setStepper } = props

  const prevState = getItem('addExperience')

  let summary, thingsToTake, notes, additionalInfo, isAdult, cancellationPolicy

  if (getItem('addExperience'))
    ({ summary, thingsToTake, notes, additionalInfo, isAdult, cancellationPolicy } = getItem(
      'addExperience',
    ))

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    defaultValues: { summary, thingsToTake, notes, additionalInfo, isAdult, cancellationPolicy },
  })

  const [cover, setCover] = useState(0)
  const [fileList, setFilelist] = useState([])
  const [isActive, setActiveNext] = useState(true)
  const [adult, setIsAdult] = useState(isAdult || false)
  const [selectedRadio, setRadio] = useState(cancellationPolicy || 'FULL_REFUND')

  useEffect(() => {
    if (prevState?.coverPhoto) {
      setFilelist(
        [prevState.coverPhoto].concat(prevState.otherPhotos).map((e, i) => {
          const ext = e.split('.').pop()
          return {
            uid: e.slice(-28, -(ext.length + 1)),
            status: 'done',
            url: e,
            name: `image${i}.${ext}`,
          }
        }),
      )
      setCover(prevState.coverPhoto.slice(-28, -(prevState.coverPhoto.split('.').pop().length + 1)))
    }
  }, [])

  useEffect(() => {
    if (fileList?.length && !fileList.some((e) => e.uid === cover)) setCover(fileList[0].uid)
  }, [fileList])

  const isAdultChk = () => setIsAdult((a) => !a)

  const onRadio = (e) => setRadio(e.target.value)

  const onNext = (data) => {
    const prevSteps = getItem('addExperience')

    const formData = {
      isAdult: adult,
      cancellationPolicy: selectedRadio,
    }

    const coverItem = fileList.length ? fileList.find((e) => e.uid === cover) : { url: '' }
    formData.coverPhoto = coverItem?.response ? coverItem.response.url : coverItem.url
    formData.otherPhotos =
      fileList.length > 1
        ? fileList
            .filter((e) => e.uid !== cover)
            .filter((e) => e.status !== 'error')
            .map((e) => (e?.response ? e.response.url : e.url))
        : []

    setItem('addExperience', {
      ...prevSteps,
      ...formData,
      ...data,
    })
    setStep()
    setStepper(false)
  }

  const onChangeForm = () => {
    if (!stepper) setStepper(true)
  }

  return (
    <div className={styles.container}>
      <div className={cls(styles.content, 'main')}>
        <p className={styles.header}>Add cover & photos</p>
        <div className={styles.photo_container}>
          <Uploader
            list={fileList}
            listSet={setFilelist}
            cover={cover}
            setCover={setCover}
            min={0}
            setActiveNext={setActiveNext}
          />
        </div>
        <Divider />

        <form className={styles.form} onChange={onChangeForm} onSubmit={handleSubmit(onNext)}>
          <div className={styles.description_container}>
            <div className={styles.heading}>What you do during the experience</div>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              name="summary"
              rows="4"
              ref={register({
                required: true,
              })}
            />
            {_.get('description.type', errors) === 'required' && (
              <p className={styles.errmsg}>This field is required</p>
            )}
          </div>
          <Divider />
          <div className={styles.description_container}>
            <div className={styles.heading}>What you’ll provide</div>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              name="thingsToTake"
              rows="4"
              ref={register({
                required: true,
              })}
            />
            {_.get('description.type', errors) === 'required' && (
              <p className={styles.errmsg}>This field is required</p>
            )}
          </div>
          <Divider />

          <div className={styles.description_container}>
            <p className={styles.heading}>Additional requirements</p>
            <Checkbox checked={adult} onChange={isAdultChk}>
              Verify customer is over 18 years old
            </Checkbox>
          </div>

          <Divider />
          <div id="radio" className={styles.cancellation}>
            <p className={styles.heading}>Cancellation policy</p>
            <Radio.Group onChange={onRadio} value={selectedRadio}>
              <Radio style={styles.radioStyle} value="FULL_REFUND">
                Full refund
              </Radio>
              <Radio style={styles.radioStyle} value="HALF_REFUND">
                50% refund
              </Radio>
              <Radio style={styles.radioStyle} value="NO_REFUND">
                Non-refundable
              </Radio>
            </Radio.Group>
          </div>
          <Divider />

          <div className={styles.description_container}>
            <div className={styles.heading}>Preset experience reminder notes</div>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              name="notes"
              rows="4"
              ref={register({
                required: true,
              })}
            />
            {_.get('description.type', errors) === 'required' && (
              <p className={styles.errmsg}>This field is required</p>
            )}
          </div>
          <Divider />
          <div className={styles.description_container}>
            <div className={styles.heading}>Where does experience take place?</div>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              name="additionalInfo"
              rows="2"
              ref={register({
                required: true,
              })}
            />
            {_.get('description.type', errors) === 'required' && (
              <p className={styles.errmsg}>This field is required</p>
            )}
          </div>
          <Divider />
          <div className={styles.btn_container}>
            <Button
              type="primary"
              htmlType="submit"
              block
              // disabled={fileList.length < 2 || !isActive}
              size="large"
            >
              NEXT
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

Step3.propTypes = {
  setStep: T.func.isRequired,
}

export default Step3
