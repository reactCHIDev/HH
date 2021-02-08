import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import { Table, Input, Button, Space } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import { getUsersListAC } from 'actions/admin'
import Avatar from 'components/AvatarPlaceholder'
import { connect } from 'react-redux'

const AdminTable = ({ usersList, requesting, getUsersListAC }) => {
  const [sortedInf, setSort] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const searchInput = useRef(null)

  useEffect(() => {
    getUsersListAC()
  }, [])

  const handleChange = (pagination, filters, sorter) => {
    setSort(sorter)
  }

  const clearAll = () => {
    setSort(null)
    setSearchText('')
    setSearchedColumn('')
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    console.log('%c   clearFilters   ', 'color: darkgreen; background: palegreen;', clearFilters)
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const sortedInfo = sortedInf || {}
  const columns = [
    {
      title: 'profileName',
      dataIndex: 'profileName',
      key: 'profileName',
      fixed: 'left',
      width: '150px',
      sorter: (a, b) => {
        if (a.profileName.toLowerCase() > b.profileName.toLowerCase()) return 1
        if (a.profileName.toLowerCase() < b.profileName.toLowerCase()) return -1
        return 0
      },
      sortOrder: sortedInfo.columnKey === 'profileName' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('profileName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => {
        if (a.email.toLowerCase() > b.email.toLowerCase()) return 1
        if (a.email.toLowerCase() < b.email.toLowerCase()) return -1
        return 0
      },
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('email'),
      width: '200px',
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
      sorter: (a, b) => {
        if (a.role.toLowerCase() > b.role.toLowerCase()) return 1
        if (a.role.toLowerCase() < b.role.toLowerCase()) return -1
        return 0
      },
      sortOrder: sortedInfo.columnKey === 'role' && sortedInfo.order,
      ellipsis: true,
      width: '140px',
      ...getColumnSearchProps('role'),
    },
    {
      title: 'userPhoto',
      dataIndex: 'userPhoto',
      key: 'userPhoto',
      width: '100px',
      render: (url) =>
        url ? (
          <img src={url} width={48} height={48} style={{ borderRadius: 8 }} alt="photo" />
        ) : (
          <Avatar />
        ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => Number(a.id) - Number(b.id),
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('id'),
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={usersList}
        scroll={{ x: 1024 }}
        loading={requesting}
        sticky
        onChange={handleChange}
      />
    </>
  )
}

AdminTable.propTypes = {
  usersList: T.shape(),
  requesting: T.bool,
  getUsersListAC: T.func,
}

export default connect(({ admin: { usersList, requesting } }) => ({ usersList, requesting }), {
  getUsersListAC,
})(AdminTable)
