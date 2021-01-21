import React, { useEffect, useState } from 'react'
import T from 'prop-types'
import SubHeader from 'components/SubHeader'
import ChatList from './ChatList'
import { getDialog, getDialogs } from 'utils/openWS'
import { setDialogAC, setDialogsAC } from 'actions/chat'
import { useSelector, useDispatch } from 'react-redux'
import Chat from './Chat'
import styles from './messages.module.scss'
import './messages.less'

const Messages = ({ socket }) => {
  const [activeChat, setActiveChat] = useState(null)
  const dialog = useSelector((state) => state.chat.dialog)

  const dispatch = useDispatch()

  useEffect(() => {
    socket.addEventListener('message', (data) => {
      dispatch(setDialogsAC(data.data))
      // dispatch(setDialogAC(data.data))
    })
    if (socket?.readyState === 1) {
      getDialog(socket, 671)
      // getDialogs(socket, 671)
    }
  }, [])

  const goBack = () => {
    // replaceRoute(`/`)
  }

  const chatList = Array(10).fill('')

  return (
    <>
      <SubHeader linkTo="/" onBack={goBack} title="Messages" />
      <div className={styles.content}>
        <ChatList chatList={chatList} activeChat={activeChat} setActiveChat={setActiveChat} />
        <Chat socket={socket} dialog={dialog || []} />
      </div>
    </>
  )
}

Messages.propTypes = {}

export default Messages
