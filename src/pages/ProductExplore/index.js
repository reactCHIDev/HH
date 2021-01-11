/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
          <h1>Products from our food makers </h1>
          <div className={styles.search_block}>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Type of products</label>
              <input disabled className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Category</label>
              <input disabled className={styles.input} type="text" placeholder="Beer, wine" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Price</label>
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
          <div className={styles.btn_holder}>
            <button type="button">More</button>
          </div>
        </div>
      </div>

      <BottomSection />
      <Footer />
    </div>
  )
}

ProductExplore.propTypes = {}

export default connect(null, null)(ProductExplore)
