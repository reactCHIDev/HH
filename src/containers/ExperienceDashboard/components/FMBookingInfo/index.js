/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { connect } from 'react-redux'
import SubHeader from 'components/SubHeader'
import { getFMBookingInfoAC } from 'actions/experience'

import React from 'react'
import { replace } from 'connected-react-router'
import MainInfo from './components/MainInfo'
import Chat from './components/Chat'

import styles from './fmBooking.module.scss'

function BookingInfo(props) {
  const {
    location: { state: order },
    replaceRoute,
    getData,
    orderInfo,
  } = props

  const goBack = () => {
    replaceRoute(`/experience_dashboard/booking`)
  }

  React.useEffect(() => {
    getData(order)
  }, [])

  return (
    <>
      <div className={styles.container}>
        <SubHeader linkTo="/experience_dashboard/booking" onBack={goBack} title="Booking details" />
      </div>
      <div className={styles.content}>
        {orderInfo.experience && <MainInfo orderInfo={orderInfo} />}
        <Chat />
      </div>
    </>
  )
}

export default connect(({ experience }) => ({ orderInfo: experience.fmBookingByID }), {
  replaceRoute: replace,
  getData: getFMBookingInfoAC,
})(BookingInfo)
