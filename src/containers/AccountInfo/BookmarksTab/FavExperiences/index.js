import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import ExpCard from 'components/ExperienceCard'
import { Spin, Space } from 'antd'
import Button from 'components/Button'

import { getFavExperiencesAC, getFavProductsAC } from 'actions/bookmarks'
import { useDispatch, useSelector } from 'react-redux'

import styles from './favexp.module.scss'

const FavExperiences = () => {
  const [experiencesStartIndex, setExperiencesStartIndex] = useState(0)
  const [experiencesCollection, setExperiencesCollection] = useState([])

  const experiencesList = useSelector((state) => state.bookmarks.favExperiences)
  const isLoading = useSelector((state) => state.bookmarks.requesting)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavExperiencesAC(experiencesStartIndex, 12))
  }, [experiencesStartIndex])

  useEffect(() => {
    setExperiencesCollection((p) =>
      p.concat(
        experiencesList.filter((e) => !p.find((el) => el.experience.id === e.experience.id)),
      ),
    )
  }, [experiencesList])

  const moreExperiences = () => {
    setExperiencesStartIndex((si) => si + 12)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.exp_section}>
          {experiencesCollection.map(
            (el) =>
              el?.experience?.coverPhoto && (
                <ExpCard
                  key={el.experience.id}
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
              ),
          )}
        </div>
        <div className={styles.btn_holder}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </div>
          ) : (
            <Button title="Explore more" dark onClick={moreExperiences} />
          )}
        </div>
      </div>
    </div>
  )
}

FavExperiences.propTypes = {}

export default FavExperiences
