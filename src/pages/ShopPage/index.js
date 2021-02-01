/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable prefer-template */
import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { useParams, Link } from 'react-router-dom'
import { Spin, Space, Rate } from 'antd'
import { getFoodmakerInfoAC } from 'actions/foodmaker'
import { getProductInfoRequestAC } from 'actions/product'
import { getShopByFoodmakerIdAC, getShopByUrlAC } from 'actions/shop'
import toggleFavouriteAc from 'actions/favourites'

import PageNotFound from 'components/PageNotFound'
import Button from 'components/Button'
import ProdCard from 'components/ProductCard'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import avatar from 'assets/TMP-AVATAR.jpg'
import sec21 from 'assets/images/landings/create_profile/sec21.jpg'
import mapMarker from 'assets/icons/svg/map_marker gray.svg'
import redLikeHeart from 'assets/icons/svg/red.svg'
import likeHeart from 'assets/icons/svg/like_heart.svg'

import envelope from 'assets/icons/svg/envelope white.svg'
import coverPhoto from 'assets/images/landings/foodmakers/fm-leading.jpg'
import acessorieFm from 'assets/icons/svg/FM_page_acessorie.svg'
import './shop_page.less'
import Pattern2 from 'assets/images/pattern 2.svg'
import Shop from 'assets/images/landings/create_shop/shop.svg'
import Avatar from 'assets/images/landings/create_shop/avatar.jpg'
import styles from './shop_page.module.scss'

const ShopPage = (props) => {
  const {
    fm,
    product,
    pushRoute,
    shop,
    getFoodmakerInfoAC,
    getProductInfoRequestAC,
    getShopByFoodmakerIdAC,
    getShopByUrlAC,
    toggleFavouriteAc,
  } = props

  const { shopName } = useParams()

  const [productCount, setProductCount] = useState(6)
  const [isFavorite, setIsFavorite] = React.useState('')
  const [inFavorite, setInFavoite] = React.useState(0)
  console.log(shop)

  const name = fm.firstName ? fm.firstName + ' ' + fm.lastName : ''

  const onLikeCLick = () => {
    if (isFavorite) {
      setInFavoite((c) => c - 1)
    } else {
      setInFavoite((c) => c + 1)
    }
    setIsFavorite((f) => !f)
    toggleFavouriteAc({ id: shop.id, type: 'shop' })
  }

  useEffect(() => {
    getShopByUrlAC(`${process.env.REACT_APP_BASE_URL}/shop/${shopName}`)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (shop?.userProfile) getFoodmakerInfoAC(shop.userProfile.id)
    setInFavoite(shop.inFavorite)
    setIsFavorite(shop.isFavorite)
  }, [shop])

  const showMore = () => setProductCount((c) => c + 6)

  const openFoodmaker = () => pushRoute(`/${fm.hungryHuggerLink.split('/').pop()}`)

  if (shop === 'Shop does not exist') return <PageNotFound msg={`Shop "${shopName}" Not Found`} />

  if (!shop || shop.shopUrl !== `${process.env.REACT_APP_BASE_URL}/shop/${shopName}`)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    )
  console.log('%c   fm   ', 'color: darkgreen; background: palegreen;', fm)
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.pattern}>
          <img src={Pattern2} alt="Pattern2" />
        </div>
        <div className={styles.container}>
          <div className={styles.info_section}>
            <div className={styles.location}>
              <div className={styles.maker_location}>
                <img className={styles.map_marker} src={mapMarker} alt="marker" />
                <p className={styles.from}>
                  Shop from <span className={styles.city}>{fm.city}</span>
                </p>
              </div>
              <div className={styles.rating_container}>
                <Rate style={{ color: '#EB5769' }} disabled defaultValue={fm.rating} />
                <p className={styles.qauntity}>(0)</p>
              </div>
            </div>
            <p className={styles.first_last_name}>{shop.title}</p>
            <div className={styles.descr}>
              <p>Event hire, custom made, catering.</p>
              <p>Quick and Easy Vegan Comfort Food. Feel free to get in touch!</p>
            </div>
            <div className={styles.btn_block}>
              <div className={styles.fav_button} onClick={() => onLikeCLick()}>
                <img
                  className={styles.heart}
                  src={isFavorite ? redLikeHeart : likeHeart}
                  alt="heart"
                />
                <p className={styles.btn_text}>Favorite Shop</p>
                <span className={styles.likes}>{`(${inFavorite})`}</span>
              </div>
              <Link
              /* to={{
                  pathname: '/messages',
                  state: { id: fm.userId, profileName: fm.profileName, userPhoto: fm.userPhoto },
                }} */
              >
                <div className={styles.send_msg}>
                  <img className={styles.heart} src={envelope} alt="envelope" />
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.photo_section}>
            <div className={styles.cover_photo_container}>
              {shop.coverPhoto ? (
                <img className={styles.cover_photo} src={shop.coverPhoto} alt="envelope" />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.content_container}>
            <div className={styles.section_experiences}>
              <div className={styles.exp_container}>
                {shop.products &&
                  shop.products.length &&
                  shop.products.slice(0, productCount).map((e) => (
                    <ProdCard
                      key={e.id}
                      id={e.id}
                      pushRoute={pushRoute}
                      pathname="/product"
                      photo={e.coverPhoto}
                      tags={e.productTags.map((tag) => tag.tagName)}
                      name={e.title}
                      price={e.price}
                      rating={e.rating}
                      product={e}
                      // rateCount={32}
                    />
                  ))}
              </div>
              {/* <div className={styles.exp_btn_container}>
                <Button title="More products" dark onClick={showMore} />
              </div> */}
            </div>

            <div className={styles.about_shop_container}>
              <div className={styles.about_shop}>
                <img className={styles.acc} src={Shop} alt="Shop" />
                <p className={styles.heading}>A few words about the shop</p>
                <p className={styles.about_text}>{shop.description}</p>
                <div className={styles.shop_autor} onClick={openFoodmaker}>
                  <img src={fm.userPhoto} alt="Avatar" className={styles.avatar} />
                  <div className={styles.text_holder}>
                    <span className={styles.owner}>Shop owner</span>
                    <strong className={styles.title}>{name}</strong>
                    <p>{fm.about}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

ShopPage.propTypes = {
  location: T.shape(),
  fm: T.shape(),
  shop: T.shape(),
  getFoodmakerInfoAC: T.func.isRequired,
  getProductInfoRequestAC: T.func.isRequired,
  getShopByFoodmakerIdAC: T.func.isRequired,
  getShopByUrlAC: T.func.isRequired,
  pushRoute: T.func.isRequired,
}

export default connect(({ foodmaker, shop }) => ({ fm: foodmaker, shop: shop.shopData }), {
  getFoodmakerInfoAC,
  getProductInfoRequestAC,
  getShopByFoodmakerIdAC,
  getShopByUrlAC,
  pushRoute: push,
  toggleFavouriteAc,
})(ShopPage)
