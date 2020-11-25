import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { logout } from 'actions/login'
import cls from 'classnames'
import { getUserAccount } from 'actions/account'
import MenuContainer from 'components/Header/MenuContainer'
import MenuBtn from 'components/MenuCrosshair'
import LogoDark from 'assets/images/header/logo_dark.svg'
import LogoWhite from 'assets/images/header/logo-white.svg'
import textLogo from 'assets/images/header/textlogo.svg'
import ArrowWhite from 'assets/icons/svg/down-arrow-white.svg'
import ArrowDark from 'assets/icons/svg/down-arrow.svg'
import styles from './header.module.scss'
import './header.less'
import Avatar from './components/Avatar'

const Header = (props) => {
  const { authorized, id, role, userPhoto, logOut, pathname, pushRoute, getUserAccount } = props

  const [menu, setMenu] = useState(false)
  const [settings, setSettings] = useState(false)
  const [isSubmenu, setSubmenu] = useState(false)
  const [item, setItem] = useState('')

  const dark = pathname !== '/signupflow' && pathname !== '/card'

  useEffect(() => {
    if (id) {
      getUserAccount(id)
    }
  }, [id])

  const clickLogo = () => {
    if (menu) setMenu(!menu)
    if (authorized) pushRoute('/card')
    if (!authorized) pushRoute('/')
  }

  const toggleMenu = () => {
    if (!menu) {
      setMenu(true)
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
      toggleMenu()
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

  const onSettings = () => setSettings((s) => !s)

  const logout = () => {
    logOut()
    onSettings()
  }

  console.log('%c   dark   ', 'color: darkgreen; background: palegreen;', dark)

  return (
    <div className={styles.wrapper}>
      <div className={styles.placeholder} />
      <div className={cls(styles.container, dark ? styles.dark : styles.light)}>
        <div className={styles.menu_btn} onClick={toggleMenu}>
          <MenuBtn visible={menu} />
        </div>
        <div className={styles.logo}>
          <img className={styles.logo_img} src={dark ? LogoDark : LogoWhite} alt="logo" />
          {dark && <img className={styles.logo_text} src={textLogo} alt="hh" />}
        </div>
        <ul className={cls(styles.menu, menu ? styles.on : styles.off)}>
          <li className={styles.menuitem} id="explore" onClick={menuItemClick}>
            EXPLORE{' '}
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
          <li className={styles.menuitem} id="foodmakers" onClick={menuItemClick}>
            FOR FOOD MAKERS{' '}
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
          </li>
          {authorized && (
            <li className={styles.hide}>
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
            </li>
          )}
          <li className={styles.hide}>
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
          </li>
          {authorized && (
            <li>
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
            </li>
          )}
        </ul>
        <div className={styles.signin}>
          {!authorized && <Link to="/login/regular">SIGN IN</Link>}
          {authorized && (
            <div className={styles.avatar_container} onClick={onSettings}>
              <Avatar imgsrc={userPhoto} />
              <img
                className={cls(styles.arrow, settings ? styles.arrow_up : '')}
                src={dark ? ArrowWhite : ArrowDark}
                alt="arrow"
              />
            </div>
          )}
        </div>
        {isSubmenu && item && <MenuContainer dark={dark} item={item} click={switchMenu} />}
        {settings && (
          <div className={styles.settings_container}>
            <p style={{ color: 'black', padding: 30, cursor: 'pointer' }} onClick={logout}>
              LogOut
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

Header.propTypes = {
  authorized: T.bool.isRequired,
  id: T.string,
  role: T.string,
  pathname: T.string.isRequired,
  logOut: T.func.isRequired,
  pushRoute: T.func.isRequired,
  userPhoto: T.string,
  getUserAccount: T.func.isRequired,
}

export default connect(
  ({
    login: { authorized, id, role },
    router: {
      location: { pathname },
    },
    account: { userPhoto },
  }) => ({ authorized, id, role, pathname, userPhoto }),
  {
    logOut: logout,
    pushRoute: push,
    getUserAccount,
  },
)(Header)
