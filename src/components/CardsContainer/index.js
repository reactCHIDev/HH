import React from 'react'
import T from 'prop-types'
import styles from './cardscontainer.module.scss'

const CardsContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

CardsContainer.propTypes = {}

export default CardsContainer

// import CardsContainer from 'components/CardsContainer'
