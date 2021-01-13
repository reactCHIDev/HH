import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getDataForAdminAC } from 'actions/admin'
import { Layout } from 'antd'
import Sidebar from './components/Sidebar'
import HeaderWrapper from './components/Header'
import './admin_page.less'

const { Content } = Layout

function Admin() {
  const [activeTab, setActiveTab] = React.useState('users')
  // const dataToShow = useSelector((state) => state.admin.data)
  // const dispatch = useDispatch()

  // React.useEffect(() => {
  //   dispatch(getDataForAdminAC(activeTab))
  // }, [activeTab])

  return (
    <Layout>
      <HeaderWrapper />
      <Content>
        <Layout>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <Content>{activeTab}</Content>
        </Layout>
      </Content>
    </Layout>
  )
}

export default Admin
