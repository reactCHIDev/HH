import React from 'react'
import T from 'prop-types'
import Logo from 'assets/images/logo.png'
import Search from 'assets/images/search.svg'
import Heart from 'assets/images/heart.svg'
import Mess from 'assets/images/mess.svg'
import Cart from 'assets/images/cart.svg'

import styles from './header.module.scss'
import './header.less'
import { getSearch } from 'connected-react-router'

const Header = (props) => {
  const { x } = props

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src={Logo} alt="logo" />
      </div>
      <ul className={styles.menu}>
        <li className={styles.menuitem}>EXPLORE</li>
        <li className={styles.menuitem}>FOR FOOD MAKERS</li>
        <li className={styles.menuitem}>DASHBOARD</li>
      </ul>
      <ul className={styles.options}>
        <li>
          <img src={Search} alt="search" />
        </li>
        <li>
          <img src={Heart} alt="heart" />
        </li>
        <li>
          <img src={Mess} alt="mess" />
        </li>
        <li>
          <img src={Cart} alt="cart" />
        </li>
      </ul>
      <div className={styles.profile}>
        <img src="" alt="" />
      </div>
    </div>
  )
}

Header.propTypes = {
  a: T.number.isRequired,
  b: T.string.isRequired,
  c: T.bool.isRequired,
  f: T.func.isRequired,
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }).isRequired,
  }).isRequired,
}

export default Header
