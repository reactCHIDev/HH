import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Chef from 'assets/images/signup-flow/svg/chef.svg'
import Taste from 'assets/images/signup-flow/svg/taste.svg'
import Craft from 'assets/images/signup-flow/svg/craft.svg'
import Guide from 'assets/images/signup-flow/svg/guide.svg'
import Pear from 'assets/images/signup-flow/svg/pear.svg'
import Heading from '../../components/heading'
import styles from './businessprofile.module.scss'

const BusinessProfile = ({ onSubmit }) => {
  const [sliderWidth, setWidth] = useState(320)
  const [mouseDownTime, setTimeStamp] = useState(0)

  const handleResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    setWidth(window.innerWidth)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const mouseDown = (e) => {
    setTimeStamp(e.timeStamp)
  }

  const mouseUp = (e) => {
    const time = e.timeStamp - mouseDownTime
    if (time < 200) onSubmit({ businessProfileId: Number(e.currentTarget.id) })
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
      <Heading category="Profile category" name="Okay, you are..." />
      <div className={styles.slider_container}>
        <Slider {...settings}>
          <div className={styles.card_container}>
            <div
              className={styles.img_container}
              id="3"
              onMouseDown={mouseDown}
              onMouseUp={mouseUp}
            >
              <img className={styles.business_chef} src={Chef} alt="small" />
              <p className={styles.profile}>Chef / Baker</p>
              <p className={styles.description}>
                I am a professional or self-taught chef/ baker/ brewer/ mixologist/ farmer/ cheese
                maker chocolatier
              </p>
            </div>
          </div>
          <div className={styles.card_container}>
            <div
              className={styles.img_container}
              id="4"
              onMouseDown={mouseDown}
              onMouseUp={mouseUp}
            >
              <img className={styles.business_taste} src={Taste} alt="medium" />
              <p className={styles.profile}>Taste Maker</p>
              <p className={styles.description}>I am a professional in tasting / teaching</p>
            </div>
          </div>
          <div className={styles.card_container}>
            <div
              className={styles.img_container}
              id="5"
              onMouseDown={mouseDown}
              onMouseUp={mouseUp}
            >
              <img className={styles.business_craft} src={Craft} alt="large" />
              <p className={styles.profile}>Craft Maker</p>
              <p className={styles.description}>I make and teach craft related to food</p>
            </div>
          </div>
          <div className={styles.card_container}>
            <div
              className={styles.img_container}
              id="6"
              onMouseDown={mouseDown}
              onMouseUp={mouseUp}
            >
              <img className={styles.business_guide} src={Guide} alt="large" />
              <p className={styles.profile}>Foodie Guide</p>
              <p className={styles.description}>
                I am local food guide. I love sharing local food gem and culture with others
              </p>
            </div>
          </div>
          <div className={styles.card_container}>
            <div
              className={styles.img_container}
              id="7"
              onMouseDown={mouseDown}
              onMouseUp={mouseUp}
            >
              <img className={styles.business_guide} src={Pear} alt="pear" />
              <p className={styles.profile}>Brand</p>
              <p className={styles.description}>I am a festival or event organiser.</p>
            </div>
          </div>
        </Slider>
      </div>
    </>
  )
}

BusinessProfile.propTypes = {
  onSubmit: T.func,
}

export default BusinessProfile
