import React from 'react'
import T from 'prop-types'
import styles from './information.module.scss'
import './information.less'

const Information = ({ description, ingredients }) => {
  return (
    <div className={styles.container}>
      <p>{description}</p>
      {ingredients && (
        <div className={styles.additional_info}>
          Ingredients: <span>{ingredients}</span>
        </div>
      )}
    </div>
  )
}

Information.propTypes = {
  description: T.string,
  ingredients: T.string,
}

export default Information
