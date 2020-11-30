import React from 'react'
import { connect } from 'react-redux'
import FMCard from './components/FMCard'
import cls from 'classnames'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import stub2 from 'assets/images/landings/create_experience/sec21.jpg'
import T from 'prop-types'
import styles from './fmexp.module.scss'

const FoodmakersExplore = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.page_header}>
        <div className={styles.header_content}>
          <p>Food makers for food lovers</p>
          <div className={styles.search_block}>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Type of Food Maker</label>
              <input className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Search hosts or brands</label>
              <input className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Service type</label>
              <input className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Host speciality</label>
              <input className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <button type="button">Q</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.exp_section}>
          {[1, 2, 3, 4, 5].fill(1).map((e, i) => (
            <FMCard key={e} />
          ))}
        </div>
      </div>

      <BottomSection />
      <Footer />
    </div>
  )
}

FoodmakersExplore.propTypes = {}

export default connect(null, null)(FoodmakersExplore)
