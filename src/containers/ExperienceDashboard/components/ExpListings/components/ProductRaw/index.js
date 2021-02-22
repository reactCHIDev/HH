/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import EditIcon from 'assets/icons/svg/editor-icon.svg'
import { setItem } from 'utils/localStorage'

import Option from '../Option'

import styles from './productRaw.module.scss'

function ProductRaw({ element }) {
  console.log(element, 'ELEMENT')
  const onClick = () => setItem('addExperience', element)
  const a = element.createdAt

  const day = new Date(element.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  })

  const time = new Date(element.createdAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
  })
  return (
    <div className={styles.container}>
      <div className={styles.mainInfo}>
        <div
          style={{ backgroundImage: `url("${element?.coverPhoto}")` }}
          className={styles.imgWrapper}
        />
        <div className={styles.titleWrapper}>
          <div>{element.title}</div>
          <div className={styles.edit_btn_container} onClick={onClick}>
            <Link to={{ pathname: '/addexperience', state: 'edit' }}>
              <img className={styles.edit_btn_img} src={EditIcon} alt="edit" />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.statusWrapper}>
        <Option checked={element.status === 'PUBLISHED'} onChange={() => {}} id={1} />
      </div>
      <div className={styles.dateWrapper}>
        <span>{time}</span>
        {day}
      </div>
    </div>
  )
}

export default ProductRaw
