import React from 'react'
import cls from 'classnames'
import Contact from '../Contact'
import styles from './chatlist.module.scss'

function ChatList() {
  return (
    <div className={styles.container}>
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
    </div>
  )
}

export default ChatList
