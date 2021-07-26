/* eslint-disable react/prop-types */
import React from 'react'

import cls from 'classnames'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styles from './tags.module.scss'

const Tags = ({ tags }) => {
  const settings = React.useMemo(
    () => ({
      draggable: true,
      touchThreshold: 30,
      useCSS: true,
      swipeToSlide: true,
      arrows: false,
      infinite: true,
      speed: 500,
      variableWidth: true,
    }),
    [],
  )

  return (
    <div className={styles.tags}>
      <span className={styles.selection}>ALL</span>
      <div className={cls(styles.slider_container, 'slick_container')}>
        <Slider {...settings}>
          {tags.map((tag) => (
            <div className={styles.preview_container}>
              <div className={styles.tag}>{tag.toUpperCase()}</div>
            </div>
          ))}
        </Slider>
        <div className={styles.tags_rectangle} />
      </div>
    </div>
  )
}

export default Tags
