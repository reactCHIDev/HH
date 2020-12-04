import React, { useState, useEffect, useCallback, useRef } from 'react'
import T from 'prop-types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import cls from 'classnames'
import axios from 'axios'
import { getItem } from 'utils/localStorage'
import Cross from 'assets/icons/svg/close-cross.svg'
import styles from './uploader.module.scss'

const Uploader = ({ list, listSet, cover, setCover }) => {
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState()
  const [containerWidth, setWidth] = useState(0)
  const [curSlide, setSlide] = useState(0)

  const slider = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    if (container?.current) setWidth(container.current.offsetWidth)
    if (slider.current) slider.current.slickGoTo(0)
  }, [])

  useEffect(() => {
    if (container?.current && slider.current) slider.current.slickGoTo(Math.round(curSlide) + 1)
  }, [curSlide])

  useEffect(() => {
    if (url) listSet((urlArr) => [...urlArr, url])
  }, [url])

  useEffect(() => {
    let slide = 0
    if (list.length + 1 - containerWidth / 140 > 0) {
      slide = list.length + 1 - containerWidth / 140
    } else {
      slide = 0
    }
    if (list && list.length) setSlide(Math.round(slide))
  }, [list, containerWidth])

  const handleResize = () => {
    if (container?.current) setWidth(container.current.offsetWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  async function sendFile(file) {
    const formData = new FormData()
    formData.append('file', file)
    const getToken = () => {
      const accessToken = getItem('authorization-token')
      if (accessToken) {
        return { Authorization: accessToken }
      }
      return null
    }
    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
      'x-api-key': process.env.REACT_APP_X_API_KEY,
      ...getToken(),
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/file/upload/photo`,
        formData,
        {
          headers,
          onUploadProgress: (event) => {
            const percent = Math.floor((event.loaded / event.total) * 100)
            setProgress(percent)
            if (percent === 100) {
              setTimeout(() => setProgress(0), 0)
            }
          },
        },
      )

      setUrl(res.data)
    } catch (error) {
      console.err('error', error)
      // throw new Error(`ERROR`)
    }
  }

  const handleImageChange = (e) => {
    e.preventDefault()

    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      const ext = file.name.split('.').pop()
      if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
        sendFile(file)
      } else {
        alert('Choose jpg/png file.')
      }
    }

    reader.readAsDataURL(file)
  }

  const onDelete = (e) => {
    const { id } = e.currentTarget
    listSet(list.filter((el) => el !== id))
  }

  const onRadio = (e) => {
    const { value } = e.target
    setCover(Number(value))
  }

  const settings = {
    draggable: true,
    touchThreshold: 30,
    useCSS: true,
    swipeToSlide: true,
    dots: true,
    infinite: false,
    speed: 500,
    variableWidth: true,
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.container} ref={container}>
        <Slider {...settings} ref={slider}>
          {list.map((e, i) => (
            <div key={e} className={styles.gallery_item} draggable={false}>
              <div className={cls(styles.img_wrapper, i === cover ? styles.cover : styles.other)}>
                <div className={styles.cross_container} id={e} onClick={onDelete}>
                  <img src={Cross} alt="cross" draggable={false} />
                </div>
                <img
                  className={cls(styles.url_img, i === cover ? styles.cover : styles.other)}
                  src={e}
                  alt="preview"
                />
                <div className={styles.cover_selector}>
                  <input
                    className={styles.radio_item}
                    type="radio"
                    key={cover}
                    checked={i === +cover}
                    value={i}
                    onChange={onRadio}
                  />
                  <div>Cover</div>
                </div>
              </div>
            </div>
          ))}

          <form>
            <input
              id="file"
              className={styles.inputfile}
              type="file"
              onChange={(e) => handleImageChange(e)}
            />
            <label htmlFor="file">+</label>
          </form>
        </Slider>

        {/* <p>{progress}</p> */}
      </div>
    </div>
  )
}

Uploader.propTypes = {
  list: T.arrayOf(T.string).isRequired,
  listSet: T.func.isRequired,
  cover: T.number.isRequired,
  setCover: T.func.isRequired,
}

export default Uploader
