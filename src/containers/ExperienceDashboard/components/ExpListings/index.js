import React, { useState, useEffect } from 'react'
import T, { shape } from 'prop-types'
import Modal from 'components/UniversalModal'
import Header from './components/ListingHeader'
import styles from './listing.module.scss'
import './listing.less'

const ExpListings = (props) => {
  return (
    <div className={styles.container}>
      <Header onSearch={() => {}} mark={2} />
    </div>
  )
}

ExpListings.propTypes = {}

ExpListings.defaultProps = {}

export default ExpListings
