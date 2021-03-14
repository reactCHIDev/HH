import React from 'react'
import cls from 'classnames'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import Logo from 'assets/images/logo_beta.svg'
import inst from 'assets/images/instagram.svg'
import fb from 'assets/images/facebook.svg'
import styles from './footer.module.scss'
import './footer.less'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logos}>
        <Link to="/">
          <div className={styles.logo}>
            <img className={styles.logoImg} src={Logo} alt="logo" />
          </div>
        </Link>
        <ul className={styles.socials}>
          <li>
            <a
              href="https://www.instagram.com/hungry_hugger"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={inst} alt="inst" />
            </a>
          </li>
          <li>
            <a href="https://www.fb.com/hungryhugger" target="_blank" rel="noopener noreferrer">
              <img src={fb} alt="fb" />
            </a>
          </li>
          {/* <li>
            <img src={yt} alt="yt" />
          </li> */}
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
          <li>
            <a href="/landing/foodmakers" rel="noopener noreferrer">
              Makers
            </a>
          </li>
          <li>
            <a href="/landing/foodmakers" rel="noopener noreferrer">
              Products
            </a>
          </li>
          <li>
            <a href="/landing/create_experience" rel="noopener noreferrer">
              Experiences
            </a>
          </li>
        </ul>
        <h5>Explore</h5>
      </div>

      <div className={styles.section}>
        <ul>
          <li>
            <a href="https://medium.com/hungryhugger" target="_blank" rel="noopener noreferrer">
              Blog
            </a>
          </li>
          <li>
            <HashLink to="/landing/foodmakers#faqanchor">FAQ</HashLink>
          </li>
          <li>
            <a href="/landing/create_profile" rel="noopener noreferrer">
              Get Hired
            </a>
          </li>
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

Footer.propTypes = {}

export default Footer
