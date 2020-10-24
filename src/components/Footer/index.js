import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import Logo from 'assets/images/logo.png'
import inst from 'assets/images/instagram.svg'
import fb from 'assets/images/facebook.svg'
import yt from 'assets/images/youtube.svg'
import styles from './footer.module.scss'
import './footer.less'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logos}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src={Logo} alt="logo" />
        </div>
        <ul className={styles.socials}>
          <li>
            <img src={inst} alt="inst" />
          </li>
          <li>
            <img src={fb} alt="fb" />
          </li>
          <li>
            <img src={yt} alt="yt" />
          </li>
        </ul>
      </div>

      <div className={cls(styles.section, styles.contact)}>
        <ul>
          <li>Contact</li>
          <li>
            {' '}
            <a href="mailto:hello@hungryhugger.com">hello@hungryhugger.com</a>
          </li>
        </ul>{' '}
        <h5>Join a global community of food lovers and food makers.</h5>
      </div>

      <div className={cls(styles.section, styles.explore)}>
        <ul>
          <li>Experiences</li>
          <li>Hosts</li>
          <li>Brands</li>
        </ul>
        <h5>Explore</h5>
      </div>

      <div className={styles.section}>
        <ul>
          <li>HH.Magazine</li>
          <li>FAQ</li>
          <li>Become a Host</li>
        </ul>
        <h5>Community</h5>
      </div>

      <div className={styles.section}>
        <ul>
          <li>Terms</li>
          <li>Privacy Policy</li>
          <li>Sitemap</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
