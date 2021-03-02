import React, { useState, useEffect, useCallback, useMemo } from 'react'
import T from 'prop-types'
import cls from 'classnames'
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
      slidesToScroll: 1,
      arrows: true,
      slidesToShow: 3.8,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 3.2,
          },
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 2.2,
          },
        },
      ],
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
      <div className={cls(styles.slider_container, 'slick_container')}>
        <Slider {...settings}>
          {images.map((image) => (
            <div
              key={image}
              className={styles.preview_container}
              id={image}
              onClick={handleImageClick}
            >
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
