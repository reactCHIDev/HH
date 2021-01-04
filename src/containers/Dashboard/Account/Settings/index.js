import React from 'react'
import T from 'prop-types'
import PrivateRoute from 'components/Routing/PrivateRoute'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { replace } from 'connected-react-router'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import Security from './Security'
import Balance from './Balance'
import BillingHistory from './Billing'
import Exp from 'components/Tabs/Test/Exp'

import styles from './settings.module.scss'
import './settings.less'

const Settings = (props) => {
  const { replaceRoute } = props
  const { activeTab } = useParams()

  const onChange = (key) => {
    replaceRoute(`/settings/${key}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.heading}>Settings</p>
        <TabsUnderlined
          onChange={onChange}
          activeTab={activeTab || 'security'}
          tabs={{
            security: {
              mark: false,
              /*   content: (
                <PrivateRoute path="/settings/security/:confirmation?" component={Security} />
              ), */
              content: <Security />,
            },
            'payment settings': { disabled: true, mark: false, content: <Exp /> },
            account: {
              disabled: true,
              mark: false,
              content: <Exp />,
            },
            'billing history': { disabled: true, mark: true, content: <BillingHistory /> },
            balance: { disabled: true, mark: false, content: <Balance /> },
          }}
        />
      </div>
    </div>
  )
}

Settings.propTypes = {
  replaceRoute: T.func,
}

export default connect(null, {
  replaceRoute: replace,
})(Settings)
