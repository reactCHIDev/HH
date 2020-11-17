import React from 'react'
import T from 'prop-types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './image_previewer.module.scss'
import './image_previewer.less'

const ImagePreviewer = (props) => {
  const { images } = props
  const settings = {
    draggable: true,
    touchThreshold: 30,
    useCSS: true,
    swipeToSlide: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging(i) {
      return <img src={images[i]} alt="" className={styles.img} />
    },
    dotsClass: styles.img_preview,
  }

  return (
    <div className={styles.overflow_container}>
      <div className={styles.slider_container}>
        <Slider {...settings}>
          {images.map((image) => (
            <div className={styles.img_container}>
              <img src={image} alt="" className={styles.img} />
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
