import React, { useEffect } from 'react'
import T from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveChatAC, setNewContactAC } from 'actions/chat'
import { getFMOrderAC, removeFMOrder } from 'actions/foodmaker-orders'
import SubHeader from 'components/SubHeader'
import Messages from 'pages/Messages'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import MainInfo from './MainInfo'
import styles from './orderinfo.module.scss'

const OrderFMInfo = (props) => {
  const {
    replaceRoute,
    getFMOrderAC,
    removeOrder,
    location: { state: order },
  } = props

  const dispatch = useDispatch()
  const { orderHash } = useParams()
  const orderInf = useSelector((state) => state.fmOrders.order.customer)

  useEffect(() => {
    getFMOrderAC(order?.id)
  }, [order])

  const goBack = () => {
    replaceRoute(`/product_dashboard/orders`)
    removeOrder()
  }

  /*   useEffect(() => {
    if (orderInf) {
      const contact = {
        id: orderInf.id,
        dialogCreated: new Date(),
        lastMessageSent: new Date(),
        recipient: {
          id: orderInf.id,
          profileName: orderInf.profileName,
          userPhoto: orderInf.userPhoto,
          email: '',
        },
        newMessages: 0,
      }
      dispatch(setNewContactAC(contact))
      dispatch(setActiveChatAC(contact.id, contact.recipient))
    }
  }, [orderInf]) */

  return (
    <div className={styles.container}>
      <SubHeader linkTo="/product_dashboard/orders" onBack={goBack} title={`order #${order.id}`} />
      <div className={styles.content}>
        <MainInfo order={order} />
        <div className={styles.chat}>
          <Messages orderChat />
        </div>
      </div>
    </div>
  )
}

OrderFMInfo.propTypes = {
  location: T.shape(),
  replaceRoute: T.func,
  getFMOrderAC: T.func,
  removeOrder: T.func,
}

export default connect(null, {
  replaceRoute: replace,
  getFMOrderAC,
  removeOrder: removeFMOrder,
})(OrderFMInfo)
