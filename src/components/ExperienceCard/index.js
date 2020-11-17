import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Rate } from 'antd'

import sec21 from 'assets/images/landings/create_profile/sec21.jpg'
import expLike from 'assets/icons/svg/exp_like.svg'
import styles from './exp_card.module.scss'
import './exp_card.less'

const ExpCard = (props) => {
  const { x } = props

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.img_container}>
          <img className={styles.card_like} src={expLike} alt="explike" />
          <img className={styles.card_img} src={sec21} alt="cardimg" />
        </div>
        <div className={styles.info_container}>
          <p className={styles.exp_title}>Boring Indian Curry Workshop</p>
          <div className={styles.stats_container}>
            <p className={styles.exp_price}>FROM $650</p>
            <div className={cls(styles.rating_container, 'rating')}>
              <Rate style={{ color: '#31394C' }} disabled defaultValue={3} />
              <p className={styles.qauntity}>(8)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ExpCard.propTypes = {
  a: T.number.isRequired,
  b: T.string.isRequired,
  c: T.bool.isRequired,
  f: T.func.isRequired,
  tabs: T.shape({
    name: T.shape({
      mark: T.bool,
      content: T.node,
    }).isRequired,
  }).isRequired,
}

export default ExpCard
