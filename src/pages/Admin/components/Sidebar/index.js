/* eslint-disable react/prop-types */
import React from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined, DollarOutlined, ShoppingOutlined } from '@ant-design/icons'

const { Sider } = Layout

function Sidebar({ activeTab, setActiveTab }) {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed((c) => !c)}>
      <Menu theme="dark" defaultSelectedKeys={[activeTab]} mode="inline">
        <Menu.Item key="users" icon={<UserOutlined />} onClick={() => setActiveTab('users')}>
          Users
        </Menu.Item>
        <Menu.Item key="shops" icon={<ShoppingOutlined />} onClick={() => setActiveTab('shops')}>
          Shops
        </Menu.Item>
        <Menu.Item
          key="withdraws"
          icon={<DollarOutlined />}
          onClick={() => setActiveTab('withdraws')}
        >
          Withdraws
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
