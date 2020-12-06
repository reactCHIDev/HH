import React from 'react'
import { Link } from 'react-router-dom'
import T from 'prop-types'
import styles from './subheader.module.scss'
import './subheader.less'

const SubHeader = (props) => {
  const { linkTo, onBack, title } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          {linkTo && (
            <Link to={linkTo} onClick={onBack}>
              <p className={styles.back_arrow}>{'<'}</p>
            </Link>
          )}
          <p className={styles.back_title}>{title}</p>
        </div>
        {/* <p className={styles.saved}>All changes saved</p> */}
      </div>
    </div>
  )
}

SubHeader.propTypes = {
  linkTo: T.string,
  onBack: T.func,
  title: T.string,
}

export default SubHeader
