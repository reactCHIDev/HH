/* eslint-disable react/prop-types */
import React from 'react'
import styles from './info.module.scss'
import Header from './Header'
import Table from './Table'
import Options from './Options'

function Info({ setIsCancelModalShowm, orderInfo, total, shopName }) {
  return (
    <div className={styles.container}>
      <Header shopName={shopName} />
      <div className={styles.table_scroller}>
        <Table orderInfo={[]} />
      </div>
      <Options setIsCancelModalShowm={setIsCancelModalShowm} total={total} />
    </div>
  )
}

export default Info
