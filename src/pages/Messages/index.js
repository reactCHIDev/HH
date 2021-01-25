import React, { useEffect, useState, useContext } from 'react'
import T from 'prop-types'
import { WebSocketContext } from 'App'

import SubHeader from 'components/SubHeader'
import { getDialogs } from 'utils/openWS'
import { setActiveChatAC } from 'actions/chat'
import { useSelector, useDispatch } from 'react-redux'
import { getItem } from 'utils/localStorage'
import ChatList from './ChatList'
import Chat from './Chat'
import styles from './messages.module.scss'
import './messages.less'

const id = getItem('user-id')

const Messages = (props) => {
  const myId = useSelector((state) => state.account.id)
  const dialog = useSelector((state) => state.chat.dialog)
  const dialogs = useSelector((state) => state.chat.dialogs)
  const activeChat = useSelector((state) => state.chat.activeChat)
  const recipient = useSelector((state) => state.chat.recipient)
  const newMessages = useSelector((state) => state.chat.newMessages)
  const socket = useContext(WebSocketContext)

  const dispatch = useDispatch()

  useEffect(() => {
    if (socket?.readyState === 1 && newMessages !== null) {
      getDialogs(socket, id)
    }
  }, [socket?.readyState, newMessages])

  const goBack = () => {
    // replaceRoute(`/`)
  }

  const setActiveChat = (id, recipient) => {
    dispatch(setActiveChatAC(id, recipient))
  }

  return (
    <>
      <SubHeader linkTo="/" onBack={goBack} title="Messages" />
      <div className={styles.content}>
        <ChatList chatList={dialogs} activeChat={activeChat} setActiveChat={setActiveChat} />
        <Chat
          myId={myId}
          socket={socket}
          recipient={recipient}
          activeChat={activeChat}
          rdy={newMessages !== null}
          dialog={dialog || []}
        />
      </div>
    </>
  )
}

Messages.propTypes = {}

export default Messages
