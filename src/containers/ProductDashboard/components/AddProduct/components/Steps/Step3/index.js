import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import Uploader from 'components/Uploader'
import { Button } from 'antd'
import { getItem, setItem } from 'utils/localStorage'
import styles from './step3.module.scss'
import './step3.less'

const Step3 = (props) => {
  const { setStep } = props

  const prevState = getItem('addProduct')

  const [cover, setCover] = useState(0)
  const [fileList, setFilelist] = useState([])
  const [isActive, setActiveNext] = useState(true)

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
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (fileList?.length && !fileList.some((e) => e.uid === cover)) setCover(fileList[0].uid)
    // eslint-disable-next-line
  }, [fileList])

  const onNext = () => {
    const prevSteps = getItem('addProduct')

    const formData = {}

    const coverItem = fileList.length ? fileList.find((e) => e.uid === cover) : { url: '' }
    formData.coverPhoto = coverItem?.response ? coverItem.response.url : coverItem.url
    formData.otherPhotos =
      fileList.length > 1
        ? fileList
            .filter((e) => e.uid !== cover)
            .filter((e) => e.status !== 'error')
            .map((e) => (e?.response ? e.response.url : e.url))
        : []

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
        <div className={styles.btn_container}>
          <Button
            type="primary"
            block
            disabled={fileList.length < 2 || !isActive}
            size="large"
            onClick={onNext}
          >
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
