import React, { useEffect, useContext } from 'react'
import T from 'prop-types'
import { WebSocketContext } from 'App'
import cloneDeep from 'lodash/cloneDeep'
import SubHeader from 'components/SubHeader'
import { getDialog, getDialogs, setAsReviewed } from 'utils/openWS'
import { useHistory } from 'react-router-dom'
import { setActiveChatAC, setNewContactAC } from 'actions/chat'
import { useSelector, useDispatch } from 'react-redux'
import { getItem } from 'utils/localStorage'
import ChatList from './ChatList'
import Chat from './Chat'
import styles from './messages.module.scss'
import './messages.less'

const id = getItem('user-id')

const Messages = ({ location: { state } }) => {
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
    console.log('%c    state  ', 'color: darkgreen; background: palegreen;', state)
    if (chatData) {
      console.log('%c    chatData  ', 'color: darkgreen; background: palegreen;', chatData)
      dispatch(setNewContactAC(chatData))
      history.replace('/messages', undefined)
    }
  }, [])

  useEffect(() => {
    if (!activeChat && dialogs?.length) setActiveChat(dialogs[0].recipient.id, dialogs[0].recipient)
    if (activeChat) getDialog(socket, activeChat)
  }, [dialogs])

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
        <ChatList chatList={dialogs} activeChat={activeChat} setActiveChat={setActiveChat} />
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
