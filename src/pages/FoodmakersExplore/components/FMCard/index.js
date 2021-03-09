/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import avatar from 'assets/TMP-AVATAR.jpg'
import AvatarPlaceholder from 'components/AvatarPlaceholder'
import { push } from 'connected-react-router'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Rate } from 'antd'
import cls from 'classnames'
import styles from './fmcard.module.scss'
import './fmcard.less'

const FMCard = ({ item }) => {
  function SampleNextArrow(props) {
    const { className, onClick } = props
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <div className={className} onClick={onClick} />
      </div>
    )
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <div className={className} onClick={onClick} />
      </div>
    )
  }

  const settings = useMemo(
    () => ({
      draggable: true,
      touchThreshold: 30,
      useCSS: true,
      swipeToSlide: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4.2,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      arrows: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4.2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3.2,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2.2,
          },
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 2.2,
          },
        },
      ],
    }),
    [],
  )
  const photos = item.otherPhotos ? [...item.otherPhotos, item.coverPhoto] : [item.coverPhoto]

  const dispatch = useDispatch()

  const pushRoute = () => {
    dispatch(push(`/${item.hungryHuggerLink?.split('/').pop()}`))
  }

  return (
    <div className={styles.container} key={item.id} onClick={() => pushRoute()}>
      <div className={styles.content}>
        <div className={styles.fm_card}>
          <div className={styles.avatar_container}>
            {item.userPhoto ? (
              <img src={item.userPhoto || avatar} alt="avatar" />
            ) : (
              <AvatarPlaceholder width={96} />
            )}
          </div>
          <div className={styles.fm_card_info}>
            <div className={styles.fm_card_name}>
              {item.profileName}
              <div className={cls(styles.fm_card_stats, 'rating')}>
                <Rate style={{ color: '#31394C' }} disabled defaultValue={item.rating} />
                <span>({`${item.votes || 0}`})</span>
              </div>
            </div>
            <p className={styles.timestamp}>{item.about}</p>
            <p className={styles.autor}>
              {item.tags && item.tags.map((el, i) => <span key={el}>{(i ? ', ' : '') + el}</span>)}
            </p>
            <button type="button" className={styles.message_btn}>
              <svg
                width="18"
                height="15"
                viewBox="0 0 18 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="1" width="16" height="12.5714" rx="3" stroke="#31394D" />
                <path
                  d="M2 3L7.83752 7.16966C8.53292 7.66637 9.46708 7.66637 10.1625 7.16966L16 3"
                  stroke="#31394D"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.slider_container}>
          <Slider {...settings}>
            {photos.map((el) => (
              <div className={styles.preview_container} key={el}>
                <span
                  onClick={(e) => e.stopPropagation()}
                  style={{ backgroundImage: `url("${el}")` }}
                  className={styles.preview_img_clear}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

FMCard.propTypes = {}

export default FMCard
