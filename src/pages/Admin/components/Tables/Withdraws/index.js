/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import { format } from 'date-fns'
import { Table, Input, Button, Space } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import { getWithdrawListAC, approveWithdrawAC } from 'actions/admin'
import { connect } from 'react-redux'

const Withdraws = ({ withdrawList, requesting, getWithdrawListAC, approveWithdrawAC }) => {
  const [sortedInf, setSort] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const searchInput = useRef(null)

  useEffect(() => {
    getWithdrawListAC({ startIndex: 0, limit: 100, status: null })
    // eslint-disable-next-line
  }, [])

  const approveHandler = (id) => approveWithdrawAC(id)

  const refreshData = () => getWithdrawListAC({ startIndex: 0, limit: 100, status: null })

  const getPending = () => getWithdrawListAC({ startIndex: 0, limit: 10000, status: 'Pending' })

  const handleChange = (pagination, filters, sorter) => {
    setSort(sorter)
  }

  // const clearAll = () => {
  //   setSort(null)
  //   setSearchText('')
  //   setSearchedColumn('')
  // }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
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
      title: 'Date',
      dataIndex: 'updateAt',
      key: 'updateAt',
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      sortOrder: sortedInfo.columnKey === 'updateAt' && sortedInfo.order,
      ellipsis: true,
      fixed: 'left',
      width: '60px',
      render: (text, record) => (
        <div>{format(new Date(record.updatedAt), 'dd MMM YYY, hh:mm a')}</div>
      ),
    },
    {
      title: 'name',
      dataIndex: 'userProfileName',
      key: 'userProfileName',
      sorter: (a, b) => {
        if (a.userProfileName.toLowerCase() > b.userProfileName.toLowerCase()) return 1
        if (a.userProfileName.toLowerCase() < b.userProfileName.toLowerCase()) return -1
        return 0
      },
      sortOrder: sortedInfo.columnKey === 'userProfileName' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('userProfileName'),
      width: '40px',
    },
    {
      title: 'email',
      dataIndex: 'userEmail',
      key: 'userEmail',
      sorter: (a, b) => {
        if (a.userEmail.toLowerCase() > b.userEmail.toLowerCase()) return 1
        if (a.userEmail.toLowerCase() < b.userEmail.toLowerCase()) return -1
        return 0
      },
      sortOrder: sortedInfo.columnKey === 'userEmail' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('userEmail'),
      width: '60px',
    },
    {
      title: 'phone',
      dataIndex: 'balancePaymentPhone',
      key: 'balancePaymentPhone',
      sorter: (a, b) => Number(a.balancePaymentPhone) - Number(b.balancePaymentPhone),
      sortOrder: sortedInfo.columnKey === 'balancePaymentPhone' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('balancePaymentPhone'),
      width: '60px',
    },
    {
      title: 'account number',
      dataIndex: 'balanceAccountNumber',
      key: 'balanceAccountNumber',
      sorter: (a, b) => Number(a.balanceAccountNumber) - Number(b.balanceAccountNumber),
      sortOrder: sortedInfo.columnKey === 'balanceAccountNumber' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('balanceAccountNumber'),
      width: '60px',
    },
    {
      title: 'bank name',
      dataIndex: 'balanceBankName',
      key: 'balanceBankName',
      sorter: (a, b) => {
        if (a.balanceBankName?.toLowerCase() > b.balanceBankName?.toLowerCase()) return 1
        if (a.balanceBankName?.toLowerCase() < b.balanceBankName?.toLowerCase()) return -1
        return 0
      },
      sortOrder: sortedInfo.columnKey === 'balanceBankName' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('balanceBankName'),
      width: '60px',
    },
    {
      title: 'bank code',
      dataIndex: 'balanceBankCode',
      key: 'balanceBankCode',
      sorter: (a, b) => Number(a.balanceAccountNumber) - Number(b.balanceAccountNumber),
      sortOrder: sortedInfo.columnKey === 'balanceBankCode' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('balanceBankCode'),
      width: '60px',
    },
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => Number(a.id) - Number(b.id),
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      ellipsis: true,
      ...getColumnSearchProps('id'),
      width: '30px',
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
        record.status === 'Pending' ? (
          <button type="button" onClick={() => approveHandler(record.id)}>
            Approve
          </button>
        ) : (
          <div> - </div>
        ),
    },
  ]

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={refreshData}>Refresh Data</Button>
        <Button onClick={getPending}>Get Only Pending</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={withdrawList}
        scroll={{ x: 1600 }}
        sticky
        loading={requesting}
        onChange={handleChange}
      />
    </>
  )
}

Withdraws.propTypes = {
  withdrawList: T.shape(),
  requesting: T.bool,
  getWithdrawListAC: T.func,
  approveWithdrawAC: T.func,
}

export default connect(
  ({ admin: { withdrawList, requesting } }) => ({ withdrawList, requesting }),
  {
    getWithdrawListAC,
    approveWithdrawAC,
  },
)(Withdraws)
