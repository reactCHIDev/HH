import React, { useState } from 'react'
import T from 'prop-types'
import SubHeader from 'components/SubHeader'
import ChatList from './ChatList'
import Chat from './Chat'
import styles from './messages.module.scss'
import './messages.less'

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null)

  const goBack = () => {
    // replaceRoute(`/`)
  }

  const chatList = Array(10).fill('')

  return (
    <>
      <SubHeader linkTo="/" onBack={goBack} title="Messages" />
      <div className={styles.content}>
        <ChatList chatList={chatList} activeChat={activeChat} setActiveChat={setActiveChat} />
        <Chat />
      </div>
    </>
  )
}

Messages.propTypes = {}

export default Messages
