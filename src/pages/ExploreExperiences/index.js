import React from 'react'
import { useSelector } from 'react-redux'

import ExpCard from 'components/ExperienceCard'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'

import SearchBlock from './SearchBlock'
import styles from './expexp.module.scss'

const ExploreExp = () => {
  const fmData = useSelector((state) => state.search.data)
  console.log(fmData)

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
            {fmData.map((el) => (
              <ExpCard
                photo={el.experience.coverPhoto}
                tags={el.experience.tagIds.map((i) => i.tagName)}
                name={el.experience.title}
                price={el.experience?.priceChild || el.experience.priceAdult}
                rating={el.experience.rating}
                rateCount={el.experience.votes}
                pathname={`/experience/${el.experience.id}`}
                id={el.experience.id}
                isFavorite={el.isFavorite}
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
