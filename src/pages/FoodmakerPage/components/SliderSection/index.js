/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import cls from 'classnames'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './slider.module.scss'
import './slider.less'

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        right: 50,
        transform: 'translate(50%,0)',
        width: 50,
      }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        left: 50,
        transform: 'translate(-50%,0)',
        width: 50,
      }}
      onClick={onClick}
    />
  )
}

const SliderSection = (props) => {
  const { gallery } = props

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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  const previewSettings = {
    draggable: true,
    touchThreshold: 30,
    useCSS: true,
    swipeToSlide: true,
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    variableWidth: true,
    centerMode: true
  }

  const onClick = (e) => {
    setIndex(e.currentTarget.id)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={cls(styles.slider_container, 'slider')}>
          <Slider {...settings} ref={slider} asNavFor={slider2}>
            {gallery.map((e, i) => (
              <div className='main_slider_container'>
                <div
                  key={e}
                  className={styles.img_container}
                  style={{
                    width: 900,
                    height: 640,
                    backgroundImage: `url("${e}")`,
                    backgroundSize: 'cover',
                    backgrounPosition: '50% 0',
                  }}
                >
                  {/* <img className={styles.slider_img} src={e} alt="" /> */}
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className={styles.preview_slider_container} ref={container}>
          <Slider {...previewSettings} ref={previewSlider} asNavFor={slider1}>
            {gallery.map((e, i) => (
              <div
                key={e}
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
                  <img className={cls(styles.preview_slider_img)} src={e} alt="" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* <div className={styles.product_book}>
          <div className={styles.descr_container}>
            <div className={styles.description}>
              Michelin-starred chef Rishi Nalindra Cultural Dinner: Art, Music and Fun
            </div>
            <div className={styles.stats_container}>
              <p className={styles.exp_price}>FROM $650</p>
              <div className={cls(styles.rating_container, 'rating')}>
                <Rate style={{ color: '#31394C' }} disabled defaultValue={3} />
                <p className={styles.qauntity}>(0)</p>
              </div>
            </div>
          </div>
          <div className={styles.btn}>
            <Button title="Book now" />
          </div>
        </div> */}
      </div>
    </div>
  )
}

SliderSection.propTypes = {}

export default SliderSection
