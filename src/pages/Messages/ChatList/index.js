import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import Contact from '../Contact'
import styles from './chatlist.module.scss'

function ChatList({ chatList, activeChat, setActiveChat }) {
  return (
    <div className={styles.container}>
      {chatList.map((_, i) => (
        <Contact id={i} activeChat={activeChat} setActiveChat={setActiveChat} />
      ))}
    </div>
  )
}

ChatList.propTypes = {
  chatList: T.arrayOf(T.string).isRequired,
  activeChat: T.string.isRequired,
  setActiveChat: T.func.isRequired,
}

export default ChatList
