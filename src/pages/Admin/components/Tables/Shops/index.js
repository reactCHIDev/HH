import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Table, Button, Space } from 'antd'
import { getShopsListAc } from 'actions/admin'
import { connect } from 'react-redux'

const ShopsTable = ({ shopsList, getShopsListAc }) => {
  const [filteredInf, setFilter] = useState(null)
  const [sortedInf, setSort] = useState(null)

  useEffect(() => {
    getShopsListAc()
  }, [])

  const handleChange = (pagination, filters, sorter) => {
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
  // const filteredInfo = filteredInf || {}
  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',

      sorter: (a, b) => a.title.lenth - b.title.length,
      sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'rating',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      sortOrder: sortedInfo.columnKey === 'rating' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'votes',
      dataIndex: 'votes',
      key: 'votes',
      sorter: (a, b) => a.votes - b.votes,
      sortOrder: sortedInfo.columnKey === 'votes' && sortedInfo.order,
      ellipsis: true,
    },
  ]

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={shopsList} onChange={handleChange} />
    </>
  )
}

ShopsTable.propTypes = {
  shopsList: T.shape(),
  getShopsListAc: T.func,
}

export default connect(({ admin: { shopsList } }) => ({ shopsList }), {
  getShopsListAc,
})(ShopsTable)
