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
      <section className={styles.page_header}>
        <div className={styles.header_content}>
          <h1>Food makers for food lovers</h1>
          <div className={styles.search_block}>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Type of Food Maker</label>
              <input disabled className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Search hosts or brands</label>
              <input disabled className={styles.input} type="text" /* placeholder="E.g. Mike"  */ />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Service type</label>
              <input disabled className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Host speciality</label>
              <input disabled className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <button type="button">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11.5" cy="11.5" r="8.75" stroke="#000000" stroke-width="1.5"></circle>
                  <path d="M18 18L22 22" stroke="#000000" stroke-width="1.5"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className={cls(styles.content, 'class')}>
        <div className={styles.exp_section}>
          {[1, 2, 3, 4, 5].fill(1).map((e, i) => (
            <FMCard key={e} />
          ))}
        </div>
      </div>

      <div className={styles.btn_holder}>
        <button>More</button>
      </div>

      <BottomSection />
      <Footer />
    </div>
  )
}

FoodmakersExplore.propTypes = {}

export default connect(null, null)(FoodmakersExplore)
