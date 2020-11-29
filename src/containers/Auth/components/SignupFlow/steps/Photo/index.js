import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import Uploader from 'components/PhotoUploader'
import Heading from '../../components/heading'
import styles from './photo.module.scss'

const Photo = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props

  const [cover, setCover] = useState(0)
  const [fileList, setFilelist] = useState([])

  useEffect(() => {
    if (value.coverPhoto) setFilelist([value.coverPhoto].concat(value.otherPhotos))
  }, [])

  const submit = () => {
    const submitData = {
      otherPhotos: {
        coverPhoto: fileList.length > 0 ? fileList[cover] : '',
        otherPhotos: fileList.length > 1 ? fileList.filter((_, i) => i !== cover) : [],
      },
    }
    onSubmit(submitData)
  }

  return (
    <div className={styles.container}>
      <Heading category="About" name="2 - 8 photos of your work" />
      <div className={styles.photo_container}>
        <Uploader list={fileList} listSet={setFilelist} cover={cover} setCover={setCover} />
      </div>
      <p className={styles.description}>
        Show your work at its best! This directly affects the number of orders.
      </p>
      <input
        className={styles.next}
        disabled={fileList.length < 2}
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
