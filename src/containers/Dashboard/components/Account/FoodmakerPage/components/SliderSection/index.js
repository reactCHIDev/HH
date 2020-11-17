import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import Slider from 'react-slick'
import leading from 'assets/images/landings/foodmakers/fm-leading.jpg'
import cls from 'classnames'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './slider.module.scss'
import { sortedIndex } from 'lodash'

const SliderSection = (props) => {
  const { x } = props
  const [slider1, setSlider1] = useState(null)
  const [slider2, setSlider2] = useState(null)
  const [index, setIndex] = useState(0)

  const slider = useRef(null)
  const previewSlider = useRef(null)

  useEffect(() => {
    setSlider1(slider.current)
    setSlider2(previewSlider.current)
  }, [])

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
  const previewSettings = {
    draggable: true,
    touchThreshold: 30,
    useCSS: true,
    swipeToSlide: true,
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    afterChange: (i) => {
      setIndex(i)
    },
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.slider_container}>
          <Slider {...settings} ref={slider} asNavFor={slider2}>
            {[1, 1, 1, 1, 1, 1].map((e, i) => (
              <div className={styles.img_container}>
                <img className={styles.slider_img} src={leading} alt="" />
              </div>
            ))}
          </Slider>
        </div>
        <div className={styles.preview_slider_container}>
          <Slider {...previewSettings} ref={previewSlider} asNavFor={slider1}>
            {[1, 1, 1, 1, 1, 1].map((e, i) => (
              <div className={styles.img_container}>
                <img
                  className={cls(styles.slider_img, i === index ? styles.active : '')}
                  src={leading}
                  alt=""
                />
              </div>
            ))}
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
