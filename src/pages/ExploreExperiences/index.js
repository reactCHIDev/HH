import React from 'react'
import { connect } from 'react-redux'
import ExpCard from 'components/ExperienceCard'
import cls from 'classnames'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import stub2 from 'assets/images/landings/create_experience/sec21.jpg'
import { Collapse } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import T from 'prop-types'
import styles from './expexp.module.scss'
import SearchBlock from './SearchBlock'

const ExploreExp = (props) => {
  return (
    <div>
      <div className={styles.page_header}>
        <div className={styles.header_content}>
          <h1>
            Food experiences in <mark>Singapore</mark>{' '}
          </h1>
          <SearchBlock />
          {/* <div className={styles.search_block}>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Type of experience</label>
              <input disabled className={styles.input} type="text" />
              <p className={styles.input_text}>
                <span>Next week, Next weekend</span>
              </p>
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Date</label>
              <input disabled className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Number of guests</label>
              <input disabled className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Price ($)</label>
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
          </div> */}
        </div>
      </div>

      <div className={styles.container}>
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
    </div>
  )
}

ExploreExp.propTypes = {}

export default connect(null, null)(ExploreExp)
