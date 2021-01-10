/* eslint-disable react/prop-types */
import React from 'react'
import SortIcon1 from 'assets/icons/svg/sort1.svg'
import SortIcon2 from 'assets/icons/svg/sort2.svg'
import styles from './table.module.scss'

const SortingElement = ({ type, isSort }) => {
  return (
    <span className={styles.img_wrapper}>
      {isSort ? (
        <>
          <img className={type ? styles.iconasc1 : styles.icondesc1} src={SortIcon1} alt="sort" />
          <img className={type ? styles.iconasc2 : styles.icondesc2} src={SortIcon2} alt="sort" />
        </>
      ) : (
        <>
          <img className={styles.icondesc1} src={SortIcon1} alt="sort" />
          <img className={styles.iconasc2} src={SortIcon2} alt="sort" />
        </>
      )}
    </span>
  )
}

export default SortingElement
