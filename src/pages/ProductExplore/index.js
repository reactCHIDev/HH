import React from 'react'
import { connect } from 'react-redux'
import ExpCard from 'components/ExperienceCard'
import cls from 'classnames'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import stub2 from 'assets/images/landings/create_experience/sec21.jpg'
import T from 'prop-types'
import styles from './prodexp.module.scss'

const ProductExplore = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.page_header}>
        <div className={styles.header_content}>
          <p>Food experiences in Singapore</p>
          <div className={styles.search_block}>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Type of experience</label>
              <input className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Date</label>
              <input className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Number of guests</label>
              <input className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Price ($)</label>
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
          {Array(18)
            .fill(1)
            .map((e) => (
              <ExpCard
                photo={stub2}
                tags={[
                  'desserts',
                  'cupcake',
                  'cupcake',
                  'cupcake',
                  'cupcake',
                  'cupcake',
                  'cupcake',
                  'cupcake',
                  'cupcake',
                ]}
                name="Donut Set 1 (x12)"
                price={15.59}
                rating={3}
                rateCount={63}
              />
            ))}
        </div>
      </div>

      <BottomSection />
      <Footer />
    </div>
  )
}

ProductExplore.propTypes = {}

export default connect(null, null)(ProductExplore)
