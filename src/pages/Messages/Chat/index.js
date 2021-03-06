/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useContext } from 'react'
import { WebSocketContext } from 'App'
import cloneDeep from 'lodash/cloneDeep'
import { getDialog, sendMessage } from 'utils/openWS'
import { useSelector, useDispatch } from 'react-redux'
import { isSameDay } from 'date-fns'
import useSound from 'use-sound'
import tick from 'assets/sound/tick.mp3'
import cls from 'classnames'
import { setPageAC, setChatHeightAC } from 'actions/chat'
import UploaderFile from 'components/ChatUploaderFile'
import Modal from 'components/UniversalModal'
import ModalPreview from '../ModalPreview'
import Message from '../Message'
import MyMessage from '../MyMessage'
import styles from './chat.module.scss'

function Chat({ dialog, activeChat, myId, recipient, rdy, orderChat }) {
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  const [modal, setPreviewModal] = useState(false)
  const [next, setActiveNext] = useState(true)

  const [fileList, setFileList] = useState([])
  const scroll = useSelector((state) => state.chat.scroll)
  const height = useSelector((state) => state.chat.height)
  const page = useSelector((state) => state.chat.page)
  const newMsg = useSelector((state) => state.chat.newMsg)
  const newMessages = useSelector((state) => state.chat.newMessages)

  const dispatch = useDispatch()
  const socket = useContext(WebSocketContext)
  const [play] = useSound(tick)

  const chatWindow = useRef()
  const msgContainer = useRef()
  const msgInput = useRef()

  useEffect(() => {
    if (newMsg === 1 || newMessages) play()
    // eslint-disable-next-line
  }, [newMsg, newMessages])

  useEffect(() => {
    if (socket?.readyState === 1 && activeChat && rdy) {
      getDialog(socket, activeChat)
    }
    msgInput.current.focus()
    // eslint-disable-next-line
  }, [activeChat])

  useEffect(() => {
    if (chatWindow.current && msgContainer.current) {
      chatWindow.current.scrollTo(0, msgContainer.current.scrollHeight - height)
      dispatch(setChatHeightAC(msgContainer.current.scrollHeight))
    }
    setUser(recipient)
    // eslint-disable-next-line
  }, [dialog])

  useEffect(() => {
    if (socket?.readyState === 1 && activeChat && rdy && page !== 0) {
      getDialog(socket, activeChat, page * 25)
    }
    // eslint-disable-next-line
  }, [page])

  const onSend = () => {
    if (message !== '' || fileList.length) {
      sendMessage(socket, message, fileList, activeChat)
      setMessage('')
      setFileList([])
    }
  }

  const handleKeyDown = (e) => {
    /* if (e.key === 'Enter' && e.shiftKey) {
      // setMessage((m) => m + '\n')
      return
    }
    if (e.key === 'Enter') onSend() */
  }

  const onChangeMessage = (e) => setMessage(e.target.value)

  const chatDialog = cloneDeep(dialog)

  const onScroll = (e) => {
    if (scroll === 0) return
    if (e.target.scrollTop === 0) dispatch(setPageAC(page + 1))
  }

  const divider = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: '2-digit',
    })
    return (
      <div className={styles.divider}>
        <div className={styles.date}>{formattedDate}</div>
      </div>
    )
  }

  const closeModal = () => setPreviewModal(false)

  return (
    <div
      className={cls(
        orderChat ? styles.order_chat_container : styles.msg_chat_container,
        styles.container,
      )}
    >
      <div className={styles.msg_container} ref={chatWindow} onScroll={onScroll}>
        <div className={styles.msg_wrapper} ref={msgContainer}>
          {chatDialog.reverse().map((e, i, arr) => {
            const date = new Date(e.message.createdAt)
            const prevDate = i > 0 ? new Date(arr[i - 1].message.createdAt) : date
            const time = new Date(e.message.createdAt).toLocaleTimeString('en-US', {
              hour12: false,
              hour: 'numeric',
              minute: '2-digit',
            })
            return (
              <React.Fragment key={e.message.createdAt}>
                {!isSameDay(prevDate, date) && divider(date)}
                {e.recipient.id === myId ? (
                  <Message
                    message={e.message}
                    user={user}
                    date={time}
                    setPreview={setPreviewModal}
                  />
                ) : (
                  <MyMessage message={e.message} date={time} setPreview={setPreviewModal} />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
      {!newMsg ? (
        <UploaderFile setFileList={setFileList} setActiveNext={setActiveNext} />
      ) : (
        <div style={{ height: 20 }} />
      )}
      <div className={styles.bottomSection}>
        <textarea
          ref={msgInput}
          className={styles.input}
          placeholder="Enter your message"
          rows={1}
          onChange={onChangeMessage}
          onKeyDown={handleKeyDown}
          value={message}
        />
        <button type="button" onClick={onSend} disabled={!next}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M15.6686 7.48076L0.811792 0.623786C0.575226 0.51636 0.292947 0.580359 0.12838 0.783782C-0.0373304 0.987206 -0.0430445 1.27634 0.114666 1.48548L5.00026 7.99961L0.114666 14.5137C-0.0430445 14.7229 -0.0373304 15.0131 0.127237 15.2154C0.238091 15.3537 0.403802 15.428 0.571797 15.428C0.652938 15.428 0.734079 15.4109 0.810649 15.3754L15.6674 8.51845C15.8709 8.42474 16 8.22246 16 7.99961C16 7.77675 15.8708 7.57447 15.6686 7.48076Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      {modal && (
        <Modal closeFunc={closeModal}>
          <ModalPreview closeFunc={closeModal} link={modal} />
        </Modal>
      )}
    </div>
  )
}

export default Chat
