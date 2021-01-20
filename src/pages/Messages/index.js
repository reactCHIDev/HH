import React from 'react'
import T from 'prop-types'
import SubHeader from 'components/SubHeader'
import ChatList from './ChatList'
import Chat from './Chat'
import styles from './messages.module.scss'
import './messages.less'

const Messages = (props) => {
  const { x } = props

  const goBack = () => {
    // replaceRoute(`/`)
  }

  return (
    <>
      <SubHeader linkTo="/" onBack={goBack} title="Messages" />
      <div className={styles.content}>
        <ChatList />
        <Chat />
      </div>
    </>
  )
}

Messages.propTypes = {}

export default Messages
