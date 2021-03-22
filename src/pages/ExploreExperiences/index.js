import React from 'react'
import { useSelector } from 'react-redux'
import { Spin, Space } from 'antd'

import ExpCard from 'components/ExperienceCard'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'

import SearchBlock from './SearchBlock'
import styles from './expexp.module.scss'

const ExploreExp = () => {
  const fmData = useSelector((state) => state.search.data)

  return (
    <div>
      <div className={styles.page_header}>
        <div className={styles.header_content}>
          <h1>
            Food experiences in<mark>Hong Kong</mark>{' '}
          </h1>
          <SearchBlock />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.exp_section}>
            {fmData.length ? (
              fmData.map(
                (el) =>
                  el?.experience?.coverPhoto && (
                    <ExpCard
                      photo={el.experience.coverPhoto}
                      tags={[
                        ...new Set(
                          el.experience.tagIds.map((i) => i.tagName),
                          el.experience.typeIds.map((i) => i.title),
                        ),
                      ]}
                      name={el.experience.title}
                      price={el.experience?.priceChild || el.experience.priceAdult}
                      rating={el.experience.rating}
                      rateCount={el.experience.votes}
                      pathname={`/experience/${el.experience.id}`}
                      id={el.experience.id}
                      isFavorite={el.isFavorite}
                      key={el.experience.id}
                    />
                  ),
              )
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              </div>
            )}
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
