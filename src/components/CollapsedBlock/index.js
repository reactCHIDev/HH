import React from 'react'
import T from 'prop-types'
import { Collapse } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'

import styles from './collapsed.module.scss'
import './collapsed.less'

const CollapsedBlock = (props) => {
  const { headerText, color, children } = props

  const { Panel } = Collapse

  return (
    <div className={styles.container}>
      <div className="collapse">
        <Collapse
          expandIcon={({ isActive }) => <CaretDownOutlined rotate={isActive ? 0 : -180} />}
          expandIconPosition="right"
          defaultActiveKey={headerText}
          style={{ background: color }}
        >
          <Panel header={headerText} key={headerText}>
            {children}
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}

CollapsedBlock.propTypes = {
  headerText: T.string.isRequired,
  color: T.string.isRequired,
  children: T.node,
}

export default CollapsedBlock
