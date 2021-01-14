import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import { Table, Input, Button, Space } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import { getWithdrawListAC } from 'actions/admin'
import Avatar from 'components/AvatarPlaceholder'
import { connect } from 'react-redux'

const Withdraws = ({ withdrawList, getWithdrawListAC }) => {
  const [sortedInf, setSort] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const searchInput = useRef(null)

  useEffect(() => {
    getWithdrawListAC()
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
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => Number(a.id) - Number(b.id),
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('id'),
      width: '40px',
    },
    {
      title: 'userProfileId',
      dataIndex: 'userProfileId',
      key: 'userProfileId',
      sorter: (a, b) => Number(a.userProfileId) - Number(b.userProfileId),
      sortOrder: sortedInfo.columnKey === 'userProfileId' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('userProfileId'),
      width: '50px',
    },
    {
      title: 'amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
      sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('amount'),
      width: '50px',
    },
    {
      title: 'currency',
      dataIndex: 'currency',
      key: 'currency',
      sorter: (a, b) => {
        if (a.currency.toLowerCase() > b.currency.toLowerCase()) return 1
        if (a.currency.toLowerCase() < b.currency.toLowerCase()) return -1
        return 0
      },
      sortOrder: sortedInfo.columnKey === 'currency' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('currency'),
      width: '50px',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: '60px',
      sorter: (a, b) => {
        if (a.status.toLowerCase() > b.status.toLowerCase()) return 1
        if (a.status.toLowerCase() < b.status.toLowerCase()) return -1
        return 0
      },
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('status'),
    },
    {
      title: 'action',
      // dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: '50px',
      render: (text, record) =>
        record.status === 'Pending' ? <button type="button">Approve</button> : <div> - </div>,
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={withdrawList}
        scroll={{ x: 1024 }}
        sticky
        onChange={handleChange}
      />
    </>
  )
}

Withdraws.propTypes = {
  withdrawList: T.shape(),
  getWithdrawListAC: T.func,
}

export default connect(({ admin: { withdrawList } }) => ({ withdrawList }), {
  getWithdrawListAC,
})(Withdraws)
