/* eslint-disable react/prop-types */
import React from 'react'
import styles from './info.module.scss'
import Header from './Header'
import Table from './Table'
import Options from './Options'

function Info({ setIsCancelModalShowm, orderInfo }) {
  return (
    <div className={styles.container}>
      <Header shopName={orderInfo?.shop?.title} shopUrl={orderInfo?.shop?.shopUrl} />
      <div className={styles.table_scroller}>
        <Table orderInfo={orderInfo?.orderProducts} />
      </div>

      <Options
        setIsCancelModalShowm={setIsCancelModalShowm}
        total={orderInfo?.orderTotal}
        orderInfo={orderInfo}
      />
    </div>
  )
}

export default Info
