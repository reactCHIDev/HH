import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import Uploader from 'components/Uploader'
import Heading from '../../components/heading'
import styles from './photo.module.scss'

const Photo = (props) => {
  const {
    properties: { value },
    onSubmit,
  } = props

  const [cover, setCover] = useState(0)
  const [fileList, setFilelist] = useState([])
  const [isActive, setActiveNext] = useState(true)

  useEffect(() => {
    if (value?.coverPhoto)
      setFilelist(
        [value.coverPhoto].concat(value.otherPhotos).map((e, i) => {
          const ext = e.split('.').pop()
          return {
            uid: e.slice(-28, -(ext.length + 1)),
            status: 'done',
            url: e,
            name: `image${i}.${ext}`,
          }
        }),
      )
    setCover(value.coverPhoto.slice(-28, -(value.coverPhoto.split('.').pop().length + 1)))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (fileList?.length && !fileList.some((e) => e.uid === cover)) setCover(fileList[0].uid)
    // eslint-disable-next-line
  }, [fileList])

  const submit = () => {
    const list = fileList?.length ? fileList.filter((e) => e.status !== 'error') : []
    const coverItem = list.length ? list.find((e) => e.uid === cover) : { url: '' }
    const submitData = {
      otherPhotos: {
        coverPhoto: coverItem?.response ? coverItem.response.url : coverItem.url,
        otherPhotos:
          fileList.length > 1
            ? fileList
                .filter((e) => e.uid !== cover)
                .filter((e) => e.status !== 'error')
                .map((e) => (e?.response ? e.response.url : e.url))
            : [],
      },
    }
    onSubmit(submitData)
  }

  return (
    <div className={styles.photo_container}>
      <Heading category="About" name="2 - 8 photos of your work" />
      <Uploader
        list={fileList}
        listSet={setFilelist}
        cover={cover}
        setCover={setCover}
        min={2}
        setActiveNext={setActiveNext}
      />
      <p className={styles.description}>
        Show your work at its best! This directly affects the number of orders.
      </p>
      <input
        className={styles.next}
        disabled={
          (fileList?.length ? fileList.filter((e) => e.status !== 'error').length < 2 : true) ||
          !isActive
        }
        onClick={submit}
        type="button"
        value="Next  >"
      />
    </div>
  )
}

Photo.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.shape(),
  }),
  onSubmit: T.func,
}

export default Photo
