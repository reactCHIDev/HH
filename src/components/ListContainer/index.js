/* eslint-disable no-shadow */
import React from 'react'
import T from 'prop-types'
import { Pagination } from 'antd'

// import styles from './list_container.module.scss'
import './list_container.less'

const ListContainer = (props) => {
  const {
    page,
    pageChange,
    onShowSizeChange,
    pageSizeOptions,
    pageSize = 4,
    total = 30,
    children,
  } = props

  const onChange = (page) => {
    pageChange(page, pageSize)
  }

  return (
    <>
      {children}
      {total > 0 && (
        <Pagination
          defaultCurrent={page}
          defaultPageSize={pageSize}
          current={page}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          pageSizeOptions={pageSizeOptions}
          total={total}
          showSizeChanger={false}
        />
      )}
    </>
  )
}

ListContainer.propTypes = {
  page: T.number,
  pageChange: T.func,
  pageSize: T.number,
  pageSizeOptions: T.arrayOf(T.string),
  onShowSizeChange: T.func,
  total: T.number,
  children: T.arrayOf(T.element) || T.element,
}

export default ListContainer
