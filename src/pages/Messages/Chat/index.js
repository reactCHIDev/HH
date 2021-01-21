import React from 'react'
import Message from '../Message'
import MyMessage from '../MyMessage'
import attachment from 'assets/icons/svg/attachment.svg'
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
      <div className={styles.msg_container}>
        <Message />
        <MyMessage />
        <Message />
        <MyMessage />
        <Message />
        <MyMessage />
        <Message />
        <MyMessage />
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.addWrapper}>
          <img src={attachment} alt="pic" />
        </div>
        <textarea className={styles.input} placeholder="Enter your message" rows={1} />
        <button type="button">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
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
    </div>
  )
}

export default Chat
