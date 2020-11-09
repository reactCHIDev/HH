import React from 'react'
import T from 'prop-types'
import SortIcon1 from 'assets/icons/svg/sort1.svg'
import SortIcon2 from 'assets/icons/svg/sort2.svg'
import styles from './sort.module.scss'

const Sort = (props) => {
  const { title, onClick } = props

  return (
    <div className={styles.container} onClick={onClick}>
      <p className={styles.title}>{title}</p>
      <div className={styles.img_wrapper}>
        <img className={styles.icon1} src={SortIcon1} alt="sort" />
        <img className={styles.icon2} src={SortIcon2} alt="sort" />
      </div>
    </div>
  )
}

Sort.propTypes = {
  title: T.string.isRequired,
  onClick: T.func,
}

export default Sort
