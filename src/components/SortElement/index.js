import React from 'react'
import T from 'prop-types'
import SortIcon1 from 'assets/icons/svg/sort1.svg'
import SortIcon2 from 'assets/icons/svg/sort2.svg'
import styles from './sort.module.scss'

const Sort = (props) => {
  const { title, type, onClick } = props

  return (
    <div className={styles.container} onClick={onClick} title={title} type={type}>
      {title && (
        <>
          <span className={styles.title}>{title}</span>
          <span className={styles.img_wrapper}>
            <img
              className={type === 'asc' ? styles.iconasc1 : styles.icondesc1}
              src={SortIcon1}
              alt="sort"
            />
            <img
              className={type === 'asc' ? styles.iconasc2 : styles.icondesc2}
              src={SortIcon2}
              alt="sort"
            />
          </span>
        </>
      )}
    </div>
  )
}

Sort.propTypes = {
  title: T.string.isRequired,
  onClick: T.func,
}

export default Sort
