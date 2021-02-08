import React from 'react'
import { Layout, Menu } from 'antd'
import LogoWhite from 'assets/images/logo_nobeta.svg'

import styles from './header.module.scss'

const { Header } = Layout

function HeaderWrapper() {
  return (
    <Header>
      <div className={styles.logo}>
        <img alt="logo" src={LogoWhite} />
      </div>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Account</Menu.Item>
        <Menu.Item key="3">Exit</Menu.Item>
      </Menu>
    </Header>
  )
}

export default HeaderWrapper
