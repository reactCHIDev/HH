import React, { useState, useEffect, useRef } from 'react'
import T from 'prop-types'
import { Table, Input, Button, Space, Radio } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import { getCitiesAC } from 'actions/system'
import { getFaqAC, createCityAC, deleteCityAC, editCityAC } from 'actions/admin'
import Avatar from 'components/AvatarPlaceholder'
import Modal from 'components/UniversalModal'
import FormItem from './ItemForm'
import { connect } from 'react-redux'
import { setDialogAC } from 'actions/chat'

const CityTable = ({ cities, requesting, getCitiesAC, createCityAC, deleteCityAC, editCityAC }) => {
  const [id, setId] = useState('')
  const [cityName, setCityName] = useState('')
  const [available, setAvailable] = useState('')
  const [addCityName, setAddCityName] = useState('')
  const [addAvailable, setAddAvailable] = useState('Available')
  const [visible, setVisible] = useState(false)

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const searchInput = useRef(null)

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
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? 'green' : 'black' }} />,
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

  useEffect(() => {
    getCitiesAC()
  }, [])

  const createCity = () => {
    if (addCityName) {
      createCityAC({ cityName: addCityName, availability: addAvailable })
      setAddCityName('')
      setAddAvailable('Available')
    }
  }

  const editCity = (data) => {
    setCityName(data.cityName)
    setAvailable(data.availability)
    setId(data.id)
    setVisible(true)
  }

  const deleteCity = (id) => {
    deleteCityAC(id)
  }

  const addChange = (e) => setAddCityName(e.target.value)

  const onRadio = (e) => setAddAvailable(e.target.value)
  const toggleAvailable = () => setAvailable(!available)

  const closeModal = () => setVisible(false)

  const columns = [
    {
      title: 'cityName',
      dataIndex: 'cityName',
      key: 'cityName',
      width: '200px',
      ...getColumnSearchProps('cityName'),
    },
    {
      title: 'availability',
      dataIndex: 'availability',
      key: 'availability',
      width: '200px',
    },
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '200px',
    },
    {
      title: 'actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <button
            type="button"
            style={{ display: 'block', width: 70, marginBottom: 3 }}
            onClick={() => editCity(record)}
          >
            Edit
          </button>
          <button
            type="button"
            style={{ display: 'block', width: 70, marginBottom: 3 }}
            onClick={() => deleteCity(record.id)}
          >
            Remove
          </button>
        </>
      ),
    },
  ]

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input value={addCityName} placeholder="city name" onChange={addChange} />
        <div>
          <Radio.Group onChange={onRadio} value={addAvailable}>
            <Radio value="Available">Available</Radio>
            <Radio value="Unavailable">Unavailable</Radio>
            <Radio value="Coming soon">Coming soon</Radio>
          </Radio.Group>
        </div>
        <Button onClick={createCity}>Add city</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={cities}
        scroll={{ x: 768 }}
        loading={requesting}
        sticky
      />
      {visible && (
        <Modal closeFunc={closeModal} mode="dark">
          <FormItem editCityAC={editCityAC} id={id} city={cityName} available={available} />
        </Modal>
      )}
    </>
  )
}

CityTable.propTypes = {
  faq: T.shape(),
  requesting: T.bool,
  getCitiesAC: T.func,
  createCityAC: T.func,
  deleteCityAC: T.func,
  editCityAC: T.func,
}

export default connect(({ system: { cities, requesting } }) => ({ cities, requesting }), {
  getCitiesAC,
  createCityAC,
  deleteCityAC,
  editCityAC,
})(CityTable)
