import React, { useEffect, useState, useContext } from 'react'
import T from 'prop-types'
import { WebSocketContext } from 'App'
import { useHistory } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'

import SubHeader from 'components/SubHeader'
import { getDialogs, setAsReviewed } from 'utils/openWS'
import { setActiveChatAC } from 'actions/chat'
import { useSelector, useDispatch } from 'react-redux'
import { getItem } from 'utils/localStorage'
import ChatList from './ChatList'
import Chat from './Chat'
import styles from './messages.module.scss'
import './messages.less'

const id = getItem('user-id')

const Messages = ({ location: { state } }) => {
  const [newChat, setNewChat] = useState(null)
  const [chatList, setChatList] = useState([])

  const myId = useSelector((state) => state.account.id)
  const dialog = useSelector((state) => state.chat.dialog)
  const dialogs = useSelector((state) => state.chat.dialogs)
  const activeChat = useSelector((state) => state.chat.activeChat)
  const recipient = useSelector((state) => state.chat.recipient)
  const newMessages = useSelector((state) => state.chat.newMessages)

  const dispatch = useDispatch()
  const history = useHistory()

  const socket = useContext(WebSocketContext)

  const setActiveChat = (id, recipient) => {
    dispatch(setActiveChatAC(id, recipient))
  }

  useEffect(() => {
    const chatData = state
      ? {
          id: state.id,
          dialogCreated: new Date(),
          lastMessageSent: new Date(),
          recipient: { ...state, email: '' },
          newMessages: 0,
        }
      : null

    if (chatData) {
      setNewChat(chatData)
      // setActiveChat(chatData.id, state)
      history.replace('/messages', undefined)
    }
  }, [])

  useEffect(() => {
    const dlogs = cloneDeep(dialogs)
    const chatList =
      dlogs?.length && newChat && !dlogs.find((e) => e?.recipient?.id === newChat?.id)
        ? [newChat].concat(dlogs)
        : dlogs
    setChatList(chatList)
    console.log('%c    chatList  ', 'color: darkgreen; background: palegreen;', chatList)
    // if (newChat && chatList?.length) setActiveChat(chatList[0].recipient.id, chatList[0].recipient)
  }, [dialogs, newChat])

  useEffect(() => {
    if (dialog?.length) {
      const newMessages = cloneDeep(dialog)
        .map((e) => (e.message.status === 'New' ? e.message.id : null))
        .filter((e) => e)
      if (newMessages?.length) setAsReviewed(socket, newMessages)
    }
  }, [dialog])

  useEffect(() => {
    if (socket?.readyState === 1 && newMessages !== null) {
      getDialogs(socket, id)
    }
  }, [socket?.readyState, newMessages])

  const goBack = () => {
    // replaceRoute(`/`)
  }

  return (
    <>
      <SubHeader linkTo="/" onBack={goBack} title="Messages" />
      <div className={styles.content}>
        <ChatList chatList={chatList} activeChat={activeChat} setActiveChat={setActiveChat} />
        {activeChat && (
          <Chat
            myId={myId}
            socket={socket}
            recipient={recipient}
            activeChat={activeChat}
            rdy={newMessages !== null}
            dialog={dialog || []}
          />
        )}
      </div>
    </>
  )
}

Messages.propTypes = {}

export default Messages
