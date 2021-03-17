/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React from 'react'
import { connect } from 'react-redux'

import ExpInfo from './components/ExpInfo'
import MakerInfo from './components/MakerInfo'
import styles from './maininfo.module.scss'

const MainOrderInfo = ({ orderInfo }) => {
  return orderInfo?.booking ? (
    <div className={styles.container}>
      <MakerInfo
        bookingID={orderInfo.booking.id}
        date={orderInfo.booking.createdAt}
        foodmaker={orderInfo.foodmaker}
        expId={orderInfo.experience.id}
      />
      <ExpInfo
        date={orderInfo.booking.time}
        adults={orderInfo.booking.guests?.adults || 0}
        childs={orderInfo.booking.guests?.childs || 0}
        price={orderInfo.booking.totalPrice}
        invoiceUrl={orderInfo.paymentDetails.receipt_url}
        chatData={{
          id: orderInfo.foodmaker.id,
          profileName: orderInfo.foodmaker.profileName,
          userPhoto: orderInfo.foodmaker.coverPhoto,
        }}
      />
    </div>
  ) : null
}

export default connect(
  ({ experience }) => ({ orderInfo: experience.flBookingByID }),
  null,
)(MainOrderInfo)
