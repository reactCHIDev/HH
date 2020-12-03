import React from 'react'
import T from 'prop-types'
import LikeIcon from 'assets/icons/svg/like-icon.svg'
import ShareIcon from 'assets/icons/svg/share-icon.svg'
import styles from './information.module.scss'
import './information.less'

const Information = () => {
  return (
    <div className={styles.container}>
      <p>
        This is carrot cake that’s been infused with apples and baked as a loaf. So it’s not cake
        anymore. It’s bread. Therefore you can have more and definitely can have it for breakfast.
      </p>
      <p>
        Baking with both carrots and apples not only adds chewy texture and natural sweetness, but
        they also add so much moisture that it’s impossible to have a dry loaf. I adapted the basic
        ratios from my Cream Cheese-Filled Pumpkin Bread, a personal and fan favorite, to make way
        for grated carrots and apples.
      </p>
      <p>
        I grated the carrot and apple by hand using the coarsest blade on a box grater. It literally
        takes two minutes and I’d spend much more time washing food processor parts than quickly
        doing it the old-fashioned way.
      </p>
      <div className={styles.additional_info}>
        Ingredients: <span>branded dough, carrot, onions, carrot, cinnamon, butter</span>
      </div>
      <div className={styles.additional_info}>
        Weight: <span>320g</span>
      </div>
    </div>
  )
}

Information.propTypes = {
}

export default Information
