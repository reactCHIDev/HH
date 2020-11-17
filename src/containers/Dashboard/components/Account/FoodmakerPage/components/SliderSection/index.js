import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import { Rate } from 'antd'
import Slider from 'react-slick'
import leading from 'assets/images/landings/foodmakers/fm-leading.jpg'
import Button from 'components/Button'
import cls from 'classnames'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './slider.module.scss'

const SliderSection = (props) => {
  const {} = props

  const [containerWidth, setWidth] = useState(0)
  const [slider1, setSlider1] = useState(null)
  const [slider2, setSlider2] = useState(null)
  const [index, setIndex] = useState(0)

  const slider = useRef(null)
  const previewSlider = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    setSlider1(slider.current)
    setSlider2(previewSlider.current)
    if (container?.current) setWidth(container.current.offsetWidth)
  }, [])

  const handleResize = () => {
    if (container?.current) setWidth(container.current.offsetWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
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
    afterChange: (i) => {
      setIndex(i)
    },
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
    slidesToShow: containerWidth / 160,
    slidesToScroll: 1,
    focusOnSelect: true,
  }

  const onClick = (e) => setIndex(e.currentTarget.id)

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
        <div className={styles.preview_slider_container} ref={container}>
          <Slider {...previewSettings} ref={previewSlider} asNavFor={slider1}>
            {[1, 1, 1, 1, 1, 1].map((e, i) => (
              <div
                className={cls(
                  styles.preview_container,
                  i === index ? styles.active_preview_container : '',
                )}
              >
                <div
                  className={cls(styles.preview_img_container, i === index ? styles.active : '')}
                  id={i}
                  onClick={onClick}
                >
                  <img className={cls(styles.preview_slider_img)} src={leading} alt="" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className={styles.product_book}>
          <div className={styles.descr_container}>
            <div className={styles.description}>
              Michelin-starred chef Rishi Nalindra Cultural Dinner: Art, Music and Fun
            </div>
            <div className={styles.stats_container}>
              <p className={styles.exp_price}>FROM $650</p>
              <div className={cls(styles.rating_container, 'rating')}>
                <Rate style={{ color: '#31394C' }} disabled defaultValue={3} />
                <p className={styles.qauntity}>(8)</p>
              </div>
            </div>
          </div>
          <div className={styles.btn}>
            <Button title="Book now" />
          </div>
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
