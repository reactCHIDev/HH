/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { logout } from 'actions/login'
import cls from 'classnames'
import useOutsideClick from 'utils/outsideClick'
import { getUserAccount } from 'actions/account'
import MenuContainer from 'components/Header/MenuContainer'
import MenuBtn from 'components/MenuCrosshair'
import LogoDark from 'assets/images/header/logo_dark.svg'
import LogoWhite from 'assets/images/logo_nobeta.svg'
// import LogoWhite from 'assets/images/header/logo-white.svg'
import textLogo from 'assets/images/header/logo_text_beta.svg'
import ArrowWhite from 'assets/icons/svg/down-arrow-white.svg'
import ArrowDark from 'assets/icons/svg/down-arrow.svg'
import './header.less'
import Cup from 'assets/images/header/cup.svg'
import Gallery_icon from 'assets/images/header/Component 150.svg'
import Gallery_icon_1 from 'assets/images/header/Component 148.svg'
import Person from 'assets/icons/svg//person.svg'
import Setting from 'assets/images/header/Setting.svg'
import LogOut from 'assets/images/header/LogOut.svg'
import textLogoBlue from 'assets/images/header/logo_text_beta_blue.svg'
import Avatar from './components/Avatar'
import styles from './header.module.scss'

const Header = (props) => {
  const {
    authorized,
    id,
    role,
    userPhoto,
    profileName,
    shop,
    newMessages,
    logOut,
    pathname,
    pushRoute,
    getUserAccount,
    products,
  } = props

  const [menu, setMenu] = useState(false)
  const [settings, setSettings] = useState(false)
  const [isSubmenu, setSubmenu] = useState(false)
  const [item, setItem] = useState('')

  const settingsСontainer = useRef(null)

  const lightTheme = [
    '/signupflow',
    '/foodmaker_dashboard',
    '/product_dashboard',
    '/experience_dashboard',
    '/fm_order_info',
    '/messages',
    '/account_info',
    '/order_info',
    '/addproduct',
    '/editproduct',
    '/addexperience',
    '/editexperience',
    '/shop/',
    '/product/',
    '/settings/',
    '/cart',
    '/landing/create_experience',
    '/landing/foodmakers',
    '/landing/create_profile',
    '/landing/create_shop',
  ]

  const darkTheme = ['']

  const dark = !lightTheme.some((e) => pathname.includes(e))
  const isTextLogo = ['/shop/', '/product/'].some((e) => pathname.includes(e))

  useEffect(() => {
    if (id) {
      getUserAccount(id)
    }
  }, [])

  const clickLogo = () => {
    if (menu) setMenu(!menu)
    pushRoute('/')
  }

  const toggleMenu = () => {
    if (!menu) {
      setMenu(true)
      setItem('all')
    } else {
      setMenu(false)
      setSubmenu(false)
      setItem('')
    }
  }

  const switchMenu = () => {
    if (!isSubmenu) {
      setSubmenu(true)
    } else {
      setItem('')
      setSubmenu(false)
    }
  }

  const menuItemClick = (e) => {
    const { id } = e.currentTarget
    if (id === item) {
      switchMenu()
      return
    }
    if (id !== item && item !== '') {
      setItem(id)
      return
    }
    if (item === '') {
      switchMenu()
      setItem(id)
    }
  }

  /*  const menuItemClick = () => {
    setSubmenu(!isSubmenu)
  } */

  const onSettings = () => setSettings((s) => !s)
  const onSettingsSelect = () => setSettings((s) => !s)

  useOutsideClick(settingsСontainer, onSettings)

  const logout = () => {
    logOut()
    onSettings()
  }

  const getPath = () => {
    if (role === 'FOODMAKER') return '/product_dashboard/profile'
    if (role === 'FOODLOVER') return '/account_info'
  }

  return (
    <header className={cls(styles.header, dark ? styles.dark : styles.light)}>
      <div className={styles.container}>
        <div className={styles.menu_btn} onClick={toggleMenu}>
          <MenuBtn visible={menu} dark={dark} />
        </div>
        <div className={styles.logo} onClick={clickLogo}>
          <img className={styles.logo_img} src={dark ? LogoDark : LogoWhite} alt="logo" />
          {dark ? (
            <img className={styles.logo_text} src={textLogo} alt="hh" />
          ) : isTextLogo ? (
            <img className={styles.logo_text} src={textLogoBlue} alt="hh" />
          ) : null}
        </div>
        <ul className={cls(styles.menu, menu ? styles.on : styles.off)}>
          <li
            className={cls(styles.menuitem, 'menu_item-uotsideclick')}
            id="explore"
            onClick={menuItemClick}
          >
            EXPLORE
            <svg
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L5 5L9 1" stroke={dark ? 'white' : 'black'} strokeWidth="1.5" />
            </svg>
          </li>
          <li
            className={cls(styles.menuitem, 'menu_item-uotsideclick')}
            id="foodmakers"
            onClick={menuItemClick}
          >
            FOR FOOD MAKERS
            <svg
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L5 5L9 1" stroke={dark ? 'white' : 'black'} strokeWidth="1.5" />
            </svg>
          </li>
        </ul>
        <ul className={styles.options}>
          <li>
            <Link to="/">
              <div>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="11.5"
                    cy="11.5"
                    r="8.75"
                    stroke={dark ? 'white' : '#31394D'}
                    strokeWidth="1.5"
                  />
                  <path d="M18 18L22 22" stroke={dark ? 'white' : '#31394D'} strokeWidth="1.5" />
                </svg>
              </div>
            </Link>
          </li>
          {authorized && (
            <li className={styles.hide} style={{ opacity: 0.5 }}>
              <div>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.4134 4.76153C19.3781 3.62561 17.9575 3 16.413 3C15.2585 3 14.2012 3.36922 13.2704 4.09733C12.8008 4.46486 12.3752 4.9145 12 5.43932C11.6249 4.91466 11.1992 4.46486 10.7294 4.09733C9.79877 3.36922 8.74149 3 7.58701 3C6.04251 3 4.62177 3.62561 3.58646 4.76153C2.56351 5.88418 2 7.41788 2 9.08032C2 10.7914 2.63034 12.3576 3.98364 14.0096C5.19427 15.4873 6.93423 16.9873 8.94916 18.7243C9.63718 19.3175 10.4171 19.9899 11.2268 20.7061C11.4408 20.8957 11.7153 21 12 21C12.2846 21 12.5592 20.8957 12.7729 20.7064C13.5826 19.99 14.363 19.3173 15.0513 18.7238C17.0659 16.9872 18.8059 15.4873 20.0165 14.0094C21.3698 12.3576 22 10.7914 22 9.08016C22 7.41788 21.4365 5.88418 20.4134 4.76153Z"
                    stroke={dark ? 'white' : '#31394D'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </li>
          )}
          <li className={styles.hide}>
            <Link to="/messages">
              <div style={{ position: 'relative' }}>
                {newMessages > 0 ? (
                  <div className={styles.basketAmount}>
                    <div>{newMessages}</div>
                  </div>
                ) : null}
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="1">
                    <rect
                      x="1.33301"
                      y="4"
                      width="21.3333"
                      height="16"
                      rx="3"
                      stroke={dark ? 'white' : '#31394D'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2.66699 6.66699L10.8378 12.5033C11.5332 13 12.4674 13 13.1628 12.5033L21.3337 6.66699"
                      stroke={dark ? 'white' : '#31394D'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>
            </Link>
          </li>
          {/* {authorized && ( */}
          <li>
            <Link to="/cart">
              <div style={{ position: 'relative' }}>
                {products.length ? (
                  <div className={styles.basketAmount}>
                    <div>{products.length}</div>
                  </div>
                ) : null}
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="1">
                    <path
                      d="M1 3L2.11047 3C3.52508 3 4.74747 3.9882 5.04387 5.37141L6.21531 10.8381C6.61051 12.6824 8.24037 14 10.1265 14H17.2862C19.0468 14 20.6003 12.8489 21.1129 11.1646L23 4.96429"
                      stroke={dark ? 'white' : '#31394D'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11.25 19.5C11.25 20.4665 10.4665 21.25 9.5 21.25C8.5335 21.25 7.75 20.4665 7.75 19.5C7.75 18.5335 8.5335 17.75 9.5 17.75C10.4665 17.75 11.25 18.5335 11.25 19.5Z"
                      stroke={dark ? 'white' : '#31394D'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20.25 19.5C20.25 20.4665 19.4665 21.25 18.5 21.25C17.5335 21.25 16.75 20.4665 16.75 19.5C16.75 18.5335 17.5335 17.75 18.5 17.75C19.4665 17.75 20.25 18.5335 20.25 19.5Z"
                      stroke={dark ? 'white' : '#31394D'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>
            </Link>
          </li>
          {/* )} */}
        </ul>
        <div className={styles.signin}>
          {!authorized && <Link to="/login/regular">SIGN IN</Link>}
          {authorized && (
            <div className={styles.avatar_container}>
              {/* <Link to={getPath()}> */}
              <Avatar imgsrc={userPhoto} />
              {/* </Link> */}
              <img
                className={cls(styles.arrow, settings ? styles.arrow_up : '')}
                src={dark ? ArrowWhite : ArrowDark}
                onClick={onSettings}
                alt="arrow"
              />
            </div>
          )}
        </div>
        {isSubmenu && item && (
          <MenuContainer
            useOutsideClick={useOutsideClick}
            dark={dark}
            item={item}
            click={switchMenu}
            setSubmenu={setSubmenu}
            resetItem={setItem}
            setMenu={setMenu}
          />
        )}
        {menu && item === 'all' && (
          <MenuContainer
            useOutsideClick={useOutsideClick}
            userPhoto={userPhoto}
            profileName={profileName}
            dark={dark}
            item="all"
            setSubmenu={setSubmenu}
            setMenu={setMenu}
            resetItem={setItem}
          />
        )}
        {settings && (
          <div className={styles.settings_container} ref={settingsСontainer}>
            <ul className={styles.link_list}>
              <li onClick={onSettingsSelect}>
                <Link className={styles.link} to="/account_info/profile">
                  <div>
                    <img src={Cup} alt="icon" />
                    <a href="#"> food lover dashboard</a>
                  </div>
                </Link>
              </li>
            </ul>

            <p>Food maker profile</p>

            <ul className={styles.link_list}>
              {role === 'FOODMAKER' && (
                <li onClick={onSettingsSelect}>
                  <img src={Person} width="16px" alt="icon" />
                  <Link to="/product_dashboard/profile">Foodmaker Profile</Link>
                </li>
              )}
              <li onClick={onSettingsSelect}>
                <img src={Gallery_icon} alt="icon" />
                <Link to="/experience_dashboard/listings">Experience dashboard</Link>
              </li>
              <li onClick={onSettingsSelect}>
                <img src={Gallery_icon_1} alt="icon" />
                {role === 'FOODMAKER' ? (
                  shop?.title ? (
                    <Link to="/product_dashboard/listings">Product dashboard</Link>
                  ) : (
                    <Link to="/addproduct">add product</Link>
                  )
                ) : (
                  <Link to="/signupflow">Foodmaker signup</Link>
                )}
              </li>
            </ul>

            <ul className={styles.link_list}>
              <li onClick={onSettingsSelect}>
                <img src={Setting} alt="icon" />
                <Link to="/settings/security"> Setting</Link>
              </li>
              <li onClick={logout}>
                <img src={LogOut} alt="icon" />
                <a href="#" className={styles.logout_btn}>
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  authorized: T.bool.isRequired,
  id: T.oneOfType([T.number, T.string]),
  role: T.string,
  profileName: T.string,
  pathname: T.string.isRequired,
  newMessages: T.number,
  logOut: T.func.isRequired,
  pushRoute: T.func.isRequired,
  userPhoto: T.string,
  getUserAccount: T.func.isRequired,
}

export default connect(
  ({
    login: { authorized },
    router: {
      location: { pathname },
    },
    account: { userPhoto, profileName, id, role, shop },
    cart: { products },
    chat: { newMessages },
  }) => ({ authorized, id, role, profileName, pathname, userPhoto, shop, products, newMessages }),
  {
    logOut: logout,
    pushRoute: push,
    getUserAccount,
  },
)(Header)
