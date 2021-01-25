import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import Contact from '../Contact'
import styles from './chatlist.module.scss'

function ChatList({ chatList, activeChat, setActiveChat }) {
  return (
    <div className={styles.container}>
      {chatList.map((e, i) => {
        const date = new Date(e.lastMessageSent).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
        const time = new Date(e.lastMessageSent).toLocaleTimeString('en-US', {
          hour12: false,
          hour: 'numeric',
          minute: '2-digit',
        })
        return (
          <Contact
            id={e.recipient.id}
            url={e.recipient.userPhoto}
            date={`${date}, ${time}`}
            name={e.recipient.profileName}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
          />
        )
      })}
    </div>
  )
}

ChatList.propTypes = {
  chatList: T.arrayOf(T.string),
  activeChat: T.string,
  setActiveChat: T.func.isRequired,
}

export default ChatList
