import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import Uploader from 'components/PhotoUploader'
import { Button } from 'antd'
import { getItem, setItem } from 'utils/localStorage'
import styles from './step3.module.scss'
import './step3.less'

const Step3 = (props) => {
  const { setStep } = props

  const prevState = getItem('addProduct')

  const [cover, setCover] = useState(0)
  const [fileList, setFilelist] = useState([])

  useEffect(() => {
    if (prevState?.coverPhoto) setFilelist([prevState.coverPhoto].concat(prevState.otherPhotos))
  }, [])

  const onNext = () => {
    const prevSteps = getItem('addProduct')

    const formData = {}

    formData.coverPhoto = fileList.length ? fileList[cover] : ''
    formData.otherPhotos = fileList.length > 1 ? fileList.filter((_, i) => i !== cover) : []

    setItem('addProduct', {
      ...prevSteps,
      ...formData,
    })
    setStep()
  }

  return (
    <div className={styles.container}>
      <div className={cls(styles.content, 'main')}>
        <p className={styles.header}>Add cover & photos</p>
        <Uploader list={fileList} listSet={setFilelist} cover={cover} setCover={setCover} min={0} />
        <div className="photo_container" />
        <div className={styles.btn_container}>
          <Button type="primary" block disabled={fileList.length < 2} size="large" onClick={onNext}>
            NEXT
          </Button>
        </div>
      </div>
    </div>
  )
}

Step3.propTypes = {
  setStep: T.func.isRequired,
}

export default Step3
