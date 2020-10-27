import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Small from 'assets/images/signup-flow/svg/small-business.svg'
import Medium from 'assets/images/signup-flow/svg/medium-business.svg'
import Large from 'assets/images/signup-flow/svg/large-business.svg'
import Heading from '../../components/heading'
import styles from './businesssize.module.scss'

const BusinessSize = ({ onSubmit }) => {
  const [sliderWidth, setWidth] = useState(320)

  const handleResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    setWidth(window.innerWidth)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const onClick = (e) => {
    onSubmit({ businessSizeId: e.currentTarget.id })
  }

  const settings = {
    draggable: true,
    touchThreshold: 30,
    useCSS: true,
    swipeToSlide: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: sliderWidth / 300,
    // slidesToScroll: 1,
  }

  return (
    <>
      <Heading category="Profile category" name="What`s the size of your business?" />
      <div className={styles.slider_container}>
        <Slider {...settings}>
          <div className={styles.card_container}>
            <div className={styles.img_container} id="1" onClick={onClick}>
              <img className={styles.business_small} src={Small} alt="small" />
              <p className={styles.description}>1-5 people</p>
            </div>
          </div>
          <div className={styles.card_container}>
            <div className={styles.img_container} id="2" onClick={onClick}>
              <img className={styles.business_medium} src={Medium} alt="medium" />
              <p className={styles.description}>6-20 people</p>
            </div>
          </div>
          <div className={styles.card_container}>
            <div className={styles.img_container} id="3" onClick={onClick}>
              <img className={styles.business_large} src={Large} alt="large" />
              <p className={styles.description}>20+ people</p>
            </div>
          </div>
        </Slider>
      </div>
    </>
  )
}

BusinessSize.propTypes = {
  onSubmit: T.func,
}

export default BusinessSize
