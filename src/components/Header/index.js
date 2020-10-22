import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from 'components/MenuCrosshair'
import Logo from 'assets/images/logo_white.png'
import Search from 'assets/images/search-white.svg'
import Heart from 'assets/images/heart.svg'
import Mess from 'assets/images/mess.svg'
import Cart from 'assets/images/cart-white.svg'

import styles from './header.module.scss'
import './header.less'

const Header = () => {
  const [menu, setMenu] = useState(false)

  const toggleMenu = () => {
    setMenu(!menu)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.menu_btn} onClick={toggleMenu}>
          <Menu />
        </div>
        <div className={styles.logo}>
          <img className={styles.logo_img} src={Logo} alt="logo" />
        </div>
        <ul className={styles.menu} style={{ left: menu ? 0 : -200 }}>
          <li className={styles.menuitem}>EXPLORE</li>
          <li className={styles.menuitem}>FOR FOOD MAKERS</li>
          <li className={styles.menuitem}>DASHBOARD</li>
        </ul>
        <ul className={styles.options}>
          <li>
            <img src={Search} alt="search" />
          </li>
          <li>
            <img src={Cart} alt="cart" />
          </li>
        </ul>
        <div className={styles.signin}>
          <Link to="/login">SIGN IN</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
