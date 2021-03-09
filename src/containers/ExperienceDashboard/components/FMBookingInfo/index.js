/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { connect } from 'react-redux'
import SubHeader from 'components/SubHeader'
import { getFMBookingInfoAC } from 'actions/experience'
import { useSelector, useDispatch } from 'react-redux'

import React, { useEffect } from 'react'
import { replace } from 'connected-react-router'
import { setActiveChatAC, setNewContactAC } from 'actions/chat'

import Messages from 'pages/Messages'
import MainInfo from './components/MainInfo'

import styles from './fmBooking.module.scss'

function BookingInfo(props) {
  const {
    location: { state: order },
    replaceRoute,
    getData,
    orderInfo,
  } = props

  const dispatch = useDispatch()

  const goBack = () => {
    replaceRoute(`/experience_dashboard/booking`)
  }

  React.useEffect(() => {
    getData(order)
  }, [])

  /* useEffect(() => {
    if (true) {
      const contact = {
        id: 668,
        dialogCreated: new Date(),
        lastMessageSent: new Date(),
        recipient: {
          id: 668,
          profileName: 'Sasha',
          userPhoto:
            'https://hungryhugger-space.fra1.digitaloceanspaces.com/84499c8a-e2e0-46e3-820a-e478f1a7edc9_1611823430013.jpg',
          email: '',
        },
        newMessages: 0,
      }
      dispatch(setNewContactAC(contact))
      dispatch(setActiveChatAC(contact.id, contact.recipient))
    }
  }, []) */

  useEffect(() => {
    if (orderInfo) {
      const contact = {
        id: orderInfo.user.id,
        dialogCreated: new Date(),
        lastMessageSent: new Date(),
        recipient: {
          id: orderInfo.user.id,
          profileName: orderInfo.user.profileName,
          userPhoto: orderInfo.user.userPhoto,
          email: '',
        },
        newMessages: 0,
      }
      dispatch(setNewContactAC(contact))
      dispatch(setActiveChatAC(contact.id, contact.recipient))
    }
  }, [orderInfo])

  return (
    <>
      <SubHeader linkTo="/experience_dashboard/booking" onBack={goBack} title="Booking details" />
      <div className={styles.content}>
        {orderInfo.experience && <MainInfo orderInfo={orderInfo} />}
        <div className={styles.chat}>
          <Messages orderChat />
        </div>
      </div>
    </>
  )
}

export default connect(({ experience }) => ({ orderInfo: experience.fmBookingByID }), {
  replaceRoute: replace,
  getData: getFMBookingInfoAC,
})(BookingInfo)
