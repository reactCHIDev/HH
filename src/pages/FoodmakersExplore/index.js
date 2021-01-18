/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useSelector } from 'react-redux'
import cls from 'classnames'
import T from 'prop-types'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import stub2 from 'assets/images/landings/create_experience/sec21.jpg'
import FMCard from './components/FMCard'
import styles from './fmexp.module.scss'

const FoodmakersExplore = (props) => {
  const fmData = useSelector((state) => state.search.data)
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
                  <circle cx="11.5" cy="11.5" r="8.75" stroke="#000000" />
                  <path d="M18 18L22 22" stroke="#000000" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className={cls(styles.content, 'class')}>
        <div className={styles.exp_section}>
          {fmData.map((item) => (
            <FMCard item={item} />
          ))}
        </div>
      </div>

      <div className={styles.btn_holder}>
        <button type="button">More</button>
      </div>

      <BottomSection />
      <Footer />
    </div>
  )
}

FoodmakersExplore.propTypes = {}

export default FoodmakersExplore
