/* eslint-disable react/prop-types */
import React from 'react'
import styles from './cardscontainer.module.scss'

const CardsContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

CardsContainer.propTypes = {}

export default CardsContainer
