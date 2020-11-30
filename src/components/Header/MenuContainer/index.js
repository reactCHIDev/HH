import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import GetHired from 'assets/images/header/gethired.jpg'
import Experience from 'assets/images/header/experience.jpg'
import CreateShop from 'assets/images/header/createshop.jpg'
import FoodExperience from 'assets/images/landings/foodmakers/fm-leading.jpg'
import FoodMakers from 'assets/images/landings/foodmakers/sec2-2.jpg'
import Products from 'assets/images/landings/foodmakers/sec3-3.jpg'
import Blog from 'assets/images/landings/create_shop/sec21.jpg'
import FAQ from 'assets/images/landings/create_shop/sec32.jpg'
import styles from './menucontainer.module.scss'

const items = {
  foodmakers: [
    { img: GetHired, heading: 'Get Hired', route: '/landing/create_profile' },
    { img: Experience, heading: 'Create Experience', route: '/landing/create_experience' },
    { img: CreateShop, heading: 'Create Shop', route: '/landing/create_shop' },
  ],
  explore: [
    { img: FoodExperience, heading: 'Food Experience', route: '/landing/create_experience' },
    { img: FoodMakers, heading: 'Food Makers', route: '/landing/foodmakers' },
    { img: Products, heading: 'Products', route: '/landing/foodmakers' },
    { img: Blog, heading: 'Blog', route: '/landing/foodmakers' },
    { img: FAQ, heading: 'FAQ', route: '/landing/foodmakers' },
  ],
}

const MenuContainer = ({ item, dark, resetItem, setSubmenu, setMenu }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [mounted])

  const onClick = () => {
    setMenu(false)
    setSubmenu(false)
    resetItem('')
  }
  console.log('%c   item   ', 'color: darkgreen; background: palegreen;', item)

  const menuContent = item !== 'all' && item !== '' ? items[item] : items.explore

  return (
    <div
      className={cls(
        styles.container,
        dark ? styles.dark : styles.light,
        mounted ? styles.mount : styles.onstart,
      )}
    >
      <div className={styles.content}>
        <strong className={styles.content_title}>EXPLORE</strong>
        <ul className={styles.menu_container}>
          {menuContent.map((menuItem, index) => (
            <li className={styles.item} id={index} onClick={onClick}>
              <Link to={menuItem.route}>
                <div className={styles.img_container}>
                  <img className={styles.item_img} src={menuItem.img} alt="hired" />
                </div>
              </Link>
              <p className={styles.item_text}>{menuItem.heading}</p>
            </li>
          ))}
        </ul>
        {item === 'all' && (
          <>
            <strong className={styles.content_title}>FOODMAKER</strong>
            <ul className={styles.menu_container}>
              {items.foodmakers.map((menuItem, index) => (
                <li className={styles.item} id={index} onClick={onClick}>
                  <Link to={menuItem.route}>
                    <div className={styles.img_container}>
                      <img className={styles.item_img} src={menuItem.img} alt="hired" />
                    </div>
                  </Link>

                  <p className={styles.item_text}>{menuItem.heading}</p>
                </li>
              ))}
            </ul>
          </>
        )}
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
