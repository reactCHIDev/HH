import React, { useEffect, useState, useContext } from 'react'
import T from 'prop-types'
import { WebSocketContext } from 'App'

import SubHeader from 'components/SubHeader'
import { getDialog, getDialogs } from 'utils/openWS'
import { setNewDialogAC, setActiveChatAC } from 'actions/chat'
import { useSelector, useDispatch } from 'react-redux'
import { getItem } from 'utils/localStorage'
import ChatList from './ChatList'
import Chat from './Chat'
import styles from './messages.module.scss'
import './messages.less'

const id = getItem('user-id')

const Messages = (props) => {
  const {
    location: { state },
  } = props
  const [recipient, setRecipient] = useState(null)
  const myId = useSelector((state) => state.account.id)
  const dialog = useSelector((state) => state.chat.dialog)
  const dialogs = useSelector((state) => state.chat.dialogs)
  const activeChat = useSelector((state) => state.chat.activeChat)
  const socket = useContext(WebSocketContext)
  const [rdy, setRdy] = useState(false)

  const dispatch = useDispatch()

  /* useEffect(() => {
    if (state?.id) dispatch(setNewDialogAC(state))
  }, [state]) */

  useEffect(() => {
    if (socket?.readyState === 1 && rdy) {
      getDialogs(socket, id)
    }
  }, [socket?.readyState, rdy])

  useEffect(() => {
    if (socket?.readyState === 1 && activeChat && rdy) {
      getDialog(socket, activeChat)
    }
  }, [activeChat, rdy])

  const goBack = () => {
    // replaceRoute(`/`)
  }

  const setActiveChat = (id, recipient) => {
    dispatch(setActiveChatAC(id))
    setRecipient(recipient)
  }

  return (
    <>
      <SubHeader linkTo="/" onBack={goBack} title="Messages" />
      <div className={styles.content} onClick={() => setRdy(true)}>
        <ChatList chatList={dialogs} activeChat={activeChat} setActiveChat={setActiveChat} />
        <Chat
          myId={myId}
          socket={socket}
          recipient={recipient}
          activeChat={activeChat}
          dialog={dialog || []}
        />
      </div>
    </>
  )
}

Messages.propTypes = {}

export default Messages
