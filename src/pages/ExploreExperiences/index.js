import React from 'react'
import { useSelector } from 'react-redux'
import ExpCard from 'components/ExperienceCard'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import stub2 from 'assets/images/landings/create_experience/sec21.jpg'
import styles from './expexp.module.scss'
import SearchBlock from './SearchBlock'

const ExploreExp = () => {
  const fmData = useSelector((state) => state.search.data)

  return (
    <div>
      <div className={styles.page_header}>
        <div className={styles.header_content}>
          <h1>
            Food experiences in <mark>Singapore</mark>{' '}
          </h1>
          <SearchBlock />
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

export default ExploreExp
