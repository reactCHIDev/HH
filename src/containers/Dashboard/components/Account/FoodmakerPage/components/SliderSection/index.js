import React from 'react'
import T from 'prop-types'
import Slider from 'react-slick'
import leading from 'assets/images/landings/foodmakers/fm-leading.jpg'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './slider.module.scss'

const SliderSection = (props) => {
  const { x } = props

  const settings = {
    draggable: true,
    touchThreshold: 30,
    useCSS: true,
    swipeToSlide: true,
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.slider_container}>
          <Slider {...settings}>
            <div className={styles.img_container}>
              <img className={styles.slider_img} src={leading} alt="" />
            </div>
            <div className={styles.img_container}>
              <img className={styles.slider_img} src={leading} alt="" />
            </div>
            <div className={styles.img_container}>
              <img className={styles.slider_img} src={leading} alt="" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

SliderSection.propTypes = {
  a: T.number.isRequired,
  b: T.string.isRequired,
  c: T.bool.isRequired,
  f: T.func.isRequired,
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }).isRequired,
  }).isRequired,
}

export default SliderSection
