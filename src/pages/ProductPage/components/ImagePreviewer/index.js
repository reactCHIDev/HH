import React, { useState, useEffect, useCallback, useMemo } from 'react'
import T from 'prop-types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './image_previewer.module.scss'
import './image_previewer.less'

const ImagePreviewer = (props) => {
  const { images } = props
  const [selectedImage, setSelectedImage] = useState(images[0])

  useEffect(() => {
    setSelectedImage(images[0])
  }, [images])

  const settings = useMemo(
    () => ({
      draggable: true,
      touchThreshold: 30,
      useCSS: true,
      swipeToSlide: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
    }),
    [],
  )

  const handleImageClick = useCallback((e) => {
    setSelectedImage(e.currentTarget.id)
  })

  return (
    <div className={styles.container}>
      <div
        className={styles.img_container}
        style={{ backgroundImage: `url("${selectedImage}")` }}
      ></div>
      <div className={styles.slider_container}>
        <Slider {...settings}>
          {images.map((image) => (
            <div className={styles.preview_container} id={image} onClick={handleImageClick}>
              <span
                style={{ backgroundImage: `url("${image}")` }}
                className={image === selectedImage ? styles.preview_img_clear : styles.preview_img}
              ></span>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

ImagePreviewer.propTypes = {
  images: T.arrayOf(T.string).isRequired,
}

export default ImagePreviewer
