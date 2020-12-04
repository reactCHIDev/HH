import React from 'react'
import TabsUnderlined from 'components/Tabs/TabsUnderlined'
import Exp from 'components/Tabs/Test/Exp'
import Comp from 'components/Tabs/Test/Comp'
import T from 'prop-types'
import s from './tabstest.module.scss'

const TabsTest = ({ data }) => (
  <div className={s.container}>
    <TabsUnderlined
      tabs={{
        bookmark: { mark: false, content: null },
        orders: {
          mark: false,
          content: <Exp />,
        },
        review: { mark: true, content: null },
        'blog submission': { mark: false, content: <Comp /> },
        profile: { mark: false, content: null },
      }}
    />
    {/*     <TabsCard
      tabs={{
        bookmark: { mark: false },
        orders: { mark: false },
        review: { mark: true },
        'blog submission': { mark: false },
        profile: { mark: false },
      }}
    />
    <TabsOpen
      tabs={{
        bookmark: { mark: false },
        orders: { mark: false },
        review: { mark: true },
        'blog submission': { mark: false },
        profile: { mark: false },
      }}
    /> */}
  </div>
)

TabsTest.propTypes = {
  data: T.string,
}

export default TabsTest
