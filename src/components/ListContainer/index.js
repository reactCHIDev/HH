import React from 'react'
import T from 'prop-types'
import { Pagination } from 'antd'

import styles from './list_container.module.scss'
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
    <div className={styles.container}>
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
        />
      )}
    </div>
  )
}

ListContainer.propTypes = {
  page: T.number.isRequired,
  pageChange: T.func.isRequired,
  pageSize: T.number.isRequired,
  pageSizeOptions: T.arrayOf(T.string),
  onShowSizeChange: T.func,
  total: T.number.isRequired,
  children: T.element,
}

export default ListContainer
