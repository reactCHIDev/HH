import React from 'react'
import { Layout } from 'antd'

import HeaderWrapper from './components/Header'
import Sidebar from './components/Sidebar'
import Users from './components/Tables/Users'
import Shops from './components/Tables/Shops'

import './admin_page.less'

const { Content } = Layout

function Admin() {
  const [activeTab, setActiveTab] = React.useState('users')

  return (
    <Layout>
      <HeaderWrapper />
      <Layout>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Content>
          {activeTab === 'users' && <Users />}
          {activeTab === 'shops' && <Shops />}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Admin
