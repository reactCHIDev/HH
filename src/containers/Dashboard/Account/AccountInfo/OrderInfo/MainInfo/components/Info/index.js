/* eslint-disable react/prop-types */
import React from 'react'
import styles from './info.module.scss'
import Header from './Header'
import Table from './Table'
import Options from './Options'

function Info({ setIsCancelModalShowm }) {
  return (
    <div className={styles.container}>
      <Header />
      <Table />
      <Options setIsCancelModalShowm={setIsCancelModalShowm} />
    </div>
  )
}

export default Info
