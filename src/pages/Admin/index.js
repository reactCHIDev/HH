import React from 'react'
import { Layout } from 'antd'

import HeaderWrapper from './components/Header'
import Sidebar from './components/Sidebar'
import Users from './components/Tables/Users'
import Withdraws from './components/Tables/Withdraws'
import Shops from './components/Tables/Shops'
import City from './components/Tables/City'
import Faq from './components/Tables/Faq'

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
          {activeTab === 'withdraws' && <Withdraws />}
          {activeTab === 'city' && <City />}
          {activeTab === 'faq' && <Faq />}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Admin
