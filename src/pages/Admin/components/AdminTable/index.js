import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Table, Button, Space } from 'antd'
import { getUsersListAC } from 'actions/admin'
import { connect } from 'react-redux'
import styles from './admin.module.scss'
import './admin.less'

const data = [
  {
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
]

const AdminTable = ({ usersList, getUsersListAC }) => {
  const [filteredInf, setFilter] = useState(null)
  const [sortedInf, setSort] = useState(null)

  useEffect(() => getUsersListAC(), [])

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    setFilter(filters)
    setSort(sorter)
  }

  const clearFilters = () => {
    setFilter(null)
  }

  const clearAll = () => {
    setFilter(null)
    setSort(null)
  }

  const sortedInfo = sortedInf || {}
  const filteredInfo = filteredInf || {}
  const columns = [
    {
      title: 'profileName',
      dataIndex: 'profileName',
      key: 'profileName',

      sorter: (a, b) => a.profileName.length - b.profileName.length,
      sortOrder: sortedInfo.columnKey === 'profileName' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email - b.email,
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Foodlover', value: 'FOODLOVER' },
        { text: 'Foodmaker', value: 'FOODMAKER' },
        { text: 'Admin', value: 'ADMIN' },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) => record.role.includes(value),
      sorter: (a, b) => a.role.length - b.role.length,
      sortOrder: sortedInfo.columnKey === 'role' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => Number(a.id) - Number(b.id),
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      ellipsis: true,
    },
  ]

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={usersList} onChange={handleChange} />
    </>
  )
}

AdminTable.propTypes = {
  usersList: T.shape(),
  getUsersListAC: T.func,
}

export default connect(({ admin: { usersList } }) => ({ usersList }), { getUsersListAC })(
  AdminTable,
)
