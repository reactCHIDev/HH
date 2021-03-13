/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react'
import { WebSocketContext } from 'App'
import cls from 'classnames'
import cloneDeep from 'lodash/cloneDeep'
import SubHeader from 'components/SubHeader'
import { getDialogs, setAsReviewed } from 'utils/openWS'
import { useHistory } from 'react-router-dom'
import { setActiveChatAC, setNewContactAC } from 'actions/chat'
import { useSelector, useDispatch } from 'react-redux'
import { getItem } from 'utils/localStorage'
import ChatList from './ChatList'
import Chat from './Chat'
import styles from './messages.module.scss'
import './messages.less'

const id = getItem('user-id')

const Messages = (props) => {
  const { orderChat } = props
  const state = !orderChat ? props?.location?.state : 'orderChat'
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
    const chatData =
      state && !orderChat
        ? {
            id: state.id,
            dialogCreated: new Date(),
            lastMessageSent: new Date(),
            recipient: { ...state, email: '' },
            newMessages: 0,
          }
        : null
    if (chatData) {
      dispatch(setNewContactAC(chatData))
      history.replace('/messages', undefined)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (socket?.readyState === 1 && newMessages !== null && !orderChat) {
      getDialogs(socket, id)
    }
    // eslint-disable-next-line
  }, [socket?.readyState, newMessages])

  useEffect(() => {
    if (dialogs?.length && !activeChat) setActiveChat(dialogs[0].recipient.id, dialogs[0].recipient)
    // eslint-disable-next-line
  }, [dialogs])

  useEffect(() => {
    const newMessages = cloneDeep(dialog)
      .map((e) => (e.message.status === 'New' ? e.message.id : null))
      .filter((e) => e)
    if (newMessages?.length && socket.readyState === 1) setAsReviewed(socket, newMessages)
    // eslint-disable-next-line
  }, [dialog])

  const goBack = () => {
    // replaceRoute(`/`)
  }

  return (
    <>
      {!orderChat && <SubHeader linkTo="/" onBack={goBack} title="Messages" />}
      <div className={cls(orderChat ? styles.order_chat : '', styles.content)}>
        {!orderChat && (
          <ChatList chatList={dialogs} activeChat={activeChat} setActiveChat={setActiveChat} />
        )}
        {activeChat && (
          <Chat
            myId={myId}
            socket={socket}
            recipient={recipient}
            activeChat={activeChat}
            rdy={newMessages !== null}
            dialog={dialog}
            orderChat={orderChat}
          />
        )}
      </div>
    </>
  )
}

Messages.propTypes = {}

export default Messages
