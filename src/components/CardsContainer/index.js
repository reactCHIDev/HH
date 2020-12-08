import React from 'react'
import T from 'prop-types'
import styles from './cardscontainer.module.scss'
import Cards from './components/Cards'

const CardsContainer = () => {
  return (
    <div className={styles.container}>
       <Cards />
    </div>
  )
}

CardsContainer.propTypes = {}

export default CardsContainer

// import CardsContainer from 'components/CardsContainer'
