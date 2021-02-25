import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Spin, Space } from 'antd'

import { getExperienceByIdAC } from 'actions/experience'

import ExpHeader from './components/ExpHeader'
import Overview from './components/Overview'
import About from './components/About'
import GuestPhotos from './components/GuestPhotos'
import Review from './components/Review'
import styles from './expPage.module.scss'

function ExperincePage() {
  const dispatch = useDispatch()
  const experience = useSelector((state) => state.expListing.experience)
  const bookingsByDate = useSelector((state) => state.experience.bookingByDate)

  const { productId } = useParams()
  React.useEffect(() => {
    dispatch(getExperienceByIdAC(productId))
  }, [])

  return experience ? (
    <div className={styles.wrapper}>
      <ExpHeader
        experience={experience.experience}
        user={experience.userProfile}
        bookingsByDate={bookingsByDate}
      />
      <div className={styles.container}>
        <Overview />
        <About />
        {/* <GuestPhotos /> */}
        <Review />
      </div>
    </div>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 300 }}>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  )
}

export default ExperincePage
