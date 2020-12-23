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
    <div className={styles.container}>
      <div>
        {data.map((item) => (
          <div
            key={item.id}
            className={cls(styles.msgWrapper, item.user !== 'me' ? styles.received : styles.sented)}
          >
            {item.msg}
          </div>
        ))}
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.addWrapper}>&#9761;</div>
        <textarea className={styles.input} placeholder="Enter your message" rows={1} />
        <button type="button">{'>'}</button>
      </div>
    </div>
  )
}

export default Chat
