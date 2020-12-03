import React, { useState, useCallback, useMemo } from 'react'
import T from 'prop-types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './image_previewer.module.scss'
import './image_previewer.less'

const ImagePreviewer = (props) => {
  const { images } = props
  const [selectedImage, setSelectedImage] = useState(images[0])

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

  const handleImageClick = useCallback((e) => setSelectedImage(e.target.src))

  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <img src={selectedImage} alt="" className={styles.img} />
      </div>
      <div className={styles.slider_container}>
        <Slider {...settings}>
          {images.map((image) => (
            <div className={styles.preview_container}>
              <img src={image} alt="" className={styles.preview_img} onClick={handleImageClick} />
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
