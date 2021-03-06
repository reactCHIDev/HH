/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'
import EditIcon from 'assets/icons/svg/editor-icon.svg'
import { toggleExperienceStatusRequestAC } from 'actions/experience-listing'
import { setItem } from 'utils/localStorage'

import Option from 'components/Option'

import styles from './productRaw.module.scss'

function ProductRaw({ element }) {
  const dispatch = useDispatch()
  const onClick = (e) => {
    e.stopPropagation()
    setItem('addExperience', element)
  }
  const openExpPage = () => {
    dispatch(push(`/experience/${element.id}`))
  }

  const toggleStatus = (data) => dispatch(toggleExperienceStatusRequestAC(data))

  const day = new Date(element.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  })

  const time = new Date(element.updatedAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
  })
  return (
    <div className={styles.container} onClick={openExpPage}>
      <div className={styles.mainInfo}>
        <div
          style={{ backgroundImage: `url("${element?.coverPhoto}")` }}
          className={styles.imgWrapper}
        />
        <div className={styles.titleWrapper}>
          <div>
            <div className={styles.title}>{element.title.substring(0, 30)}</div>
            <div className={styles.statusWrapper} onClick={(e) => e.stopPropagation()}>
              <Option
                checked={element.status === 'PUBLISHED'}
                onChange={toggleStatus}
                id={element.id}
              />
            </div>
          </div>
          <div className={styles.edit_btn_container} onClick={onClick}>
            <Link to={{ pathname: '/addexperience', state: 'edit' }}>
              <img className={styles.edit_btn_img} src={EditIcon} alt="edit" />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.secondaryInfo}>
        <div className={styles.statusWrapper} onClick={(e) => e.stopPropagation()}>
          <Option
            checked={element.status === 'PUBLISHED'}
            onChange={toggleStatus}
            id={element.id}
          />
        </div>
        <div className={styles.dateWrapper}>
          <span>{time}</span>
          {day}
        </div>
        <div className={styles.lastSection} onClick={openExpPage}>
          <button type="button">{'>'}</button>
        </div>
      </div>
    </div>
  )
}

export default ProductRaw
