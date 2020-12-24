import React from 'react'
import styles from './table.module.scss'

function Row() {
  return (
    <div className={styles.rowWrapper}>
      <div className={styles.mainInfo}>
        <div className={styles.productImage} style={{ backgroundImage: `url('${''})` }} />
        <div>
          <div>Pie with carrots, apple and cinnamon</div>
          <div>#343243</div>
        </div>
      </div>
      <div className={styles.qty}>6</div>
      <div className={styles.price}>$ 8.00</div>
      <div className={styles.total}>$ 48.00</div>
    </div>
  )
}

export default Row
