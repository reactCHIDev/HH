import React from 'react'
import { Layout, Menu } from 'antd'
import LogoWhite from 'assets/images/logo_nobeta.svg'
import { Link } from 'react-router-dom'

import styles from './header.module.scss'

const { Header } = Layout

function HeaderWrapper() {
  return (
    <Header>
      <div className={styles.logo}>
        <Link className={styles.link} to="/">
          <img alt="logo" src={LogoWhite} />
        </Link>
      </div>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link className={styles.link} to="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2">Account</Menu.Item>
        <Menu.Item key="3">Exit</Menu.Item>
      </Menu>
    </Header>
  )
}

export default HeaderWrapper
