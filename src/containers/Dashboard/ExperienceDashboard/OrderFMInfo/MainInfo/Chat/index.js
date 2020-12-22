import React from 'react'
import cls from 'classnames'
import styles from './chat.module.scss'

const data = [
  {
    id: 0,
    user: 'me',
    msg: 'hi, hello',
    date: '23/02/20',
    time: '12:37',
  },
  {
    id: 1,
    user: 'you',
    msg: 'hi, hello',
    date: '23/02/20',
    time: '12:38',
  },
  {
    id: 2,
    user: 'me',
    msg: 'hi, hello',
    date: '23/02/20',
    time: '12:39',
  },
  {
    id: 3,
    user: 'me',
    msg: 'hi, hello',
    date: '23/02/20',
    time: '12:40',
  },
  {
    id: 4,
    user: 'me',
    msg: 'hi, hello',
    date: '23/02/20',
    time: '12:41',
  },
  {
    id: 5,
    user: 'you',
    msg: 'hi, hello',
    date: '23/02/20',
    time: '12:42',
  },
  {
    id: 6,
    user: 'me',
    msg: 'hi, hello',
    date: '23/02/20',
    time: '12:43',
  },
]

function Chat() {
  return (
    <div style={{ width: '100%', height: '500px', background: 'skyblue' }}>
      {data.map((item) => (
        <div
          key={item.id}
          className={cls(styles.msgWrapper, item.user !== 'me' ? styles.received : styles.sented)}
        >
          {item.msg}
        </div>
      ))}
    </div>
  )
}

export default Chat
