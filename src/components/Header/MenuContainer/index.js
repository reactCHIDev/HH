import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { HashLink } from 'react-router-hash-link'
import ForMakers from 'assets/images/header/for_makers.jpg'
import GetHired from 'assets/images/header/gethired.jpg'
import Experience from 'assets/images/header/experience.jpg'
import CreateShop from 'assets/images/header/createshop.jpg'
import FoodExperience from 'assets/images/landings/foodmakers/fm-leading.jpg'
import FoodMakers from 'assets/images/landings/foodmakers/sec2-2.jpg'
import Products from 'assets/images/landings/foodmakers/sec3-3.jpg'
import Blog from 'assets/images/landings/create_shop/sec21.jpg'
import FAQ from 'assets/images/landings/create_shop/sec32.jpg'
import Close from 'assets/images/close-btn-white.svg'
import CloseBlack from 'assets/images/close-btn.svg'
import Youtube from 'assets/images/youtube -white.svg'
import YoutubeBlack from 'assets/images/youtube.svg'
import Instagram from 'assets/images/instagram -white.svg'
import InstagramBlack from 'assets/images/instagram.svg'
import Facebook from 'assets/images/facebook -white.svg'
import FacebookBlack from 'assets/images/facebook.svg'
import UserAvatar from 'assets/images/user-avatar.jpg'
import LogOut from 'assets/images/header/LogOut -gray.svg'
import LogOutBlack from 'assets/images/header/LogOut.svg'

import styles from './menucontainer.module.scss'

const items = {
  foodmakers: [
    { img: ForMakers, heading: 'For Makers', route: '/landing/foodmakers' },
    { img: GetHired, heading: 'Get Hired', route: '/landing/create_profile' },
    { img: Experience, heading: 'Create Experience', route: '/landing/create_experience' },
    { img: CreateShop, heading: 'Create Shop', route: '/landing/create_shop' },
  ],
  explore: [
    { img: FoodExperience, heading: 'Food Experience', route: '/landing/create_experience' },
    { img: FoodMakers, heading: 'Food Makers', route: '/landing/foodmakers' },
    { img: Products, heading: 'Products', route: '/landing/foodmakers' },
    { img: Blog, heading: 'Blog', route: 'https://medium.com/hungryhugger' },
    { img: FAQ, heading: 'FAQ', route: '/landing/foodmakers#faqanchor' },
  ],
}

const MenuContainer = ({
  item,
  dark,
  userPhoto,
  profileName,
  useOutsideClick,
  resetItem,
  setSubmenu,
  setMenu,
}) => {
  const [mounted, setMounted] = useState(false)

  const wrapperRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [mounted])

  const onClick = () => {
    setMenu(false)
    setSubmenu(false)
    resetItem('')
  }

  useOutsideClick(wrapperRef, onClick, 'menu_item-uotsideclick')

  const menuContent = item !== 'all' && item !== '' ? items[item] : items.explore

  return (
    <div
      ref={wrapperRef}
      className={cls(
        styles.container,
        dark ? styles.dark : styles.light,
        mounted ? styles.mount : styles.onstart,
      )}
    >
      <div className={styles.content}>
        <div className={styles.top_mobile_wrapper}>
          <span className={styles.img_close} onClick={onClick}>
            {dark ? (
              <img src={Close} alt="close" width="16" height="16" />
            ) : (
              <img src={CloseBlack} alt="close" width="16" height="16" />
            )}
          </span>

          <ul className={styles.social_header_list}>
            <li>
              <a href="#">
                {dark ? (
                  <img src={Instagram} alt="Instagram" width="22" height="22" />
                ) : (
                  <img src={InstagramBlack} alt="Instagram" width="22" height="22" />
                )}
              </a>
            </li>
            <li>
              <a href="#">
                {dark ? (
                  <img src={Facebook} alt="Facebook" width="12" />
                ) : (
                  <img src={FacebookBlack} alt="Facebook" width="15" />
                )}
              </a>
            </li>
            <li>
              <a href="#">
                {dark ? (
                  <img src={Youtube} alt="Youtube" width="26" height="18" />
                ) : (
                  <img src={YoutubeBlack} alt="Youtube" width="26" height="18" />
                )}
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.center_header_holder}>
          <strong className={styles.content_title}>EXPLORE</strong>
          <ul className={styles.menu_container}>
            {menuContent.map((menuItem, index) => (
              <li key={menuItem.heading} className={styles.item} id={index} onClick={onClick}>
                {menuItem.heading !== 'FAQ' ? (
                  <a href={menuItem.route} target={menuItem.heading === 'Blog' ? '_blank' : ''}>
                    <div className={styles.img_container}>
                      <img className={styles.item_img} src={menuItem.img} alt="hired" />
                    </div>
                  </a>
                ) : (
                  <HashLink to={menuItem.route}>
                    <div className={styles.img_container}>
                      <img className={styles.item_img} src={menuItem.img} alt="hired" />
                    </div>
                  </HashLink>
                )}
                <p className={styles.item_text}>{menuItem.heading}</p>
              </li>
            ))}
          </ul>
          {item === 'all' && (
            <>
              <strong className={styles.content_title}>FOODMAKER</strong>
              <ul className={styles.menu_container}>
                {items.foodmakers.map((menuItem, index) => (
                  <li key={menuItem.heading} className={styles.item} id={index} onClick={onClick}>
                    <a href={menuItem.route} target={menuItem.heading === 'Blog' ? '_blank' : ''}>
                      <div className={styles.img_container}>
                        <img className={styles.item_img} src={menuItem.img} alt="hired" />
                      </div>
                    </a>
                    <p className={styles.item_text}>{menuItem.heading}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className={styles.bottom_holder}>
          <a href="#" className={styles.account_info}>
            <span className={styles.img_holder}>
              <img src={userPhoto} alt="UserAvatar" />
            </span>
            <strong>{profileName}</strong>
          </a>
          <a href="#" className={styles.logout}>
            {dark ? (
              <img src={LogOut} alt="Log out" width="17" />
            ) : (
              <img src={LogOutBlack} alt="Log out" width="17" />
            )}
            Log out
          </a>
        </div>
      </div>
    </div>
  )
}

MenuContainer.propTypes = {
  item: T.string.isRequired,
  dark: T.bool.isRequired,
  click: T.func.isRequired,
  pushRoute: T.func.isRequired,
}

export default connect(null, { pushRoute: push })(MenuContainer)
