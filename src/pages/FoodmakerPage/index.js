/* eslint-disable no-shadow */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import {connect, useSelector} from 'react-redux'
import { push } from 'connected-react-router'
import { Redirect, Link, useParams } from 'react-router-dom'
import cls from 'classnames'
import { Spin, Space, Rate } from 'antd'
import { getFoodmakerInfoAC, getFoodmakerInfoByNameAC } from 'actions/foodmaker'
import {getUserAccount, getUserByLinkAC} from 'actions/account'
import toggleFavouriteAc from 'actions/favourites'
import AvatarPlaceholder from 'components/AvatarPlaceholder'

import { getShopByFoodmakerIdAC } from 'actions/shop'
import { resolveFoodmakerDataAC } from 'actions/pages'
import Button from 'components/Button'
import ExpCard from 'components/ExperienceCard'
import PageNotFound from 'components/PageNotFound'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import avatar from 'assets/TMP-AVATAR.jpg'
import sec21 from 'assets/images/landings/create_profile/sec21.jpg'
import mapMarker from 'assets/icons/svg/map_marker.svg'
import likeHeart from 'assets/icons/svg/like_heart.svg'
import redLikeHeart from 'assets/icons/svg/red.svg'

import envelope from 'assets/icons/svg/envelope.svg'
import review from 'assets/images/signup-flow/svg/medium-business.svg'
import coverPhoto from 'assets/images/landings/foodmakers/fm-leading.jpg'
import acessorieFm from 'assets/icons/svg/FM_page_acessorie.svg'
import Review from './components/Review'
import SliderSection from './components/SliderSection'
import styles from './foodmaker_page.module.scss'
import './foodmaker_page.less'
import {useHistory} from "react-router";

const FoodmakerPage = (props) => {
  const {
    fm,
    shop,
    resolveFoodmakerDataAC,
    pushRoute,
    toggleFavouriteAc,
    isAuth
    /* getUserByLink,
    getFoodmakerInfoAC,
    getFoodmakerInfoByNameAC,
    getShopByFoodmakerIdAC,
    account, */
  } = props

  const { userName } = useParams()
  const history = useHistory()

  const [readMore, setReadMore] = useState(false)
  const [gallery, setGallery] = useState([])
  const [isFavorite, setIsFavorite] = React.useState('')
  const [inFavorite, setInFavoite] = React.useState()

  useEffect(() => {
    resolveFoodmakerDataAC(`${process.env.REACT_APP_BASE_URL}/${userName}`)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (fm?.id) {
      setGallery([fm.coverPhoto].concat(fm.otherPhotos))
      setIsFavorite(fm.isFavorite)
      setInFavoite(fm.inFavorite)
      window.scrollTo(0, 0)
    }
  }, [fm])

  const onLikeCLick = () => {
    if (isAuth) {
      if (isFavorite) {
        setInFavoite((c) => c - 1)
      } else {
        setInFavoite((c) => c + 1)
      }
      setIsFavorite((f) => !f)
      toggleFavouriteAc({id: fm.id, type: 'foodmaker'})
    } else history.push('/login')
  }

  const onReadMore = () => setReadMore(!readMore)

  const openShop = () => pushRoute(`/shop/${shop.shopUrl.split('/').pop()}`)

  if (!fm || fm.hungryHuggerLink !== `${process.env.REACT_APP_BASE_URL}/${userName}`)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    )
  return (
    <div className={styles.frame}>
      <div className={styles.header}>
        <div className={cls(styles.container, 'container')}>
          <div className={styles.info_section}>
            <div className={styles.avatar_container}>
              {fm.userPhoto ? (
                <img src={fm.userPhoto} alt="avatar" />
              ) : (
                <AvatarPlaceholder width={85} />
              )}
            </div>
            <div className={styles.location}>
              <div className={styles.maker_location}>
                <img className={styles.map_marker} src={mapMarker} alt="marker" />
                <p className={styles.from}>
                  Maker from <span className={styles.city}>{fm.city}</span>
                </p>
              </div>
              <div className={styles.rating_container}>
                <Rate style={{ color: '#EB5769' }} disabled value={fm.rating} />
                <p className={styles.qauntity}>(0)</p>
              </div>
            </div>
            <p className={styles.first_last_name}>{fm.profileName}</p>
            <div className={styles.descr}>
              <div className={styles.tags}>{fm.tags?.length && fm.tags.join(', ')}</div>
            </div>
            <div className={styles.btn_block}>
              <div onClick={() => onLikeCLick()} className={styles.fav_button}>
                <img
                  className={styles.heart}
                  src={isFavorite ? redLikeHeart : likeHeart}
                  alt="heart"
                />
                <p className={styles.btn_text}>Favorite Maker</p>
                <p className={styles.likes}>{`(${inFavorite})`}</p>
              </div>
              <Link
                to={{
                  pathname: '/messages',
                  state: { id: fm.userId, profileName: fm.profileName, userPhoto: fm.userPhoto },
                }}
              >
                <div className={styles.send_msg}>
                  <img className={styles.heart} src={envelope} alt="envelope" />
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.photo_section}>
            <div className={styles.cover_photo_container}>
              <img className={styles.cover_photo} src={fm?.coverPhoto} alt="envelope" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.conteiner}>
        <div className={styles.section_about}>
          <div className={styles.about_shop_container}>
            <div className={styles.about_shop}>
              <div className={styles.about_header}>
                <img className={styles.shop_icon} src={fm?.coverPhoto} alt="icon" />
                <div>
                  <p className={styles.shop_owner}>{`SHOP OF ${fm.firstName}`}</p>
                  <p className={styles.shop_name}>{shop?.title}</p>
                </div>
              </div>
              <p className={styles.shop_descr}>{shop?.description}</p>
              <div className={styles.btn_container}>
                {/* <Link to={{ pathname: '/shop_page', state: fm.id }}> */}
                <Button title="Visit shop" onClick={shop?.shopUrl ? openShop : null} />
                {/* </Link> */}
              </div>
            </div>
          </div>
          <div className={styles.about_me_container}>
            <div className={styles.about_me} onClick={onReadMore}>
              <img className={styles.acc} src={acessorieFm} alt="acc" />
              <p className={styles.heading}>Let???s talk about me {';)'} </p>
              <p className={styles.about_text}>
                {readMore && fm?.about ? fm.about : fm?.about?.substring(0, 350) || ''}
                {!readMore && fm?.about?.length > 350 && (
                  <span className={styles.readmore} onClick={onReadMore}>
                    Read more...
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.slider_section}>
          <SliderSection gallery={gallery} />
        </div>
      </div>
      <div className={styles.bottom_section_container}>
        <BottomSection />
      </div>
      <div className={styles.footer_container}>
        <Footer />
      </div>
    </div>
  )
}

FoodmakerPage.propTypes = {
  resolveFoodmakerDataAC: T.func.isRequired,
  pushRoute: T.func.isRequired,
  fm: T.shape(),
  shop: T.shape(),
  toggleFavouriteAc: T.func.isRequired,
  /* getFoodmakerInfoAC: T.func.isRequired,
  getFoodmakerInfoByNameAC: T.func.isRequired,
  getUserByLink: T.func.isRequired,
  getShopByFoodmakerIdAC: T.func.isRequired, */
}

export default connect(({ pages, login }) => ({ fm: pages.foodmakerData, shop: pages.shopData, isAuth: login.authorized}), {
  getFoodmakerInfoAC,
  getFoodmakerInfoByNameAC,
  getShopByFoodmakerIdAC,
  pushRoute: push,
  getUserByLink: getUserByLinkAC,
  resolveFoodmakerDataAC,
  toggleFavouriteAc
})(FoodmakerPage)
