import React from 'react'
import T from 'prop-types'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import cls from 'classnames'
import MailIcon from 'assets/icons/svg/mail-icon.svg'
import styles from './about_maker.module.scss'
import './about_maker.less'

const AboutMaker = ({ name, photo, text }) => {
  return (
    <div className={cls('about-maker', styles.container)}>
      <div className={styles.avatar_container}>
        <div className={styles.avatar_holder}>
           <Avatar icon={photo ? <img src={photo} alt="foodmaker" /> : <UserOutlined />} />
          <img className={styles.mail_icon} src={MailIcon} alt="email" />
        </div>
        <div>
           <div className={styles.maker_name}>{name}</div>
          <div className={styles.maker_title}>Foodmaker</div>
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.description_title}>About maker</div>
        <div className={styles.description_text}>{text}</div>
      </div>
    </div>
  )
}

AboutMaker.propTypes = {
  name: T.string.isRequired,
  photo: T.string,
  text: T.string.isRequired,
}

export default AboutMaker
