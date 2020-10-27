import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import cls from 'classnames'
import Plate from 'assets/images/signup-flow/svg/plate.svg'
import Apple from 'assets/images/signup-flow/svg/apple.svg'
import Hire from 'assets/images/signup-flow/svg/hire.svg'
import Check from 'assets/images/signup-flow/svg/check.svg'
import Heading from '../../components/heading'
import styles from './serviceoffering.module.scss'

const BusinessSize = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  const [options, addOptions] = useState([])

  const [sliderWidth, setWidth] = useState(320)

  const handleResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    addOptions(value)
    window.addEventListener('resize', handleResize)
    setWidth(window.innerWidth)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const onClick = (e) => {
    onSubmit({ businessServiceIds: options.sort() })
  }

  const onSelect = (e) => {
    const { id } = e.currentTarget
    if (options.includes(id)) {
      addOptions(options.filter((e) => e !== id))
    } else {
      addOptions(options.concat([id]))
    }
  }

  const settings = {
    draggable: true,
    touchThreshold: 30,
    useCSS: true,
    swipeToSlide: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: sliderWidth / 300,
    // slidesToScroll: 1,
  }

  return (
    <>
      <Heading category="Profile details" name="Service offering" />
      <div className={styles.slider_container}>
        <Slider {...settings}>
          <div className={styles.card_container}>
            <div
              className={cls(
                styles.img_container,
                options.includes('1') ? styles.img_container_active : styles.img_container_inactive,
              )}
              id="1"
              onClick={onSelect}
            >
              <img
                className={options.includes('1') ? styles.check_on : styles.check_off}
                src={Check}
                alt="check"
              />
              <img className={styles.business_plate} src={Plate} alt="small" />
              <p className={styles.profile}>Experiences</p>
              <p className={styles.description}>
                I provide experiences and/or activities as a service
              </p>
            </div>
          </div>
          <div className={styles.card_container}>
            <div
              className={cls(
                styles.img_container,
                options.includes('2') ? styles.img_container_active : styles.img_container_inactive,
              )}
              id="2"
              onClick={onSelect}
            >
              <img
                className={options.includes('2') ? styles.check_on : styles.check_off}
                src={Check}
                alt="check"
              />
              <img className={styles.business_apple} src={Apple} alt="medium" />
              <p className={styles.profile}>Products</p>
              <p className={styles.description}>
                I sell physical goods (food, beverage, craftgoods).
              </p>
            </div>
          </div>
          <div className={styles.card_container}>
            <div
              className={cls(
                styles.img_container,
                options.includes('3') ? styles.img_container_active : styles.img_container_inactive,
              )}
              id="3"
              onClick={onSelect}
            >
              <img
                className={options.includes('3') ? styles.check_on : styles.check_off}
                src={Check}
                alt="check"
              />
              <img className={styles.business_hire} src={Hire} alt="large" />
              <p className={styles.profile}>Private Hire</p>
              <p className={styles.description}>I am available to be hired directly.</p>
            </div>
          </div>
        </Slider>
        <input
          className={styles.next_btn}
          disabled={!options.length}
          onClick={onClick}
          type="button"
          value="Next  >"
        />
      </div>
    </>
  )
}

BusinessSize.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default BusinessSize
